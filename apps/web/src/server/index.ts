import { z } from 'zod'
import { procedure, router } from './trpc'

export const appRouter = router({
  test: procedure.input(
    z.object({
      name: z.string(),
    }),
  ).query(opts => ({
    message: `Hello ${opts.input.name}`,
  })),
})

export type AppRouter = typeof appRouter
