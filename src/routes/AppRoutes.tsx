import LandingPage from '@/pages/LandingPage'
import {Route, Routes} from "react-router-dom";
import Schedule from "@/pages/Schedule.tsx";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
  )
}

export default AppRoutes