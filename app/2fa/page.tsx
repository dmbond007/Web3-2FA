import { auth, unstable_update } from "../../auth"
import { redirect } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { generateNonce, SiweMessage } from 'siwe';
import Signature from "./Signature";

export default async function Test() {
    const session = await auth()
    if (!session) {
        redirect('/')
    }
    if (session.user?.cleared2Fa) {
      redirect('/dashboard')
    }
   
    return (
      <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 12,
        }}>
          <ConnectButton />
      </div>
      <Signature />
        <p>{session.user?.cleared2Fa}</p>
      </>
    );
  }