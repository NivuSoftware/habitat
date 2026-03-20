import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import SmoothScroll from "./components/SmoothScroll";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Solutions from "./pages/Solutions.tsx";
import Careers from "./pages/Careers.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <>
    <Toaster />
    <BrowserRouter>
      <SmoothScroll />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quienes-somos" element={<About />} />
        <Route path="/soluciones" element={<Solutions />} />
        <Route path="/trabaje-con-nosotros" element={<Careers />} />
        <Route path="/contactenos" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
