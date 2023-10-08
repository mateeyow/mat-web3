"use client";
import type { AppType } from "next/app";
import React from "react";
import { Toaster } from "react-hot-toast";
import type { TRPCClientErrorBase } from "@trpc/client";
import type { DefaultErrorShape } from "@trpc/server";
import { format } from "date-fns";
import Button from "@/components/button";
import { PlayIcon, PauseIcon } from "@/components/icons";
import { toast } from "@/components/toast";
import { trpc } from "../utils/trpc";
import neon from "./audio/neon.mp3";

const onError = (error: TRPCClientErrorBase<DefaultErrorShape>) => {
  toast(error.message);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(num);
};

const Home: AppType = () => {
  const iconClassName = "fill-white h-20 cursor-pointer";
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [address, setAddress] = React.useState<string>();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const {
    mutate: loginMutation,
    isLoading: isLoginLoading,
    isSuccess,
  } = trpc.contract.login.useMutation({
    onSuccess: () => {
      toast("Login successful!");
    },
    onError,
  });
  const {
    data,
    refetch,
    isFetching: isGetUserFetching,
  } = trpc.contract.getUser.useQuery(
    { address: address ?? "" },
    {
      enabled: Boolean(address) && isSuccess,
      onError,
    },
  );
  const { mutate: checkInMutation, isLoading: isCheckInLoading } =
    trpc.contract.checkIn.useMutation({
      onError,
      onSuccess: async () => {
        toast("Check-in successful!");
        await refetch();
      },
    });

  const balance = data?.balance ?? 0.0;

  const onCheckIn = () => {
    if (!address?.length) {
      return null;
    }

    checkInMutation({ address });
  };

  const onPlayStop = () => {
    if (!audioRef.current) {
      return null;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      void audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const onMetamaskConnect = async () => {
    if (address?.length) {
      return null;
    }

    if (typeof window.ethereum === "undefined") {
      return null;
    }

    if (!isPlaying) {
      onPlayStop();
    }

    try {
      const accounts = await window.ethereum.request<string[]>({
        method: "eth_requestAccounts",
      });
      if (accounts?.length && accounts[0]) {
        setAddress(accounts[0]);
        loginMutation({ address: accounts[0] });
      }
    } catch (err) {
      console.error("Something went wrong:", err);
    }
  };

  React.useEffect(() => {
    const audio = new Audio(neon);
    audio.loop = true;

    audioRef.current = audio;
  }, []);

  return (
    <main>
      <Toaster position="top-left" />
      <div className="grid grid-cols-4 grid-rows-content h-screen">
        <div className="p-1">
          {isPlaying ? (
            <PauseIcon className={iconClassName} onClick={onPlayStop} />
          ) : (
            <PlayIcon className={iconClassName} onClick={onPlayStop} />
          )}
        </div>
        <div className="col-span-3 col-start-2 p-4">
          <div className="flex">
            <Button
              className="ms-auto"
              isLoading={isLoginLoading}
              onClick={() => void onMetamaskConnect()}
            >
              {address?.length ? "Connected" : "Connect Metamask Wallet"}
            </Button>
          </div>
        </div>
        <div className="col-span-4 flex flex-col justify-center items-center gap-y-12">
          <h1 className="text-5xl">
            {!data && isGetUserFetching ? "Loading..." : formatNumber(balance)}
          </h1>
          <Button
            isLoading={isLoginLoading || isCheckInLoading}
            onClick={() =>
              address?.length ? void onCheckIn() : void onMetamaskConnect()
            }
          >
            {address?.length
              ? "Check In"
              : "Please Connect Your Metamask Wallet"}
          </Button>
          {data ? (
            <p className="text-xs">
              Last check-in:{" "}
              {format(new Date(data.lastCheckIn), "MMM dd, yyyy HH:mm")}
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default trpc.withTRPC(Home);
