import { ThemeProvider } from "./context/theme-provider"
import AppRoutes from "./routes/AppRoutes"
import { ToastContainer } from 'react-toastify';
import Snowfall from 'react-snowfall'

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" >
      <Snowfall
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
        }} />
      <ToastContainer theme="colored" />
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App