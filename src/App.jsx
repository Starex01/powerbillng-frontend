import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Receipt from "./pages/Receipt";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/receipt/:meterNumber" element={<Receipt />} />
      </Routes>
    </BrowserRouter>
  );
}
