"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Mail,
  Bell,
  Lock,
  LifeBuoy,
  LogOut,
  User,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";

import toast from "react-hot-toast";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function SettingsPage() {
  const { user } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
      setBio(user.profile?.bio || "");
      setLocation(user.profile?.location || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      profile: {
        bio: bio,
        location: location,
      },
    };

    try {
      const res = await fetch("/api/auth/update-user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      toast.success("Updated Profile Successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile: ");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className='flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen'>
        <div className='text-gray-500'>Loading settings...</div>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen'>
      <div className='mx-auto px-6 py-8 max-w-7xl'>
        {/* Header */}
        <motion.div
          className='mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='flex justify-start items-center gap-4 mb-4'>
            <Link href='/profile/me'>
              <Button variant='ghost' className='gap-2'>
                <ArrowLeft className='w-4 h-4' />
                Back to Profile
              </Button>
            </Link>
            <h1 className='font-bold text-gray-900 text-3xl'>Settings</h1>
          </div>
        </motion.div>

        <div className='gap-8 grid lg:grid-cols-3'>
          {/* Left Column - Navigation */}
          <motion.div
            className='space-y-6 lg:col-span-1'
            variants={staggerContainer}
            initial='initial'
            animate='animate'
          >
            <motion.div variants={fadeInUp}>
              <Card className='bg-white shadow-xl border-0 overflow-hidden'>
                <CardHeader className='bg-gradient-to-r from-emerald-500 to-blue-500 p-6 text-white'>
                  <h3 className='font-bold text-xl'>Account</h3>
                </CardHeader>
                <CardContent className='p-0'>
                  <nav className='space-y-1'>
                    <Button
                      variant='ghost'
                      className='justify-start hover:bg-gray-50 px-6 py-4 rounded-none w-full text-gray-700 hover:text-emerald-600 text-lg'
                    >
                      <User className='mr-3 w-5 h-5' />
                      General
                    </Button>
                    <Button
                      variant='ghost'
                      className='justify-start hover:bg-gray-50 px-6 py-4 rounded-none w-full text-gray-700 hover:text-blue-600 text-lg'
                    >
                      <Bell className='mr-3 w-5 h-5' />
                      Notifications
                    </Button>
                    <Button
                      variant='ghost'
                      className='justify-start hover:bg-gray-50 px-6 py-4 rounded-none w-full text-gray-700 hover:text-purple-600 text-lg'
                    >
                      <Lock className='mr-3 w-5 h-5' />
                      Privacy
                    </Button>
                    <Button
                      variant='ghost'
                      className='justify-start hover:bg-gray-50 px-6 py-4 rounded-none w-full text-gray-700 hover:text-orange-600 text-lg'
                    >
                      <LifeBuoy className='mr-3 w-5 h-5' />
                      Help & Support
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Button
                variant='destructive'
                className='bg-red-500 hover:bg-red-600 py-6 w-full text-white text-lg'
              >
                <LogOut className='mr-3 w-5 h-5' />
                Log Out
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Settings Content */}
          <motion.div
            className='space-y-8 lg:col-span-2'
            variants={staggerContainer}
            initial='initial'
            animate='animate'
          >
            {/* General Settings */}
            <motion.div variants={fadeInUp}>
              <Card className='bg-white shadow-lg border-0'>
                <CardHeader className='pb-3'>
                  <h3 className='font-semibold text-gray-900 text-xl'>
                    General Account Settings
                  </h3>
                  <p className='text-gray-600 text-sm'>
                    Update your personal information.
                  </p>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <form onSubmit={handleUpdateProfile} className='space-y-6'>
                    <div className='gap-2 grid'>
                      <Label htmlFor='firstName'>First Name</Label>
                      <Input
                        id='firstName'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className='gap-2 grid'>
                      <Label htmlFor='lastName'>Last Name</Label>
                      <Input
                        id='lastName'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className='gap-2 grid'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className='gap-2 grid'>
                      <Label htmlFor='bio'>Bio</Label>
                      <Textarea
                        id='bio'
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className='min-h-[100px]'
                      />
                    </div>
                    <div className='gap-2 grid'>
                      <Label htmlFor='location'>Location</Label>
                      <Input
                        id='location'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>

                    <Button
                      type='submit'
                      className='bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Notifications Settings */}
            <motion.div variants={fadeInUp}>
              <Card className='bg-white shadow-lg border-0'>
                <CardHeader className='pb-3'>
                  <h3 className='font-semibold text-gray-900 text-xl'>
                    Notification Preferences
                  </h3>
                  <p className='text-gray-600 text-sm'>
                    Manage how you receive alerts and updates.
                  </p>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='flex justify-between items-center'>
                    <Label htmlFor='email-notifications' className='flex-1'>
                      Email Notifications
                      <p className='text-gray-500 text-sm'>
                        Receive updates via email.
                      </p>
                    </Label>
                    <Switch
                      id='email-notifications'
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className='flex justify-between items-center'>
                    <Label htmlFor='push-notifications' className='flex-1'>
                      Push Notifications
                      <p className='text-gray-500 text-sm'>
                        Get instant alerts on your device.
                      </p>
                    </Label>
                    <Switch
                      id='push-notifications'
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                  <Button className='bg-gradient-to-r from-emerald-500 to-blue-500 text-white'>
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Privacy Settings */}
            <motion.div variants={fadeInUp}>
              <Card className='bg-white shadow-lg border-0'>
                <CardHeader className='pb-3'>
                  <h3 className='font-semibold text-gray-900 text-xl'>
                    Privacy Settings
                  </h3>
                  <p className='text-gray-600 text-sm'>
                    Control your data and visibility.
                  </p>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='flex justify-between items-center'>
                    <Label htmlFor='profile-visibility' className='flex-1'>
                      Profile Visibility
                      <p className='text-gray-500 text-sm'>
                        Make your profile public or private.
                      </p>
                    </Label>
                    <Switch id='profile-visibility' />
                  </div>
                  <div className='flex justify-between items-center'>
                    <Label htmlFor='data-sharing' className='flex-1'>
                      Data Sharing
                      <p className='text-gray-500 text-sm'>
                        Allow or restrict data sharing with partners.
                      </p>
                    </Label>
                    <Switch id='data-sharing' />
                  </div>
                  <Button className='bg-gradient-to-r from-emerald-500 to-blue-500 text-white'>
                    Save Privacy Settings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Help & Support */}
            <motion.div variants={fadeInUp}>
              <Card className='bg-white shadow-lg border-0'>
                <CardHeader className='pb-3'>
                  <h3 className='font-semibold text-gray-900 text-xl'>
                    Help & Support
                  </h3>
                  <p className='text-gray-600 text-sm'>
                    Find answers to your questions or contact us.
                  </p>
                </CardHeader>{" "}
                {/* Corrected: Removed extra </p> tag here */}
                <CardContent className='space-y-4'>
                  <Link href='#' passHref>
                    <Button variant='outline' className='justify-start w-full'>
                      <Mail className='mr-2 w-4 h-4' />
                      Contact Support
                    </Button>
                  </Link>
                  <Link href='#' passHref>
                    <Button variant='outline' className='justify-start w-full'>
                      <BookOpen className='mr-2 w-4 h-4' />
                      View FAQs
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
