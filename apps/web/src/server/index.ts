import { z } from 'zod'
import { procedure, router } from './trpc'
import contract from './contract'

export const appRouter = router({
  login: procedure.input(
    z.object({
      address: z.string()
    })
  ).mutation(async (opts) => {
    try {
      console.log('creating user', opts.input.address)
      await contract.createUser(opts.input.address)
      console.log('success!')
    } catch (err) {
      console.error(`Error creating user`, err)
    }

    return {
      success: true
    }
  }),
  checkIn: procedure.input(
    z.object({
      address: z.string()
    })
  ).mutation(async (opts) => {
    console.log('checked in')
    await contract.checkIn(opts.input.address)

    const [user, balance] = await contract.getUser(opts.input.address)

    return {
      user,
      balance
    }
  })
})

export type AppRouter = typeof appRouter
