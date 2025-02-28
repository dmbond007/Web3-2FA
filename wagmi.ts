import { http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { rainbowWallet, walletConnectWallet, oktoWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConfig } from 'wagmi'

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [rainbowWallet, walletConnectWallet, oktoWallet],
    },
  ],
  {
    appName: 'My RainbowKit App',
    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
  }
);

export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  ssr: true,
  connectors,
})


declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
