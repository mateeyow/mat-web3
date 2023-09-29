'use client'
import type { AppType } from "next/app";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast'
import Button from "@/components/button";
import { trpc } from "../utils/trpc";

const Home: AppType = () => {
  const [address, setAddress] = useState<string>()
  const login = trpc.contract.login.useMutation()
  const checkIn = trpc.contract.checkIn.useMutation()
  const { data, refetch } = trpc.contract.getUser.useQuery({ address }, { enabled: Boolean(address) })
  
  const balance = data?.balance ?? 0.00

  const onCheckIn = async () => {
    if (!address?.length) {
      return null
    }

    checkIn.mutate({ address })
    await refetch()
  }

  const onMetamaskConnect = async () => {
    if (address?.length) {
      return null
    }

    if (typeof window.ethereum === 'undefined') {
      return null
    }

    try {
      const accounts = await window.ethereum.request<string[]>({ method: 'eth_requestAccounts' })
      if (accounts?.length && accounts[0]) {
        setAddress(accounts[0])
        login.mutate({ address: accounts[0] })
      }
    } catch (err) {
      console.error('Something went wrong:', err)
    }
  }

  const toastify = () => {
    toast('my toast')
  }

  return (
    <main>
      <Toaster />
      <Button onClick={toastify}>Toastify</Button>
      <div className="grid grid-cols-4 grid-rows-content h-screen">
        <div className='col-span-3 col-start-2 p-4'>
          <div className='flex'>
            <Button className="ms-auto" onClick={() => void onMetamaskConnect()}>
              {address?.length ? 'Connected' : 'Connect Metamask Wallet'}
            </Button>
          </div>
        </div>
        <div className='col-span-4 flex flex-col justify-center items-center gap-y-12'>
          <h1 className='text-5xl'>${balance}</h1>
          <Button onClick={() => address?.length ? void onCheckIn() : void onMetamaskConnect()}>
            {address?.length ? 'Check In' : 'Please Connect Your Metamask Wallet'}
          </Button>
        </div>
      </div>
    </main>
  )
}

export default trpc.withTRPC(Home)
