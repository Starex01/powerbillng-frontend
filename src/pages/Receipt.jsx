import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReceiptCard from "../components/ReceiptCard";
import axios from "../api/axios";
import { DISCO_MAP } from "../data/discoMap";
import { MOCK_METERS } from "../data/mockMeters";

export default function Receipt() {
  const { meterNumber } = useParams();
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    generateReceipt();
  }, [meterNumber]);

  const generateReceipt = () => {
    setError("");

    // Validate meter exists
    const customer = MOCK_METERS[meterNumber];

    if (!customer) {
      setError("Meter number not found in system.");
     
      return;
    }

    // Detect DISCO using first 2 digits
    const discoCode = meterNumber.substring(0, 2);
    const disco = DISCO_MAP[discoCode];

    if (!disco) {
      setError("DISCO not recognized.");
      return;
    }

    // Build receipt object
    const receiptData = {
      receiptNumber: `PBNG-${Date.now()}`,
      meterNumber,
      dateOfIssue: new Date(),
      ...customer,
      disco,
    };

    setReceipt(receiptData);
  };

 

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-blue-900">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-10">
        {receipt && <ReceiptCard receipt={receipt} />}
      </div>
      <Footer />
    </div>

  );
}
