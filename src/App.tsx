
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Learn from "./pages/Learn";
import Fantasy from "./pages/Fantasy";
import QA from "./pages/QA";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import Withdraw from "./pages/Withdraw";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import ContestDetail from "./pages/ContestDetail";
import QuestionDetail from "./pages/QuestionDetail";
import ExpertProfile from "./pages/ExpertProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/module/:moduleId" element={<Learn />} />
          <Route path="/fantasy" element={<Fantasy />} />
          <Route path="/fantasy/contest/:contestId" element={<ContestDetail />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/qa/question/:questionId" element={<QuestionDetail />} />
          <Route path="/qa/expert/:expertId" element={<ExpertProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet/withdraw" element={<Withdraw />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
