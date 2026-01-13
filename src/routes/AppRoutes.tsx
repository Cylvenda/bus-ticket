import LandingPage from '@/pages/LandingPage'
import { Route, Routes } from "react-router-dom";
import Schedule from "@/pages/Schedule.tsx";
import Layout from '@/components/layout/layout';
import Profile from '@/pages/Profile';
import History from '@/pages/History';
import Inbox from '@/pages/Inbox';
import Settings from '@/pages/Settings';
import Dashboard from '@/pages/Dashboard';
import { ProtectedRoute } from './ProtectedRoutes';
import ActivateAccount from '@/pages/ActivateAcount';
import VerifyAccount from '@/pages/VerifyingAccount';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path='/activate-account' element={<ActivateAccount />} />
      <Route path='/account-activation/:uid/:token' element={<VerifyAccount />} />

      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/schedule" element={<Schedule />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes