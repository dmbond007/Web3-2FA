"use client"

import '@rainbow-me/rainbowkit/styles.css';
import { Buffer } from 'buffer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { WagmiProvider, cookieToInitialState } from 'wagmi'
import { RainbowKitProvider, } from '@rainbow-me/rainbowkit';
import { getConfig } from '../wagmi';
import './globals.css'
import { ReactNode } from "react";
import { useState } from 'react';

globalThis.Buffer = Buffer


export default function Web3Provider({ children, param }: { children: ReactNode, param: any }) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());
  const initialState = cookieToInitialState(
    getConfig(),
    param);

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