'use client'
import type { AppType } from "next/app";
import { useState } from "react";
import { Toaster } from 'react-hot-toast'
import type { TRPCClientErrorBase } from "@trpc/client";
import type { DefaultErrorShape } from "@trpc/server";
import { format } from 'date-fns'
import Button from "@/components/button";
import { toast } from '@/components/toast'
import { trpc } from "../utils/trpc";

const onError = (error: TRPCClientErrorBase<DefaultErrorShape>) => {
  toast(error.message)
}

const Home: AppType = () => {
  const [address, setAddress] = useState<string>()
  const { mutate: loginMutation, isLoading: isLoginLoading } = trpc.contract.login.useMutation({
    onError
  })
  const { mutate: checkInMutation, isLoading: isCheckInLoading } = trpc.contract.checkIn.useMutation({
    onError
  })
  const { data, refetch } = trpc.contract.getUser.useQuery({ address }, {
    enabled: Boolean(address) && !isCheckInLoading,
    onError,
  })
  
  const balance = data?.balance ?? 0.00

  const onCheckIn = async () => {
    if (!address?.length) {
      return null
    }

    checkInMutation({ address })
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
        loginMutation({ address: accounts[0] })
      }
    } catch (err) {
      console.error('Something went wrong:', err)
    }
  }

  return (
    <main>
      <Toaster position='top-left' />
      <div className="grid grid-cols-4 grid-rows-content h-screen">
        <div className='col-span-3 col-start-2 p-4'>
          <div className='flex'>
            <Button className="ms-auto" isLoading={isLoginLoading} onClick={() => void onMetamaskConnect()}>
              {address?.length ? 'Connected' : 'Connect Metamask Wallet'}
            </Button>
          </div>
        </div>
        <div className='col-span-4 flex flex-col justify-center items-center gap-y-12'>
          <h1 className='text-5xl'>${balance}</h1>
          <Button isLoading={isLoginLoading || isCheckInLoading} onClick={() => address?.length ? void onCheckIn() : void onMetamaskConnect()}>
            {address?.length ? 'Check In' : 'Please Connect Your Metamask Wallet'}
          </Button>
          {data ? <p className='text-xs'>Last check-in: {format(new Date(data.lastCheckIn), 'MMM dd, yyyy HH:mm')}</p> : null}
        </div>
      </div>
    </main>
  )
}

export default trpc.withTRPC(Home)
