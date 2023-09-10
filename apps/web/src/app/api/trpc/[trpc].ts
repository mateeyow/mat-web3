import * as trpcNext from '@trpc/server/adapters/next'
// TODO: Make eslint and monorepo work together
// import { appRouter } from '@/server/routers/_app'
import { appRouter } from '../../../server/routers/_app'

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})
