'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link'
import React, { useEffect } from 'react'

const Funnels = ({ params } : { params : { accountId : string } }) => {
    const accountId = params.accountId;

    const projects = [];

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(`/api/projects/${accountId}`, {
                method: 'GET',
            })
            const data = await response.json()
            // const response = await fetch(`/api/projects/${accountId}`);
            // const data = await response.json();
            console.log(data);
        };
        fetchData();
    }, [])

    return (
        <div className='w-[80vw] bg-gray-100 h-[80vh] flex justify-center items-center rounded-3xl'>
            <div className='w-full m-[50px] h-full flex flex-col justify-start'>
                <div className='mt-[20px] mb-4'>
                    <h1 className='text-5xl font-mono ml-[10px]'>Hello, {accountId}</h1>
                    <span className='font-mono  ml-[10px] mb-[20px]'>This is where you view all your projects</span>
                </div>

                <Separator decorative className='bg-gray-700 py-[1px]'/>

                <div className='flex-grow ml-[10px] my-[20px] bg-gray-200 rounded-xl p-[20px] overflow-auto grid grid-cols-3 gap-4'>
                    <Link href={`/${accountId}/1/overview`}>
                        <Card className="w-[350px] font-mono h-[150px]  hover:bg-slate-300 transition-all">
                            <CardHeader>
                                <CardTitle>Project 1</CardTitle>
                                <CardDescription>Description of Project 1.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href={`/${accountId}/2/overview`}>
                        <Card className="w-[350px] font-mono h-[150px] hover:bg-slate-300 transition-all">
                            <CardHeader>
                                <CardTitle>Project 2</CardTitle>
                                <CardDescription>Description of Project 2.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href={`/${accountId}/3/overview`}>
                        <Card className="w-[350px] font-mono h-[150px]  hover:bg-slate-300 transition-all">
                            <CardHeader>
                                <CardTitle>Project 3</CardTitle>
                                <CardDescription>Description of Project 3.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Funnels
