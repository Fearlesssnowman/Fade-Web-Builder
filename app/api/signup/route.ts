import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import *  as z from 'zod';

const userSchema = z
.object({
    name: z.string().min(1, 'Name is required').max(255, 'Name is too long'),
    username: z.string().min(1, 'Username is required').max(255, 'Username is too long'),
    password: z.string().min(8, 'Password must be at least 8 characters long')
})

export async function POST(req: Request) {
    try {
        
        const body = await req.json();
        console.log("Reached here with ", body)
        const { name, username, password } = userSchema.parse(body);

        const existingUser = await db.user.findUnique({
            where: {
                username
            }
        });

        if (existingUser) {
            console.log("Idhar hag diya sorry")
            return NextResponse.json({ user: null, message: 'User with this username already exists!' }, { status: 409 });
        }
        
        const hashedPassword = await hash(password, 10);

        const newUser = await db.user.create({
            data: {
                fullName: name,
                username,
                password: hashedPassword,
                companyEmail: "",
            }
        }); 

        const { password: _, ...user } = newUser;
        console.log("User created successfully! I think so atleast")
        return NextResponse.json({ user: user, message: 'User created successfully!' }, { status: 201 });
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: 'Internal Server Error', message: e}, { status: 500 });
    }
}