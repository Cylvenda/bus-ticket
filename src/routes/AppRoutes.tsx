import LandingPage from '@/pages/LandingPage'
import { Route, Routes } from "react-router-dom";
import Schedule from "@/pages/Schedule.tsx";
import Layout from '@/components/layout/layout';
import Profile from '@/pages/users/Profile';
import History from '@/pages/users/History';
import Inbox from '@/pages/users/Inbox';
import Settings from '@/pages/users/Settings';
import Dashboard from '@/pages/users/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/schedule" element={<Schedule />} />

      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule" element={<Schedule />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes