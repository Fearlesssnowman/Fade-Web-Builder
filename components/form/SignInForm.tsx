'use client';

import React from 'react'
import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Link from 'next/link';
import { Separator } from '../ui/separator';

const FormSchema = z.object({
    username: z.string().min(5, {message: "Username must be atleast 5 characters"}),
    password: z
    .string()
    .min(1, 'Password is required')
    .min(8, {message: "Password must be atleast 8 characters"})
    });
  

  const SignInForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });



const onSubmit = (values: z.infer<typeof FormSchema> ) => {
}


  return (
    
    <div>
      <div className='flex justify-center text-slate-900 text-2xl mb-6 '>
        <h1>Sign in to <span className='text-gray-800 text-3xl font-bold font-mono'>FaDe</span></h1>
      </div>
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
        <div className='space-y-2'>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl >
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormDescription>
                
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Enter your password" {...field} />
              </FormControl>
              <FormDescription>
                
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        
        <Button className='w-full mt-5'  type="submit">Sign In</Button>
        <Separator className='my-[10px]'/>
        <Button className='w-full font-mono' variant={'outline'}> Sign up with DAuth </Button>
      </form>
      <p>
        If you don't have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline duration-300' href='/sign-up'>Sign up</Link>
        
      </p>
    </Form>
    </div>
  )
}

export default SignInForm