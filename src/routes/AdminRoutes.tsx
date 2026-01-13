import Dashboard from "@/pages/Dashboard"
import History from "@/pages/History"
import Inbox from "@/pages/Inbox"
import Profile from "@/pages/Profile"
import Schedule from "@/pages/users/Schedule"
import Settings from "@/pages/Settings"
import { Route, Routes } from "react-router-dom"

const AdminRoutes = () => {
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

export default AdminRoutes