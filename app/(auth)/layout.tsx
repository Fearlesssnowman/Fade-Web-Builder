import React from 'react'
import { FC, ReactNode } from 'react';
import { Toaster } from "@/components/ui/sonner"
import Navbar from '@/components/Navbar';


interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({children}) => {
  return (
    <div className='bg-slate-200 h-full p-10 rounded-md flex justify-center items-center'>
      <Navbar />
      {children}
      </div>
  )
};

export default AuthLayout;