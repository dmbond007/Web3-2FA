import { http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  ssr: true,
})


declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
