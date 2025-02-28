import { NextRequest, NextResponse } from "next/server";
import { SiweMessage, SiweErrorType } from "siwe";
import { auth, unstable_update, signOut } from "../../../auth"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 })
  }

  try {
    const body = await req.json();
    const { message, signature } = body;
    console.log(message, signature)

    let nonce = ""
    if (session?.user) {
      nonce  = session.user.nonce
    }

    if (!body || !message || !signature) {
      return NextResponse.json(
        { message: "Expected prepareMessage object as body." },
        { status: 422 }
      );
    }

    let SIWEObject = new SiweMessage(message);
    const data = await SIWEObject.verify({ signature: signature, nonce });

    if (!data.success || data.data.address != session?.user?.address as string) {
      return NextResponse.json({ message: "Unauthenticated" }, {status: 401})
    }
    
    if (session?.user) {
      await unstable_update({user: { nonce: "", cleared2Fa: true}});
    }
    return NextResponse.json({ message: "2FA verification successful" }, {status: 200});
  } catch (e) {
    if (session?.user) {
      await unstable_update({user: { nonce: "", cleared2Fa: false}});
    }
    console.error(e as string);
    switch (e) {
        case SiweErrorType.EXPIRED_MESSAGE: {
          return NextResponse.json(
            { message: e },
            { status: 440 }
          );
        }
        case SiweErrorType.INVALID_SIGNATURE: {
          return NextResponse.json(
            { message: e },
            { status: 422 }
          );
        }
        default: {
          return NextResponse.json(
            { message: e },
            { status: 500 }
          );
        }
    }        
}
}