export type InlineError<T> = [string | null, T | null];

export const success = <T>(data: T): InlineError<T> => [null, data];
export const error = <T>(errorMessage: string): InlineError<T> => [errorMessage, null];
