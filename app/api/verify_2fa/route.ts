import { NextRequest, NextResponse } from "next/server";
import { SiweMessage, SiweErrorType } from "siwe";
import { auth, unstable_update } from "../../../auth"

export async function POST(req: NextRequest) {
  const session = await auth()
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
    console.log(data.success, data.data.address)
    
    if (session?.user) {
      await unstable_update({user: { nonce: "", cleared2Fa: true}});
    }
    return Response.json({ message: "2FA verification successful" });
  } catch (e) {
    if (session?.user) {
      await unstable_update({user: { nonce: "", cleared2Fa: false}});
    }
    console.error(e);
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