import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { procedure, router } from '../trpc.server'
import { asyncResult, convertToDate } from '../util'
import { CONTRACT_ERROR_MESSAGES } from '../constant';

interface BigNumber {
  gte: (_: BigNumber) => boolean;
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

const getUser = procedure.input(
  z.object({
    address: z.string()
  })
).query(async ({ input, ctx }) => {
  console.log('called?')
  const [result, error] = await asyncResult(() => ctx.mat.getUser(input.address))
  console.log('result', result);

  if (error) {
    console.error('Error getting user:', error)
    const ethError = error as EthersError

    if (ethError.reason?.includes(CONTRACT_ERROR_MESSAGES.USER_NOT_FOUND)) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      })
    }

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Error getting user',
      cause: error,
    })
  }

  if (!result) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'User not found',
    })
  }

  return {
    lastCheckIn: convertToDate(result[0] as unknown as bigint),
    balance: Number(result.balance)
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

    if (ethersError.reason?.includes(CONTRACT_ERROR_MESSAGES.USER_ALREADY_CHECKED_IN)) {
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
    lastCheckIn: convertToDate(user.lastCheckIn),
    balance: Number(balance)
  }
})

export const contractRouter = router({
  login,
  checkIn,
  getUser,
})
