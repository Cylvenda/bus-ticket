import Dashboard from "@/pages/users/Dashboard"
import History from "@/pages/users/History"
import Inbox from "@/pages/users/Inbox"
import Profile from "@/pages/users/Profile"
import Schedule from "@/pages/users/Schedule"
import Settings from "@/pages/users/Settings"
import { Route, Routes } from "react-router-dom"

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/history" element={<History />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/schedule" element={<Schedule />} />
    </Routes>
  )
}

export default UserRoutes