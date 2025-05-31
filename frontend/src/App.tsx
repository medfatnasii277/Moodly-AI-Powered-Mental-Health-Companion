
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Meditation from "./pages/Meditation";
import Games from "./pages/Games";
import NotFound from "./pages/NotFound";
import HowILook from "./pages/HowILook";
import LearnPage from './pages/LearnPage';
import ParentsGuidePage from "./pages/ParentsGuidePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/games" element={<Games />} />
          <Route path="/how-i-look" element={<HowILook />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/parents-guide" element={<ParentsGuidePage />} />
        
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
