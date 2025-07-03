import {
  Search,
  Bell,
  MessageSquare,
  Menu,
  User,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Form from "next/form";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  onLeftSidebarToggle?: () => void;
  onRightSidebarToggle?: () => void;
}

export default function Navbar({
  onLeftSidebarToggle,
  onRightSidebarToggle,
}: NavbarProps) {
  return (
    <nav className='top-0 right-0 left-0 z-50 fixed bg-background/80 backdrop-blur-md border-b border-b-white'>
      <div className='flex justify-between items-center mx-auto px-4 py-3 container'>
        {/* Left Section - Logo and Mobile Menu */}
        <div className='flex items-center gap-4'>
          {/* Mobile Menu Button - Left Sidebar */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            onClick={onLeftSidebarToggle}
          >
            <Menu className='w-5 h-5' />
          </Button>

          {/* Logo */}
          <div className='flex items-center gap-2'>
            <div className='flex justify-center items-center rounded-lg w-8 h-8'>
              <Image
                src='/logo.png' // Path to your image in the public directory
                alt='CodeSuccess Logo' // Important for accessibility and SEO
                width={32} // Match the 'w-8' (32px)
                height={32} // Match the 'h-8' (32px)
                className='rounded-lg' // Apply border-radius if needed
              />
            </div>
            <h1 className='hidden sm:block font-bold text-navy text-xl'>
              CodeSuccex
            </h1>
          </div>
        </div>

        {/* Center Section - Search (Desktop) */}
        <Form action='/search' className='hidden md:flex flex-1 mx-8 max-w-md'>
          <div className='relative w-full'>
            <Search className='top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform' />
            <Input
              type='text'
              name='term'
              placeholder='Search posts, people, or topics...'
              className='bg-gray-50 focus:bg-white pl-10 border-gray-200'
            />
          </div>
        </Form>

        {/* Right Section - Actions and Profile */}
        <div className='flex items-center gap-2'>
          {/* Desktop Navigation Icons */}
          <div className='hidden md:flex items-center gap-1'>
            {/* Messages */}
            <Button variant='ghost' size='icon' className='relative'>
              <MessageSquare className='w-5 h-5' />
              <span className='-top-1 -right-1 absolute flex justify-center items-center bg-amber-600 rounded-full w-4 h-4 text-white text-xs'>
                3
              </span>
            </Button>

            {/* Notifications */}
            <Button variant='ghost' size='icon' className='relative'>
              <Bell className='w-5 h-5' />
              <span className='-top-1 -right-1 absolute flex justify-center items-center bg-amber-600 rounded-full w-4 h-4 text-white text-xs'>
                5
              </span>
            </Button>
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='relative rounded-full w-10 h-10'
              >
                <Avatar className='w-9 h-9'>
                  <AvatarImage
                    src='/muhammad-taha-ibrahim-boIrez2f5hs-unsplash.jpg'
                    alt='User'
                  />
                  <AvatarFallback className='bg-teal-100 text-teal-800'>
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
              <div className='flex flex-col space-y-1 p-2'>
                <p className='font-medium text-sm leading-none'>Jane Doe</p>
                <p className='text-muted-foreground text-xs leading-none'>
                  jane@example.com
                </p>
              </div>
              <DropdownMenuSeparator />
              <Link href='/profile/me'>
                <DropdownMenuItem>
                  <User className='mr-2 w-4 h-4' />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href='/profile/me'>
                <DropdownMenuItem>
                  <Settings className='mr-2 w-4 h-4' />
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className='md:hidden'>
                <MessageSquare className='mr-2 w-4 h-4' />
                <span>Messages</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='md:hidden'>
                <Bell className='mr-2 w-4 h-4' />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button - Right Sidebar */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            onClick={onRightSidebarToggle}
          >
            <Menu className='w-5 h-5' />
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <Form action='/search' className='md:hidden px-4 pb-3'>
        <div className='relative'>
          <Search className='top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform' />
          <Input
            type='text'
            name='term'
            placeholder='Search...'
            className='bg-gray-50 pl-10 border-gray-200'
          />
        </div>
      </Form>
    </nav>
  );
}
