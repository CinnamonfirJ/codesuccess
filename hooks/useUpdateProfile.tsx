// lib/hooks/useUpdateProfile.tsx
import { useState } from "react";

type ProfileUpdateData = {
  bio: string;
  location: string;
  avatar?: File | null; // avatar is optional and can be a File object
};

type UseUpdateProfileResult = {
  updateProfile: (userId: number, data: ProfileUpdateData) => Promise<boolean>;
  isUpdating: boolean;
  updateError: string | null;
  updateSuccess: boolean;
};

export function useUpdateProfile(): UseUpdateProfileResult {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const updateProfile = async (
    userId: number,
    data: ProfileUpdateData
  ): Promise<boolean> => {
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(false);

    try {
      const formData = new FormData();
      formData.append("bio", data.bio);
      formData.append("location", data.location);
      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }

      const response = await fetch(`/api/update_profile?userId=${userId}`, {
        method: "PUT", // Or PATCH, depending on your backend API route
        body: formData, // No 'Content-Type' header needed; fetch sets it automatically for FormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || errorData.detail || "Failed to update profile."
        );
      }

      // Assuming your backend returns the updated profile data
      const updatedProfile = await response.json();
      console.log("Profile updated successfully:", updatedProfile);

      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000); // Clear success message
      return true;
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setUpdateError(error.message);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateProfile, isUpdating, updateError, updateSuccess };
}
