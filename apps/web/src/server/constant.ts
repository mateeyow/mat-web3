export const CONTRACT_ERROR_MESSAGES = {
  USER_NOT_FOUND: "User does not exist",
  USER_ALREADY_EXISTS: "User already exists",
  USER_ALREADY_CHECKED_IN: "User has already checked in today",
} as const;

export type CONTRACT_ERROR_MESSAGE =
  (typeof CONTRACT_ERROR_MESSAGES)[keyof typeof CONTRACT_ERROR_MESSAGES];
