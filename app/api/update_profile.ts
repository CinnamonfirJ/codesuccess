// pages/api/update_profile.ts
import type { NextApiRequest, NextApiResponse } from "next";
import api from "@/lib/axios"; // Your configured axios instance
import formidable from "formidable"; // For parsing multipart/form-data
import fs from "fs"; // Node.js file system module

// Important: Disable Next.js body parser for this route
// as we will handle multipart/form-data parsing manually with formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT" && req.method !== "PATCH") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const cookie = req.headers.cookie || "";

  const form = formidable({
    multiples: false, // Only expect a single avatar file
    keepExtensions: true, // Keep original file extensions
    uploadDir: "./tmp", // Temporary directory for file uploads (ensure it exists or create it)
    maxFileSize: 5 * 1024 * 1024, // 5MB limit for avatar file
  });

  try {
    const { fields, files } = await new Promise<{
      fields: formidable.Fields;
      files: formidable.Files;
    }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const bio = Array.isArray(fields.bio) ? fields.bio[0] : fields.bio;
    const location = Array.isArray(fields.location)
      ? fields.location[0]
      : fields.location;
    const avatar = Array.isArray(files.avatar) ? files.avatar[0] : files.avatar;

    // Construct FormData to send to your Django backend
    const backendFormData = new FormData();
    if (bio) backendFormData.append("bio", bio as string);
    if (location) backendFormData.append("location", location as string);

    let avatarFileStream: fs.ReadStream | null = null;
    if (avatar && avatar.filepath) {
      // Append the file directly from the temporary path
      // Note: This requires a Node.js environment to read the file.
      // If your backend expects a different format (e.g., base64 string),
      // you'd convert it here. For direct file upload, stream is best.
      avatarFileStream = fs.createReadStream(avatar.filepath);
      backendFormData.append(
        "avatar",
        avatarFileStream as any,
        avatar.originalFilename || "avatar.jpg"
      );
    }

    // Get user PK from the request (you might pass this as a query param or header from frontend)
    // For simplicity, let's assume it's passed as a query parameter 'userId'
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const backendRes = await api.put(
      `https://codesuccex.onrender.com/api/v1/users/${userId}/`,
      backendFormData,
      {
        headers: {
          Cookie: cookie,
          // Axios will automatically set 'Content-Type': 'multipart/form-data' with FormData
        },
        withCredentials: true,
      }
    );

    res.status(backendRes.status).json(backendRes.data);
  } catch (error: any) {
    console.error("API Error:", error);
    // Clean up temporary file if it exists
    const files = await new Promise<formidable.Files>((resolve) => {
      form.parse(req, (err, fields, files) => {
        resolve(files);
      });
    });
    const avatar = Array.isArray(files.avatar) ? files.avatar[0] : files.avatar;
    if (avatar && avatar.filepath) {
      fs.unlink(avatar.filepath, (err) => {
        if (err) console.error("Error deleting temp file:", err);
      });
    }

    res.status(error.response?.status || 500).json({
      message: "Failed to update profile",
      detail: error.response?.data || error.message,
    });
  }
}
