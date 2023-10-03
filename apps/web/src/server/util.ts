export const asyncResult = async <T>(fn: () => Promise<T>) => {
  try {
    const result = await fn();
    return [result, null] as const;
  } catch (error) {
    return [null, error] as const;
  }
};

export const convertToDate = (timestamp: bigint) => {
  console.log("timestamp", timestamp);
  return new Date(Number(timestamp) * 1000);
};
