import { ThemeProvider } from "./context/theme-provider"
import AppRoutes from "./routes/AppRoutes"
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" >
      <ToastContainer theme="colored" />
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App