import type { MetaMaskInpageProvider } from '@metamask/providers'

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider
  }
}

// declare module '*.mp3' {
//   const src: string;
//   export default src;
// }
