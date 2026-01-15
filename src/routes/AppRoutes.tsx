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
import BusCompanies from "@/pages/admin/BusCompanies"
import Buses from "@/pages/admin/Buses"
import ScheduleManagement from "@/pages/admin/ScheduleManagement"
import RouteStop from "@/pages/admin/RouteStop"
import RoutesManagement from "@/pages/admin/RoutesManagement"
import SeatLayout from "@/pages/admin/SeatLayout"
import Users from "@/pages/admin/Users"
import Inbox from "@/pages/Inbox"
import Profile from "@/pages/Profile"
import Settings from "@/pages/Settings"
import Dashboard from "@/pages/Dashboard"
import AdminDashboard from "@/pages/admin/AdminDashboard"

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/activate-account" element={<ActivateAccount />} />
      <Route path="/account-activation/:uid/:token" element={<VerifyAccount />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        {/* Admin routes */}
        <Route element={<RoleRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="bus-companies" element={<BusCompanies />} />
            <Route path="buses" element={<Buses />} />
            <Route path="schedule-management" element={<ScheduleManagement />} />
            <Route path="routes" element={<RoutesManagement />} />
            <Route path="route-stop" element={<RouteStop />} />
            <Route path="seat-layout" element={<SeatLayout />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>

        {/* User routes */}
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/schedule" element={<Schedule />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
