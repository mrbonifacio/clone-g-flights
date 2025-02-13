import { ThemeProvider } from "@/components/theme-provider"
import Routes from "./routes/routes"

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Routes />
    </ThemeProvider>
  )
}

