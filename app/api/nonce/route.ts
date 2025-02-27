import { NextResponse } from "next/server";
import { generateNonce, SiweMessage } from 'siwe';
import { auth, unstable_update } from "../../../auth"

export async function GET() {
    // Generate a nonce (random string)
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: "Not Authorized" }, { status: 401 })
    }
    const nonce = generateNonce();
    await unstable_update({user: { nonce, cleared2Fa: false}});
  
    // Return the nonce to the client
    return NextResponse.json({ nonce });
  }