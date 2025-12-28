import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import type {
    Bus,
    SelectedSeat,
    PassengerInfo,
    Seat,
    SeatLayout,
    PassengerRoute,
} from "@/types/bus"

interface BusBookingState {
    availableBuses: Bus[]
    seatLayout: SeatLayout[]

    // Active bus
    activeBus: Bus | null
    isSeatsOpen: boolean

    // Seat selection (SINGLE SEAT)
    selectedSeat: SelectedSeat | null
    availableSeats: Seat[]

    // Passenger forms
    passengerData: PassengerInfo[]
    showForms: boolean

    // Passenger route
    passengerRoute: PassengerRoute | null
    filteredBuses: Bus[]

    // Actions
    setAvailableBuses: (bus: Bus[]) => void
    setSeatLayout: (layout: SeatLayout[]) => void
    setActiveBus: (bus: Bus | null) => void
    setSelectedRoute: (route: PassengerRoute) => void

    openSeats: (bus: Bus) => void
    closeSeats: () => void

    // Seat helpers
    isSeatSelected: (seatNumber: string) => boolean
    getSeatStatus: (
        seatNumber: string,
        defaultStatus: Seat["status"]
    ) => Seat["status"]

    toggleSeatSelection: (seatNumber: string, seatPrice: number) => void
    clearSeatSelection: () => void
    setAvailableSeats: (seats: Seat[]) => void

    // Passenger
    setShowForms: (show: boolean) => void
    addPassengerData: (data: PassengerInfo) => void
    updatePassengerData: (seatNumber: string, data: PassengerInfo) => void
    removePassengerData: (seatNumber: string) => void
    clearPassengerData: () => void

    // Utils
    getTotalPrice: () => number
    resetBooking: () => void
}

export const useBusBookingStore = create<BusBookingState>()(
    devtools(
        persist(
            (set, get) => ({
                // Initial state
                availableBuses: [],
                filteredBuses: [],
                passengerRoute: null,
                seatLayout: [],
                activeBus: null,
                isSeatsOpen: false,
                selectedSeat: null,
                availableSeats: [],
                passengerData: [],
                showForms: false,

                // Setters
                setAvailableBuses: (bus) => set({ availableBuses: bus }),
                setSeatLayout: (layout) => set({ seatLayout: layout }),
                setActiveBus: (bus) => set({ activeBus: bus }),

                setSelectedRoute: (route) => {
                    const { availableBuses } = get()

                    const filtered = availableBuses.filter(
                        (bus) =>
                            bus.from === route.selectedRouteFrom &&
                            bus.to === route.selectedRouteTo &&
                            bus.startDate === route.selecteDate
                    )

                    set({
                        passengerRoute: route,
                        filteredBuses: filtered,
                    })
                },

                openSeats: (bus) =>
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

                // Seat helpers
                isSeatSelected: (seatNumber) =>
                    get().selectedSeat?.seatNumber === seatNumber,

                getSeatStatus: (seatNumber, defaultStatus) => {
                    if (defaultStatus === "booked") return "booked"
                    return get().selectedSeat?.seatNumber === seatNumber
                        ? "selected"
                        : "available"
                },

                toggleSeatSelection: (seatNumber, seatPrice) =>
                    set((state) => {
                        if (state.selectedSeat?.seatNumber === seatNumber) {
                            return {
                                selectedSeat: null,
                                passengerData: [],
                            }
                        }

                        return {
                            selectedSeat: { seatNumber, seatPrice },
                            passengerData: [],
                        }
                    }),

                clearSeatSelection: () =>
                    set({
                        selectedSeat: null,
                        passengerData: [],
                    }),

                setAvailableSeats: (seats) => set({ availableSeats: seats }),

                // Passenger
                setShowForms: (show) => set({ showForms: show }),

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

                // Utils
                getTotalPrice: () => get().selectedSeat?.seatPrice ?? 0,

                resetBooking: () =>
                    set({
                        activeBus: null,
                        passengerRoute: null,
                        filteredBuses: [],
                        isSeatsOpen: false,
                        selectedSeat: null,
                        availableSeats: [],
                        passengerData: [],
                        showForms: false,
                    }),
            }),
            {
                name: "bus-booking-storage",
                partialize: (state) => ({
                    passengerData: state.passengerData,
                    selectedSeat: state.selectedSeat,
                }),
            }
        )
    )
)
