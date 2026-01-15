import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function PaymentApp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    appName: "Google Pay",
    upiId: "",
    nickname: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.upiId.trim()) {
      alert("UPI ID is required");
      return;
    }

    try {
      // ✅ Backend API should be: POST /api/payment-app/add
      await api.post("/payment-app/add", form);

      alert("Payment app added ✅");
      navigate("/"); // or navigate("/dashboard")
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to add payment app");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <i className="fas fa-wallet text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                KhaataPro
              </h1>
              <p className="text-xs text-gray-500 -mt-0.5">
                Payment App
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 transition text-gray-700 font-semibold"
          >
            <i className="fas fa-home text-blue-500"></i> Home
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-xl mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add Payment App</h1>
          <p className="text-gray-600">
            Connect your UPI app for faster transactions.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Select App */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Select UPI App
              </label>
              <div className="relative">
                <i className="fas fa-wallet text-gray-500 absolute left-3 top-3"></i>

                <select
                  value={form.appName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, appName: e.target.value }))
                  }
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Google Pay">Google Pay</option>
                  <option value="PhonePe">PhonePe</option>
                  <option value="Paytm">Paytm</option>
                  <option value="BHIM">BHIM UPI</option>
                  <option value="Amazon Pay">Amazon Pay</option>
                </select>
              </div>
            </div>

            {/* UPI ID */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                UPI ID
              </label>
              <div className="relative">
                <i className="fas fa-id-card text-gray-500 absolute left-3 top-3"></i>

                <input
                  type="text"
                  placeholder="yourname@upi"
                  required
                  value={form.upiId}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, upiId: e.target.value }))
                  }
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Nickname */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Nickname (optional)
              </label>
              <input
                type="text"
                placeholder="E.g. My GPay"
                value={form.nickname}
                onChange={(e) =>
                  setForm((p) => ({ ...p, nickname: e.target.value }))
                }
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold transition duration-200 shadow-lg hover:shadow-blue-600/20"
            >
              <i className="fas fa-plus"></i> Add Payment App
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-10 mt-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-gray-600">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <i className="fas fa-wallet text-white"></i>
              </div>
              KhaataPro
            </h2>
            <p className="mt-3 text-gray-500">
              Smart, simple, and powerful expense tracking for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="hover:text-blue-500 transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-blue-500 transition">
                  Add New Hisaab
                </Link>
              </li>
              <li>
                <Link to="/scanner" className="hover:text-blue-500 transition">
                  Scan
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-blue-500 transition">
                  My Rooms
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3">Connect</h3>
            <div className="flex gap-4 text-xl text-gray-500">
              <a href="#" className="hover:text-blue-500 transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <i className="fab fa-github"></i>
              </a>
            </div>
            <p className="text-gray-400 mt-3 text-sm">support@khaatapro.com</p>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-4 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} KhaataPro — All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}