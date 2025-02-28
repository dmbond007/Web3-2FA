"use client"

import '@rainbow-me/rainbowkit/styles.css';
import { Buffer } from 'buffer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { WagmiProvider, cookieToInitialState } from 'wagmi'
import { RainbowKitProvider, } from '@rainbow-me/rainbowkit';
import { getConfig } from '../wagmi';
import { headers } from 'next/headers';
import './globals.css'
import { ReactNode } from "react";
import { useState } from 'react';

globalThis.Buffer = Buffer


export default async function Web3Provider({ children }: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get('cookie'));
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <React.StrictMode>
      <WagmiProvider config={config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  )
}