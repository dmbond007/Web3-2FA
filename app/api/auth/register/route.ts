import { NextRequest, NextResponse } from "next/server";
import { auth, prisma } from "@/auth"
import { Users } from "@prisma/client"
import { randomBytes } from 'crypto';
// @ts-ignore
import saltedSha256 from 'salted-sha256';
import { validateRequest } from "./validate_request";

export async function POST(req: NextRequest) {
    const session = await auth()
    if (session) {
        return NextResponse.json({ error: "Bad request" }, { status: 400 })
    }
    const body = await req.json();
    const error = await validateRequest(body)
    if (error.length > 0) {
        return NextResponse.json({ error }, { status: 400 })
    }

    const salt = randomBytes(16).toString('hex');
    const saltedHashAsync = await saltedSha256(body.password, salt, true);

    await prisma.users.create({
        data: {
            salt,
            fname: body.firstName,
            lname: body.lastName,
            email: body.email,
            wallet: body.address,
            passhash: saltedHashAsync
        } as Users
    })
    return NextResponse.json({ message: "Registered" }, { status: 200 })
}