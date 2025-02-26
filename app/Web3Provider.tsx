"use client"

import '@rainbow-me/rainbowkit/styles.css';
import { Buffer } from 'buffer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { WagmiProvider } from 'wagmi'
import {RainbowKitProvider,} from '@rainbow-me/rainbowkit';
import { config } from '../wagmi';
import './globals.css'
import { ReactNode } from "react";

globalThis.Buffer = Buffer

const queryClient = new QueryClient()


export default function Web3Provider({ children }: { children: ReactNode }) {
    return (
      <React.StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
    )
  }