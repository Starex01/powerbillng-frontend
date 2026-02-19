import { Link } from "react-router-dom";
import { BsLightningCharge } from "react-icons/bs";

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white px-8 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          <BsLightningCharge className="inline-block w-6 h-6 mr-2" />
          PowerBillNG
        </Link>

        <div className="space-x-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </div>
      </div>
    </nav>


 
  );
}
