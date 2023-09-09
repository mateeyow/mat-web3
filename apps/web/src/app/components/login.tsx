'use client'
export default function Login() {
  const clickMe = async () => {
    console.info('eth');
    const MMSDK = new global.MetaMaskSDK();
    console.log('MMSDK', MMSDK);
    const eth = MMSDK.getProvider()
    console.log('eth', eth);
  }

  return (
    <main>
      <button onClick={() => void clickMe()} type='button'>Connect Your Metamask Wallet</button>
    </main>
  )
}
