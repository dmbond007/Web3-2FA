"use client"

import { useAccount, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe';
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation'

export default function Signature() {

  const { address, isConnected, chainId } = useAccount()
  const { signMessageAsync } = useSignMessage();
  const [host, setHost] = useState<string>('')
  const [origin, setOrigin] = useState<string>('')

  const createSiweMessage = async (address: any, statement: any) => {
    const response = await fetch("/api/nonce");
    if (!response.ok) {
      throw new Error("Failed to fetch nonce");
    }
    const data = await response.json();
    console.log(data.nonce)
    const message = new SiweMessage({
      domain: host,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: chainId,
      nonce: data.nonce
    });
    return message.prepareMessage();
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.host);
      setOrigin(window.location.origin)
    }
  }, []);

  const signInWithEthereum = async () => {
    const message = await createSiweMessage(
      address,
      'Sign in with Ethereum to the app.'
    );
    console.log("Requesting signature for message:", message)
    const signature = await signMessageAsync({ message });
    console.log("Signature received:", signature)
    const res = await fetch('api/verify_2fa', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, signature }),
      credentials: 'include'
    });
    if (res.ok) {
      redirect('/dashboard')
    } else if (res.status == 401) {
      redirect('/invalid_2fa')
    }
  }

  return (
    <>
      {isConnected && host && origin && <button className="w-full bg-black text-white my-3 py-3 rounded-lg hover:bg-sky-600 transition" onClick={signInWithEthereum}>Sign message</button>}
    </>
  )
}