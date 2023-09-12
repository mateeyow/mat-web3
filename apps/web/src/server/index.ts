import { z } from 'zod'
import { procedure, router } from './trpc'
import { getUser } from './mat-token'

export const appRouter = router({
  test: procedure.input(
    z.object({
      name: z.string(),
    }),
  ).query((opts) => {
    void getUser()

    return {
      hello: `Hello ${opts.input.name}`,
    }
  }),
})

export type AppRouter = typeof appRouter
