import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { procedure, router } from '../trpc.server'
import { asyncResult } from '../util'

interface BigNumber {
  gte: (other: BigNumber) => boolean;
  toString: () => string;
}

interface EthersError {
  code?: string | number;
  message: string;
  error?: NestedEthersError;
  transaction?: {
    gasLimit: BigNumber;
    nonce: number;
  };
  receipt?: {
    gasUsed: BigNumber;
  };
  action?: string;
  reason?: string;
}

interface NestedEthersError {
  code?: string | number;
  message?: string;
  data?: {
    message?: string;
  };
  error?: {
    error?: {
      code?: string | number;
    };
    body?: string;
  };
}

const login = procedure.input(
  z.object({
    address: z.string()
  })
).mutation(async ({ input, ctx }) => {
  const [returnedUser] = await asyncResult(() => ctx.mat.getUser(input.address))
  
  if (returnedUser) {
    console.debug('User found', returnedUser)
    return {
      success: true
    }
  }

  const [_, createError] = await asyncResult(() => ctx.mat.createUser(input.address))
  if (createError) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Error creating a new user',
      cause: createError,
    })
  }

  console.debug('Successfully created a new user')
  return {
    success: true
  }
})

const checkIn = procedure.input(
  z.object({
    address: z.string()
  })
).mutation(async ({ input, ctx }) => {
  console.debug(`Checking in ${input.address}`)
  const [_, error] = await asyncResult(() => ctx.mat.checkIn(input.address))
  if (error) {
    console.error('Error checking in:', error)
    const ethersError = error as EthersError

    if (ethersError.reason?.includes('already checked in')) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'User has already checked in today',
      })
    }
    
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Error checking in',
      cause: error,
    })
  }

  const [result, getUserErr] = await asyncResult(() => ctx.mat.getUser(input.address))
  if (getUserErr) {
    console.error('Error getting user:', getUserErr)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Error getting user',
      cause: getUserErr,
    })
  }

  if (!result) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'User not found',
    })
  }

  const [user, balance] = result

  return {
    lastCheckIn: new Date(Number(user.lastCheckIn) * 1000),
    balance: Number(balance)
  }
})

export const contractRouter = router({
  login,
  checkIn
})
