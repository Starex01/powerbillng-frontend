import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function MeterInput() {
  const [meterNumber, setMeterNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!meterNumber) {
      alert("Please enter a meter number");
      return;
    }

    if (!/^\d{11}$/.test(meterNumber)) {
      alert("Please enter a valid 11-digit meter number");
      return;
    }

    setLoading(true);

    // Smooth transition before navigation
    setTimeout(() => {
      navigate(`/receipt/${meterNumber}`);
    }, 1500);
  };

  return (
    <div className="relative max-w-xl mx-auto mt-10">

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl z-50"
          >
            <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-blue-900 font-semibold text-lg">
              Generating Receipt...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ opacity: loading ? 0.4 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <input
          type="text"
          placeholder="Enter Meter Number e.g (12345678910)"
          value={meterNumber}
          onChange={(e) => setMeterNumber(e.target.value)}
          className="w-full border-2 border-blue-200 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-blue-900"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-blue-900 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-800 transition disabled:opacity-50"
        >
          Generate Receipt
        </button>
      </motion.div>
    </div>
  );
}
