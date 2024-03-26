import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link'
import React from 'react'

function FunnelOverview({ params } : { params : { accountId : string, funnelId: string } }) {
    const accountId = params.accountId;
    const funnelId = params.funnelId;
    return (
        <div className='w-[80vw] bg-gray-100 h-[80vh] flex justify-center items-center rounded-3xl'>
        <div className='w-full m-[50px] h-full flex flex-col justify-start'>
            <div className='mt-[20px] mb-4'>
                <h1 className='text-4xl font-mono ml-[10px]'>Project Name: {funnelId}</h1>
            </div>

            <Separator decorative className='bg-gray-700 py-[1px]'/>

            <div className='flex-grow ml-[10px] my-[20px] bg-gray-200 rounded-xl p-[20px] overflow-auto grid grid-cols-3 gap-4'>
                <Link href={`/${accountId}/${funnelId}/1`}>
                    <Card className="w-[350px] font-mono h-[150px]  hover:bg-slate-300 transition-all">
                        <CardHeader>
                            <CardTitle>Page 1</CardTitle>
                            <CardDescription>Description of Page 1.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href={`/${accountId}/${funnelId}/2`}>
                    <Card className="w-[350px] font-mono h-[150px] hover:bg-slate-300 transition-all">
                        <CardHeader>
                            <CardTitle>Page 2</CardTitle>
                            <CardDescription>Description of Page 2.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href={`/${accountId}/${funnelId}/3`}>
                    <Card className="w-[350px] font-mono h-[150px]  hover:bg-slate-300 transition-all">
                        <CardHeader>
                            <CardTitle>Page 3</CardTitle>
                            <CardDescription>Description of Page 3.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>

        </div>
    </div>
    )
}

export default FunnelOverview
