export const asyncResult = async <T>(fn: () => Promise<T>) => {
  try {
    const result = await fn()
    return [result, null] as const
  } catch (error) {
    return [null, error] as const
  }
}
