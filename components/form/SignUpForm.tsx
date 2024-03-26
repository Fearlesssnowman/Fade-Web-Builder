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
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const FormSchema = z
.object({
    name: z.string().min(5, {message: "Name must be atleast 5 characters"}).max(20),
    username: z.string().min(5, {message: "Username must be atleast 5 characters"}).max(20),
    password: z
    .string()
    .min(1, 'Password is required')
    .min(8, {message: "Password must be atleast 8 characters"}),
    confirmPassword: z
    .string()
    .min(1, 'Password is required')
})
.refine((data)=> data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['confirmPassword']
});
  

  const SignUpForm = ( ) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const router = useRouter()



    const onSubmit = async (values: z.infer<typeof FormSchema> ) => {
        console.log("Reached here")
        
        
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({
                name: values.name,
                username: values.username,
                password: values.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        if(!response.ok){
            toast("Whoopsie!", {
                description: data.message,
            })
            return
        }
        toast("Account created successfully!", {
            description: data.message,
        })
        console.log(data.message)
        router.push(`/${data.user.username}/funnels`)
    }


    return (
        <div className='bg-gray-200 p-[30px] py-[20px] mt-10 rounded-xl'>
            <div className='flex justify-center text-slate-900 text-2xl mb-6 '>
                <h1>Sign Up to <span className='text-gray-800 text-3xl font-bold font-mono'>FaDe</span></h1>
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl >
                            <Input placeholder="Enter your full name" {...field} />
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
                        <FormControl >
                            <Input type='password' placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormDescription>
                            
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl >
                            <Input type='password' placeholder="Re-Enter your password" {...field} />
                        </FormControl>
                        <FormDescription>
                            
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    </div>
                    
                    <Button className='w-full mt-5'  type="submit">Sign Up</Button>
                    <Separator className='my-[10px]'/>
                    <Button className='w-full font-mono' variant={'outline'}> Sign up with DAuth </Button>
                </form>
            

            <p>
                If you already have an account, please&nbsp;
                <Link className='text-blue-500 hover:underline duration-300' href='/sign-in'>Sign in</Link>
                
            </p>
            </Form>
        </div>
    )
}

export default SignUpForm