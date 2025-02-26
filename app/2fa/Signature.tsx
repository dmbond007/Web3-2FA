"use client"

import { useAccount, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from "react";

export default function Signature() {
  
  const {address, isConnected, chainId} = useAccount()
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

  const signInWithEthereum = async ()=> {
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
       console.log('yay')
      }
    }
    /*
    const message = createSiweMessage(
      address, 
      'Sign in with Ethereum to the app.'
    );
    console.log(message)
    return signMessageAsync({ message }).then((signature) => ({ message, signature }))
    .then(({message, signature}) => {
      console.log('here')
      return fetch(`api/verify_2fa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature: signature}),
        credentials: "include",
      })
    }).then((res) => {
      if (res.ok) {
        console.log("yay!");
      } else {
        console.error("Request failed:", res.status);
      }
    })
    .catch((error) => console.error("Error:", error));
  }
    */

    /*
    const signature = await signMessageAsync({ message: nonce });
    const res = await fetch(`/verify`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nonce, signature }),
      credentials: 'include'
    });
    if (res.ok) {
      console.log('yay!')
    }
  }
    */

  return (
  <>
    {isConnected && host && origin && <button onClick={signInWithEthereum}>Sign message</button>}
  </>
  )
}

/*
import { useAccount, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';

function App() {
  const account = useAccount()
  const { signMessageAsync } = useSignMessage();
  const { isConnected } = useAccount();
  const [profile, setProfile] = useState<string>('')

  const domain = window.location.host;
  const origin = window.location.origin;
  

  const createSiweMessage =  async (address: any, statement: any) => {
    console.log(import.meta.env.VITE_BACKEND_ADDR)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ADDR}/nonce`, {
      credentials: 'include',
    });
    console.log(res)

    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: account.chainId,
      nonce: await res.text()
    });
    return message.prepareMessage();
  }

  const signInWithEthereum = async ()=> {
    const message = await createSiweMessage(
        account.address, 
        'Sign in with Ethereum to the app.'
      );
    const signature = await signMessageAsync({ message: message });
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ADDR}/verify`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, signature }),
      credentials: 'include'
    });
    if (res.ok) {
      getProfileInfo()
    }
  }

  const getProfileInfo = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ADDR}/personal_information`, {
        credentials: 'include',
    });
    setProfile(await res.text())
}

  return (
    <>
      <ConnectButton />
      {isConnected && <button onClick={signInWithEthereum}>Sign message</button>}
      <p>{profile}</p>

    </>
  )
}

export default App
*/