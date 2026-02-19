import { useRef, useState } from "react";
import { BsLightningCharge } from "react-icons/bs";
import { TiArrowLeft } from "react-icons/ti";
import { MdOutlineFileDownload } from "react-icons/md";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ReceiptCard({ receipt }) {
  const receiptRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [pdfError, setPdfError] = useState("");

  const handleDownload = async () => {
    try {
      setDownloading(true);
      setPdfError("");

      if (!receiptRef.current) {
        throw new Error("Receipt element not found.");
      }

      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      const safeMeter = receipt.meterNumber.replace(/\s/g, "");
      const safeReceipt = receipt.receiptNumber.replace(/\s/g, "");

      pdf.save(`PowerBillNG-${safeMeter}-${safeReceipt}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      setPdfError("Failed to generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Action bar */}
      <div className="flex items-center justify-between mb-6 print:hidden gap-3 flex-wrap">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-900 text-white rounded-xl text-sm font-semibold"
        >
          <TiArrowLeft className="w-4 h-4" />
          Generate Another
        </button>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="px-4 py-2.5 bg-blue-900 text-white rounded-xl text-sm font-semibold disabled:opacity-50"
        >
          <MdOutlineFileDownload className="w-4 h-4 inline mr-2" />
          {downloading ? "Generating..." : "Download PDF"}
        </button>
      </div>

      {pdfError && (
        <div className="mb-4 text-center text-red-600 text-sm font-semibold">
          {pdfError}
        </div>
      )}

      {/* Receipt Card */}
      <div
        ref={receiptRef}
        className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-blue-900"
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-blue-900 text-white p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
              <BsLightningCharge className="w-7 h-7 text-blue-900" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                Electricity Bill Receipt
              </h2>
              <p className="text-sm mt-1">
                {receipt.disco?.name} ({receipt.disco?.shortName})
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold">Receipt No.</p>
            <p className="font-mono font-bold text-lg">
              {receipt.receiptNumber}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-4 text-blue-900">
          <div className="text-center font-semibold">
            CUSTOMER INFORMATION
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Meter Number</span>
            <span className="font-mono">{receipt.meterNumber}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Customer Name</span>
            <span>{receipt.customerName}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Service Address</span>
            <span className="text-right">
              {receipt.serviceAddress}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Account Number</span>
            <span>{receipt.accountNumber}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Tariff Class</span>
            <span>{receipt.tariffClass}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Meter Type</span>
            <span>{receipt.meterType}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Date of Issue</span>
            <span>
              {new Date(receipt.dateOfIssue).toLocaleDateString("en-NG")}
            </span>
          </div>

          {/* DISCO Section */}
          <div className="mt-6 flex justify-between bg-blue-50 p-4 rounded-xl border border-blue-200 text-sm">
            <div>
              <p className="font-semibold items-center">Phone</p>
              <p>{receipt.disco?.phone}</p>
            </div>

            <div>
              <p className="font-semibold">Email</p>
              <p>{receipt.disco?.email}</p>
            </div>

            <div>
              <p className="font-semibold">Website</p>
              <p>{receipt.disco?.website}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-blue-900 text-white text-center p-4 text-sm">
          This receipt is computer generated and does not require signature.
        </div>
      </div>
    </div>
  );
}
