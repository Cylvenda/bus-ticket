import { authUserService } from "@/api/services/auth.service"
import type { PassengerFinalInfo, PassengerInfo } from "@/types/user"
import type { AxiosError } from "axios"
import { create } from "zustand"
import type { TicketDataTypes } from "./passenger.type"

type PassengerDetail = {
     loading: boolean
     passengerInfo: PassengerInfo | null


     setPassenger: (passenger: PassengerInfo) => void
     clearPassenger: () => void
     updatePassenger: (data: Partial<PassengerInfo>) => void
     UserBookingCreate: (payload: PassengerInfo) => Promise<TicketDataTypes | null>
}

export const usePassengerStore = create<PassengerDetail>((set) => ({
     loading: false,
     passengerInfo: null,

     setPassenger: (passenger) =>
          set({
               passengerInfo: passenger,
          }),

     clearPassenger: () =>
          set({
               passengerInfo: null,
          }),

     updatePassenger: (data) =>
          set((state) => ({
               passengerInfo: state.passengerInfo
                    ? { ...state.passengerInfo, ...data }
                    : null,
          })),

     UserBookingCreate: async (payload: PassengerInfo): Promise<TicketDataTypes | null> => {
          try {
               set({ loading: true })

               const newPayload: PassengerFinalInfo = {
                    schedule_id: payload.schedule_id,
                    bus_assignment_id: payload.bus_id,
                    seat_number: payload.seatNumber,
                    passenger: {
                         first_name: payload.firstName,
                         last_name: payload.lastName,
                         email: payload.email,
                         id_type: payload.idType,
                         id_number: payload.idNumber,
                         phone: payload.phone,
                         age_group: payload.ageGroup,
                         nationality: payload.country,
                         boarding_point: payload.startJournal,
                         dropping_point: payload.endJournal,
                         phone_payment_number: payload.phonePaymentNumber,
                         gender: payload.gender
                    }
               }

               const response = await authUserService.bookingCreate(newPayload)

               set({ loading: false })

               return response.data
          } catch (error) {
               const err = error as AxiosError
               console.error(
                    "Booking failed:",
                    err.response?.data || err.message
               )

               set({ loading: false })
               return null
          }
     },
}))
