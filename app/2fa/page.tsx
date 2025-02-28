import { auth, unstable_update } from "../../auth"
import { redirect } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '../globals.css';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
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
      <div className="flex min-h-screen items-center justify-center bg-crab bg-cover">
      <div className="w-full max-w-xs bg--white p-8 rounded-2xl shadow-lg">
      <div
        style={{
          display: 'inline',
          justifyContent: 'flex-start',

        }}>
         <ConnectButton/>
          
      </div>
      <Signature />
        <p>{session.user?.cleared2Fa}</p>
        </div>
        </div>
      </>
    );
  }