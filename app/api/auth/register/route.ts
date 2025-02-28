import { NextRequest, NextResponse } from "next/server";
import { auth, prisma } from "@/auth"
import { Users } from "@prisma/client"

export async function POST(req: NextRequest) {
    const session = await auth()
    if (session) {
        return NextResponse.json({ error: "Bad request" }, { status: 400 })
    }
    const body = await req.json();
    console.log(body)
    /*
    passhash        String
salt            String
fname           String
lname           String 
email           String    @unique
wallet          String
    */
    /*
    firstName: 'Liubov',
   lastName: 'Nikolenko',
   email: 'nikki.nikolenko@gmail.com',
   password: '123456',
   confirmPassword: '123456',
   address: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'
    */
    const newUser = await prisma.users.create({
        data: {
            salt: "abc",
            fname: body.firstName,
            lname: body.lastName,
            email: body.email,
            wallet: body.address,
            passhash: "def"
        } as Users
    })
    return NextResponse.json({ message: "Registered" }, { status: 200 })
}