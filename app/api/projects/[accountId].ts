import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import *  as z from 'zod';

export async function POST(req: NextRequest) {
    try {
        // const accountId = req.query.accountId as string;

        return NextResponse.json({ user: null, message: 'Projects Loaded Succssfully!' }, { status: 201 });
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: 'Internal Server Error', message: e}, { status: 500 });
    }
}