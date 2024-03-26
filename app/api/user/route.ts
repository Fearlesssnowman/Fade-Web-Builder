import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Came in here with ", body)
        const { name, username, password } = body;

        const existingUser = await db.user.findUnique({
            where: {
                username
            }
        });

        if (existingUser) {
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
        
        return NextResponse.json({ user: user, message: 'User created successfully!' }, { status: 201 });
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: 'Internal Server Error', message: e}, { status: 500 });
    }
}