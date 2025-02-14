import { ThemeProvider } from "@/components/theme-provider";
import Routes from "./routes/routes";

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="relative min-h-screen">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-white-mode dark:bg-dark-mode bg-cover bg-no-repeat bg-center" />
        <div className="relative pt-[200px]">
          <Routes />
        </div>
      </div>
    </ThemeProvider>
  );
}
