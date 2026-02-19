import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import MeterInput from "../components/MeterInput";
import { BsLightningCharge } from "react-icons/bs";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      <div className="text-center pt-20 px-4">
        <div className="flex items-center justify-center mb-6 gap-3">
          <BsLightningCharge className="w-12 h-12 text-white bg-blue-900 rounded-xl" />
        </div>
        <h1 className="text-5xl font-bold text-blue-900">
          Utility Bill Receipt Generator
        </h1>

        <p className="mt-6 text-lg text-blue-700">
          Enter your meter number to generate your electricity bill receipt
        </p>

        <MeterInput />
      </div>
      <Footer />
      
    </div>
  );
}

