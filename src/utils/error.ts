import { AxiosError } from "axios"
import { toast } from "react-toastify"

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

export const handleRegisterError = (error: any) => {
     if (error?.response?.data) {
          const errors = error.response.data

          Object.values(errors).forEach((messages: any) => {
               if (Array.isArray(messages)) {
                    messages.forEach((msg) => toast.error(msg))
               }
          })
     } else {
          toast.error("Registration failed. Please try again.")
     }
}
