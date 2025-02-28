"use client"

import { http, cookieStorage, createStorage } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { connectorsForWallets, Wallet } from '@rainbow-me/rainbowkit';
import { rainbowWallet, walletConnectWallet, oktoWallet } from '@rainbow-me/rainbowkit/wallets';
import { okto } from '@okto_web3/wagmi-adapter';
import { createConfig } from 'wagmi'

const oktoWalletV2connector = okto({
  environment: 'sandbox',
  clientPrivateKey: `0x${process.env.CLIENT_PRIVATE_KEY as string}`,
  clientSWA: `0x${process.env.CLIENT_SWA as string}`,
})

export const oktoWalletV2 = ({ projectId }: MyWalletOptions): Wallet => ({
  id: 'Okto-v2',
  name: 'OktoV2',
  iconUrl: async () => (await import('./app/img/oktoWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=im.okto.contractwalletclient',
    ios: 'https://apps.apple.com/in/app/okto-wallet/id6450688229',
    mobile: 'https://okto.tech/',
    qrCode: 'https://okto.tech/',
  },
  mobile: {
    getUri: (uri: string) => {
      return `okto://wc?uri=${encodeURIComponent(uri)}`;
    },
  },
  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: 'https://okto.tech/',
      steps: [
        {
          description: 'wallet_connectors.okto.qr_code.step1.description',
          step: 'install',
          title: 'wallet_connectors.okto.qr_code.step1.title',
        },
        {
          description: 'wallet_connectors.okto.qr_code.step2.description',
          step: 'create',
          title: 'wallet_connectors.okto.qr_code.step2.title',
        },
        {
          description: 'wallet_connectors.okto.qr_code.step3.description',
          step: 'scan',
          title: 'wallet_connectors.okto.qr_code.step3.title',
        },
      ],
    },
  },
  createConnector: () => oktoWalletV2connector
});


export interface MyWalletOptions {
  projectId: string;
}

oktoWallet

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        rainbowWallet,
        walletConnectWallet,
        oktoWalletV2,
      ],
    },
  ],
  {
    appName: 'My RainbowKit App',
    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
  }
);

export function getConfig() {
  return createConfig({
    chains: [mainnet],
    transports: {
      [mainnet.id]: http(),
    },
    ssr: true,
    connectors,
    storage: createStorage({
      storage: cookieStorage,
    }),
  })


}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
