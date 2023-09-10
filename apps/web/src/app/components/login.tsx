'use client'
export default function Login() {
  const clickMe = async () => {
    // TODO: Might need to extract it to a different type
    if (typeof window.ethereum === 'undefined') {
      return null
    }

    try {
      const accounts = await window.ethereum.request<string[]>({ method: 'eth_requestAccounts' })
      console.log('accounts', accounts);
    } catch (err) {
      console.error('Something went wrong:', err)
    }
  }

  return (
    <main>
      <button onClick={() => void clickMe()} type='button'>Connect Your Metamask Wallet</button>
    </main>
  )
}
