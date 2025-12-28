import LandingPage from '@/pages/LandingPage'
import { Route, Routes } from "react-router-dom";
import Schedule from "@/pages/Schedule.tsx";
import UserRoutes from './UserRoutes';
import Layout from '@/components/layout/layout';
import AdminRoutes from './AdminRoutes';
import StaffRoutes from './StaffRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/schedule" element={<Schedule />} />


      <Route path="/dashboard/*" element={<Layout >
        <UserRoutes />
      </Layout>} />


      <Route path="/staff/*" element={<Layout >
        <StaffRoutes />
      </Layout>} />


      <Route path="/admin/*" element={<Layout >
        <AdminRoutes />
      </Layout>} />
    </Routes>
  )
}

export default AppRoutes