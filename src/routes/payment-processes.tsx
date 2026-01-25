import { usePassengerStore } from "@/store/passenger/passenger.store"
import { Navigate, Outlet } from "react-router-dom"

const PaymentProcessGuard = () => {
     const passengerInfo = usePassengerStore((s) => s.passengerInfo)

     if (!passengerInfo) {
          return <Navigate to="/schedule" replace />
     }

     return <Outlet />
}

export default PaymentProcessGuard
