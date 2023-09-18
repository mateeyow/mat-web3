'use client'
import type { AppType } from "next/app";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import Button from "@/components/button";

const Home: AppType = () => {
  const [address, setAddress] = useState<string>()
  const login = trpc.login.useMutation()
  const checkIn = trpc.checkIn.useMutation()
  const onCheckIn = () => {
    if (!address?.length) {
      return null
    }

    login.mutate({ address })
  }

  const onMetamaskConnect = async () => {
    if (typeof window.ethereum === 'undefined') {
      return null
    }

    try {
      const accounts = await window.ethereum.request<string[]>({ method: 'eth_requestAccounts' })
      if (accounts?.length && accounts[0]) {
        setAddress(accounts[0])
        checkIn.mutate({ address: accounts[0] })
      }
    } catch (err) {
      console.error('Something went wrong:', err)
    }
  }

  return (
    <main>
      <h1>My Awesome Token</h1>
      {/* {hello.data.message} */}
      <Button onClick={onMetamaskConnect}>{
        address?.length ? 'Connected' : 'Connect Metamask Wallet'
      }</Button>
      <div>
        <Button isDisabled={!address?.length} onClick={onCheckIn}>
          {address?.length ? 'Check In' : 'Please Connect Your Metamask Wallet'}
        </Button>
      </div>
    </main>
  )
}

export default trpc.withTRPC(Home)
