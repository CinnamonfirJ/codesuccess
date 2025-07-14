"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Settings,
  BookOpen,
  // Award,
  Calendar,
  // MapPin,
  Mail,
  // Phone,
  Edit,
  Share2,
  // Download,
  Users,
  // Clock,
  Trophy,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";

import { useUser } from "@/hooks/useUser";
import moment from "moment";

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

// const scaleOnHover = {
//   whileHover: { scale: 1.02 },
//   whileTap: { scale: 0.98 },
// };

// Mock user data
const userData = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
  phone: "+234 801 234 5678",
  location: "Lagos, Nigeria",
  joinDate: "January 2024",
  bio: "Aspiring software developer passionate about creating positive change through technology. Currently learning full-stack development and building projects that matter.",
  avatar: "/muhammad-taha-ibrahim-boIrez2f5hs-unsplash.jpg",
  stats: {
    coursesCompleted: 12,
    totalCourses: 15,
    points: 2450,
    rank: "Rising Star",
    streak: 28,
    certificates: 8,
  },
  achievements: [
    {
      id: 1,
      title: "First Course Completed",
      icon: BookOpen,
      color: "emerald",
      date: "2 weeks ago",
    },
    {
      id: 2,
      title: "7-Day Streak",
      icon: Zap,
      color: "yellow",
      date: "1 week ago",
    },
    {
      id: 3,
      title: "Community Helper",
      icon: Users,
      color: "blue",
      date: "3 days ago",
    },
    {
      id: 4,
      title: "Top Performer",
      icon: Trophy,
      color: "purple",
      date: "Yesterday",
    },
  ],
  recentActivity: [
    {
      id: 1,
      action: "Completed",
      item: "React Fundamentals",
      type: "course",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Earned",
      item: "JavaScript Expert Badge",
      type: "achievement",
      time: "1 day ago",
    },
    {
      id: 3,
      action: "Started",
      item: "Node.js Masterclass",
      type: "course",
      time: "2 days ago",
    },
    {
      id: 4,
      action: "Joined",
      item: "Web Development Study Group",
      type: "community",
      time: "3 days ago",
    },
  ],
};

