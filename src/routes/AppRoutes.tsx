import { Routes, Route } from "react-router-dom"
import LandingPage from '@/pages/LandingPage'
import Schedule from "@/pages/Schedule"
import UserLayout from '@/components/layout/user-layout'
import ProtectedRoute from './ProtectedRoutes'
import ActivateAccount from '@/pages/ActivateAcount'
import VerifyAccount from '@/pages/VerifyingAccount'
import AdminLayout from '@/components/layout/admin-layout'
import { RoleRoute } from './RoleRoute'
import Unauthorized from '@/pages/Unauthorized'
import BusCompanies from "@/pages/admin/BusCompanies/BusCompanies"
import Buses from "@/pages/admin/Buses/Buses"
import ScheduleManagement from "@/pages/admin/Schedule/ScheduleManagement"
import RoutesManagement from "@/pages/admin/Routes/RoutesManagement"
import SeatLayout from "@/pages/admin/SeatLayout/SeatLayout"
import Users from "@/pages/admin/Users/Users"
import Inbox from "@/pages/users/Inbox"
import Profile from "@/pages/users/Profile"
import Settings from "@/pages/Settings"
import Dashboard from "@/pages/users/Dashboard"
import AdminDashboard from "@/pages/admin/AdminDashboard"
import Bookings from "@/pages/admin/Bookings/Bookings"
import Payments from "@/pages/Payments"
import PaymentProcessGuard from "./payment-processes"
import Book from "@/pages/users/Book"
import UserRoutes from "@/pages/users/Routes"
import PaymentMethods from "@/pages/users/PaymentMethods"
import HelpCenter from "@/pages/users/HelpCenter"
import Analytics from "@/pages/admin/Analytics"
import History from "@/pages/users/History"


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/activate-account" element={<ActivateAccount />} />
      <Route path="/account-activation/:uid/:token" element={<VerifyAccount />} />


      <Route element={<PaymentProcessGuard />} >
        <Route path="payments-process" element={<Payments />} />
      </Route>


      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        {/* Admin routes */}
        <Route element={<RoleRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bus-companies" element={<BusCompanies />} />
            <Route path="buses" element={<Buses />} />
            <Route path="schedule" element={<ScheduleManagement />} />
            <Route path="routes" element={<RoutesManagement />} />
            <Route path="seat-layout" element={<SeatLayout />} />
            <Route path="users" element={<Users />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* User routes */}
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book" element={<Book />} />
          <Route path="/routes" element={<UserRoutes />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/payment" element={<PaymentMethods />} />
          <Route path="/help" element={<HelpCenter />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
