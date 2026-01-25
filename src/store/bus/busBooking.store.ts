import { create } from "zustand"
import type { PassengerInfo } from "@/types/bus"
import { BusBookingService } from "@/api/services/busBooking.service"
import type { Route, Schedule, ScheduleSearchPayload, Seat, Bus, GetBookedSeatsPayload, HoldSeatPayload, HoldSeatResult } from "./bus.types"
import { toast } from "react-toastify"
import { useNotificationStore } from "../notifications/notification.store"
import { getErrorMessage } from "@/utils/error"

type BusState = {
     routes: Route[]
     schedules: Schedule[] | null
     selectedSchedule: ScheduleSearchPayload | null
     bookedSeats: HoldSeatResult | null

     loading: boolean
     error: string | null

     // Active bus
     activeBus: Bus | null
     isSeatsOpen: boolean

     // Seat selection 
     selectedSeat: string | null


     // Passenger forms
     passengerData: PassengerInfo[]
     showForms: boolean
     activeSchedule: Schedule | null


     fetchRoutes: () => Promise<void>
     fetchSchedules: () => Promise<void>
     setSelectedSchedule: (scheduleSelected: ScheduleSearchPayload) => void
     setShowForms: (show: boolean) => void
     addPassengerData: (data: PassengerInfo) => void
     updatePassengerData: (seatNumber: string, data: PassengerInfo) => void
     removePassengerData: (seatNumber: string) => void
     clearPassengerData: () => void
     fetchBookedSeats: () => void
     setActiveBus: (bus: Bus | null) => void
     toggleSeatSelection: (seat: string) => void
     clearSeatSelection: () => void
     setAvailableSeats: (seats: Seat[]) => void
     openSeats: (bus: Bus) => void
     closeSeats: () => void
     setActiveSchedule: (schedule: Schedule | null) => void

     
     // Seat helpers
     isSeatSelected: (seatNumber: string) => boolean
     toggleUserSeatSelection: (seat: string) => void

     // reseting
     reset: () => void

}

export const useBusBookingStore = create<BusState>((set, get) => ({
     routes: [] ,
     schedules: null,
     selectedSchedule: null,
     loading: false,
     error: null,
     activeBus: null,
     isSeatsOpen: false,
     selectedSeat: null,
     passengerData: [],
     showForms: false,
     activeSchedule: null,
     bookedSeats: null,
     bookings: [],

     fetchRoutes: async () => {
          const { routes, loading } = get()

          if (routes.length > 0 || loading) return

          set({ loading: true, error: null })
          try {
               const result = await BusBookingService.getRoutes()
               set({ routes: result.data, loading: false })
          } catch (err: unknown) {
               set({
                    error: getErrorMessage(err),
                    loading: false,
               })
          }
     },

     fetchSchedules: async () => {
          set({ loading: true, error: null })

          const payload = get().selectedSchedule

          if (!payload?.origin) {
               set({ loading: false })
               return
          }

          if (!payload.destination) {
               set({ loading: false })
               return
          }

          if (!payload.date) {
               set({ loading: false })
               return
          }

          try {
               const result = await BusBookingService.getSchedules(payload)
               set({ schedules: result.data, loading: false })
          } catch (err: unknown) {
               set({
                    error: getErrorMessage(err),
                    loading: false,
               })
          }
     },


     setSelectedSchedule: (scheduleSelected) => set({ selectedSchedule: scheduleSelected }),

     // fetching seats booked and holds
     fetchBookedSeats: async () => {
          set({ loading: true, error: null })

          const payload: GetBookedSeatsPayload = {
               schedule_id: Number(get().activeSchedule?.id),
               bus_assignment_id: Number(get().activeBus?.id),
          }

          try {
               const result = await BusBookingService.getBookedSeats(payload)

               // result.data is now a single HoldSeatResult object
               set({ bookedSeats: result.data, loading: false })
          } catch (err: unknown) {
               set({
                    error: getErrorMessage(err),
                    loading: false,
               })
          }
     },


     // setting active schedule (User selected)
     setActiveSchedule: (schedule) => set({ activeSchedule: schedule }),

     setActiveBus: (bus) => set({
          activeBus: bus,
          isSeatsOpen: true,
          selectedSeat: null,
          passengerData: [],
          showForms: false,
     }),

     openSeats: (bus) =>

          get().activeBus?.id === bus.id ? set({ isSeatsOpen: true }) :

               set({
                    activeBus: bus,
                    isSeatsOpen: true,
                    selectedSeat: null,
                    passengerData: [],
                    showForms: false,
               }),

     closeSeats: () =>
          set({
               activeBus: null,
               isSeatsOpen: false,
               selectedSeat: null,
               passengerData: [],
               showForms: false,
          }),

     setAvailableSeats: (seats) => set({ availableSeats: seats }),

     // Passenger
     setShowForms: (show) => set({ showForms: show }),

     // Seat helpers
     isSeatSelected: (seatNumber) =>
          get().selectedSeat === seatNumber,

     // Seat selection instances
     toggleSeatSelection: async (seat) => {
          set({ loading: true, error: null })

          const payload: HoldSeatPayload = {
               schedule_id: Number(get().activeSchedule?.id),
               bus_assignment_id: Number(get().activeBus?.id),
               seat_number: seat,
          }

          try {
               const result = await BusBookingService.holdSeats(payload)
               const message = "Seat " + payload.seat_number + " held successfully."

               useNotificationStore
                    .getState()
                    .addNotification({
                         id: crypto.randomUUID(),
                         type: "HOLD_SEAT",
                         message: message,
                         created_at: new Date(),
                         read: false,
                         payload: result.data, // HoldSeatResult
                    })
               toast.success(message)
               set({ loading: false })


          } catch (err: unknown) {
               set({
                    error: getErrorMessage(err),
                    loading: false,
               })
          }

     },

     toggleUserSeatSelection: (seat: string) =>
          set((state) => ({
               selectedSeat: state.selectedSeat === seat ? null : seat,
               passengerData: [],
          })),


     clearSeatSelection: () =>
          set({
               selectedSeat: null,
               passengerData: [],
          }),


     addPassengerData: (data) =>
          set((state) => ({
               passengerData: [...state.passengerData, data],
          })),

     updatePassengerData: (seatNumber, data) =>
          set((state) => {
               const index = state.passengerData.findIndex(
                    (p) => p.seatNumber === seatNumber
               )

               if (index >= 0) {
                    const updated = [...state.passengerData]
                    updated[index] = data
                    return { passengerData: updated }
               }

               return { passengerData: [...state.passengerData, data] }
          }),

     removePassengerData: (seatNumber) =>
          set((state) => ({
               passengerData: state.passengerData.filter(
                    (p) => p.seatNumber !== seatNumber
               ),
          })),

     clearPassengerData: () => set({ passengerData: [] }),

     reset: () => set({
          selectedSchedule: null,
          schedules: null,
          activeBus: null,
          activeSchedule: null,
          isSeatsOpen: false,
          passengerData: [],
          error: null
     }),
}))
