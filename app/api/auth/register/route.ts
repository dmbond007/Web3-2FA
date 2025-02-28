import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth"

export async function POST(req: NextRequest) {
    const session = await auth()
    if (session) {
        return NextResponse.json({ error: "Bad request" }, { status: 400 })
    }
    const body = await req.json();
    console.log(body)
    return NextResponse.json({ message: "Registered" }, { status: 200 })
}