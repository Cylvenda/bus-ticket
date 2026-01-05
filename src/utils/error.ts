import { AxiosError } from "axios"

/**
 * Safely extracts an error message from unknown or Axios errors.
 */
export const getErrorMessage = (err: unknown): string => {
     if (err instanceof AxiosError) {
          return err.response?.data?.detail ?? "Request failed"
     }
     if (err instanceof Error) {
          return err.message
     }
     return "Unknown error"
}
