import { useBusBookingStore } from "@/store/useBusBookingStore"
import { useEffect } from "react"
import data from "./tanzania-buses.json"
import { seatLayout } from "./seat-data"


const useMockData = () => {

    const setAvailableBuses = useBusBookingStore(
        (state) => state.setAvailableBuses
    )

    const setSeatLayout = useBusBookingStore(
        (state) => state.setSeatLayout
    )

    useEffect(() => {

        setAvailableBuses(data)
        setSeatLayout(seatLayout)

    }, [setAvailableBuses, setSeatLayout])

}

export default useMockData