export default function ProfilePage() {
  // const [activeTab, setActiveTab] = useState("overview")
  // const progressPercentage =
  //   (userData.stats.coursesCompleted / userData.stats.totalCourses) * 100;

  const { user } = useUser();

  if (!user) {
    return (
      <div className='flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen'>
        <div className='text-gray-500'>Loading...</div>
      </div>
    );
  }

  // if (loading) {
  //   return (
  //     <div className='flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen'>
  //       <div className='text-gray-500'>Loading...</div>
  //     </div>
  //   );
  // }

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
          <div className='flex justify-between items-center'>
            <div className='flex justify-start items-center gap-4 mb-4'>
              <Link href='/homepage'>
                <Button variant='ghost' className='gap-2'>
                  <ArrowLeft className='w-4 h-4' />
                  Home
                </Button>
              </Link>
              <h1 className='font-bold text-gray-900 text-3xl'>My Profile</h1>
            </div>
            <div className='flex items-center gap-4'>
              <Button variant='outline' className='border-gray-300'>
                <Share2 className='mr-2 w-4 h-4' />
                Share Profile
              </Button>
              <Link href='/profile/settings'>
                <Button className='bg-gradient-to-r from-emerald-500 to-blue-500 text-white'>
                  <Settings className='mr-2 w-4 h-4' />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        <div className='gap-8 grid lg:grid-cols-3'>
          {/* Left Column - Profile Info */}
          <motion.div
            className='space-y-6 lg:col-span-1'
            variants={staggerContainer}
            initial='initial'
            animate='animate'
          >
            {/* Profile Card */}
            <motion.div variants={fadeInUp}>
              <Card className='bg-white shadow-xl border-0 overflow-hidden'>
                <CardHeader className='bg-gradient-to-r from-emerald-500 to-blue-500 p-8 text-white text-center'>
                  <Avatar className='mx-auto mb-4 border-4 border-white/20 w-24 h-24'>
                    <AvatarImage
                      src={user?.profile?.profile_image || "/placeholder.svg"}
                      alt={`${user?.first_name} ${user?.last_name}`}
                    />
                    <AvatarFallback className='bg-white/20 font-bold text-white text-2xl'>
                      {user?.first_name[0]}
                      {user?.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className='mb-2 font-bold text-2xl'>
                    {user?.first_name} {user?.last_name}
                  </h2>
                  {/* <Badge className='bg-white/20 mb-3 text-white'>
                    {userData.stats.rank}
                  </Badge> */}
                  <p className='text-emerald-100 text-sm leading-relaxed'>
                    {user?.profile.bio}
                  </p>
                </CardHeader>
                <CardContent className='p-6'>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3 text-gray-600'>
                      <Mail className='w-4 h-4' />
                      <span className='text-sm'>{user?.email}</span>
                    </div>
                    {/* <div className='flex items-center gap-3 text-gray-600'>
                      <Phone className='w-4 h-4' />
                      <span className='text-sm'>{userData.phone}</span>
                    </div>
                    <div className='flex items-center gap-3 text-gray-600'>
                      <MapPin className='w-4 h-4' />
                      <span className='text-sm'>{userData.location}</span>
                    </div> */}
                    <div className='flex items-center gap-3 text-gray-600'>
                      <Calendar className='w-4 h-4' />
                      <span className='text-sm'>
                        Joined {moment(userData.joinDate).format("MMM Do YY")}
                      </span>
                    </div>
                  </div>
                  <Link href={"/profile/settings"}>
                    <Button className='bg-gradient-to-r from-emerald-500 to-blue-500 mt-6 w-full text-white'>
                      <Edit className='mr-2 w-4 h-4' />
                      Edit Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Card */}
            {/* <motion.div variants={fadeInUp}>
              <Card className='bg-white shadow-lg border-0'>
                <CardHeader className='pb-3'>
                  <h3 className='font-semibold text-gray-900 text-lg'>
                    Learning Stats
                  </h3>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='gap-4 grid grid-cols-2'>
                    <div className='text-center'>
                      <div className='font-bold text-emerald-600 text-2xl'>
                        {userData.stats.coursesCompleted}
                      </div>
                      <div className='text-gray-600 text-xs'>
                        Courses Completed
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='font-bold text-blue-600 text-2xl'>
                        {userData.stats.points}
                      </div>
                      <div className='text-gray-600 text-xs'>Total Points</div>
                    </div>
                    <div className='text-center'>
                      <div className='font-bold text-purple-600 text-2xl'>
                        {userData.stats.streak}
                      </div>
                      <div className='text-gray-600 text-xs'>Day Streak</div>
                    </div>
                    <div className='text-center'>
                      <div className='font-bold text-orange-600 text-2xl'>
                        {userData.stats.certificates}
                      </div>
                      <div className='text-gray-600 text-xs'>Certificates</div>
                    </div>
                  </div>

                  <div>
                    <div className='flex justify-between items-center mb-2'>
                      <span className='font-medium text-gray-700 text-sm'>
                        Course Progress
                      </span>
                      <span className='text-gray-600 text-sm'>
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    <Progress value={progressPercentage} className='h-2' />
                    <p className='mt-1 text-gray-500 text-xs'>
                      {userData.stats.coursesCompleted} of{" "}
                      {userData.stats.totalCourses} courses completed
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div> */}
          </motion.div>

          {/* Right Column - Main Content */}
          <motion.div
            className='space-y-6 lg:col-span-2'
            variants={staggerContainer}
            initial='initial'
            animate='animate'
          >
            {/* Achievements */}
            {/* <motion.div variants={fadeInUp}>
              <Card className='bg-white shadow-lg border-0'>
                <CardHeader className='pb-3'>
                  <div className='flex justify-between items-center'>
                    <h3 className='font-semibold text-gray-900 text-lg'>
                      Recent Achievements
                    </h3>
                    <Button variant='outline' size='sm'>
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='gap-4 grid md:grid-cols-2'>
                    {userData.achievements.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        className='flex items-center gap-4 bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors'
                        {...scaleOnHover}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${
                            achievement.color === "emerald"
                              ? "from-emerald-500 to-green-500"
                              : achievement.color === "yellow"
                                ? "from-yellow-500 to-orange-500"
                                : achievement.color === "blue"
                                  ? "from-blue-500 to-cyan-500"
                                  : "from-purple-500 to-pink-500"
                          }`}
                        >
                          <achievement.icon className='w-6 h-6 text-white' />
                        </div>
                        <div className='flex-1'>
                          <h4 className='font-medium text-gray-900'>
                            {achievement.title}
                          </h4>
                          <p className='text-gray-600 text-sm'>
                            {achievement.date}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div> */}

            {/* Recent Activity */}
            {/* <motion.div variants={fadeInUp}>
              <Card className='bg-white shadow-lg border-0'>
                <CardHeader className='pb-3'>
                  <h3 className='font-semibold text-gray-900 text-lg'>
                    Recent Activity
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {userData.recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className='flex items-center gap-4 hover:bg-gray-50 p-4 rounded-lg transition-colors'
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === "course"
                              ? "bg-emerald-100 text-emerald-600"
                              : activity.type === "achievement"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {activity.type === "course" ? (
                            <BookOpen className='w-5 h-5' />
                          ) : activity.type === "achievement" ? (
                            <Award className='w-5 h-5' />
                          ) : (
                            <Users className='w-5 h-5' />
                          )}
                        </div>
                        <div className='flex-1'>
                          <p className='text-gray-900'>
                            <span className='font-medium'>
                              {activity.action}
                            </span>{" "}
                            {activity.item}
                          </p>
                          <p className='flex items-center gap-1 text-gray-600 text-sm'>
                            <Clock className='w-3 h-3' />
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div> */}

            {/* Quick Actions */}
            <motion.div variants={fadeInUp}>
              <Card className='bg-gradient-to-r from-emerald-500 to-blue-500 shadow-lg border-0 text-white'>
                <CardContent className='p-8'>
                  <h3 className='mb-4 font-bold text-xl'>
                    Continue Your Journey
                  </h3>
                  <p className='mb-6 text-emerald-100'>
                    You&apos;re doing great! Keep up the momentum and unlock new
                    achievements.
                  </p>
                  <div className='flex flex-wrap gap-4'>
                    <Button className='bg-white hover:bg-gray-100 text-emerald-600'>
                      <BookOpen className='mr-2 w-4 h-4' />
                      Continue Learning
                    </Button>
                    {/* <Button
                      variant='outline'
                      className='hover:bg-white/10 border-white text-white'
                    >
                      <Download className='mr-2 w-4 h-4' />
                      Download Certificate
                    </Button> */}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
