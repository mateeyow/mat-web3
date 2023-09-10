'use client'
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import Login from "./components/login";

const Home: AppType = () => {
  const hello = trpc.test.useQuery({ name: "world" })
  if (!hello.data) {
    return <div>Loading...</div>
  }

  return (
    <main>
      <h1>My Awesome Token</h1>
      <Login />
    </main>
  )
}

export default trpc.withTRPC(Home)
