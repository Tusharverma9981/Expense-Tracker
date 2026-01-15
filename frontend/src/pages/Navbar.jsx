import React from 'react'
import { useState } from 'react';

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
     const handleLogout = () => {
    // Add your logout logic here
    navigate("/login");
  };
  return (
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4 flex justify-between items-center">
          {/* Brand */}
          <div className="flex items-center gap-3">
          
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">KhaataPro</h1>
            
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="/dashboard"
              className="px-4 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 transition flex items-center gap-2"
            >
              <i className="fas fa-chart-line text-indigo-400"></i>
              Dashboard
            </a>
            <a
              href="/about"
              className="px-4 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 transition flex items-center gap-2"
            >
              <i className="fa-solid fa-circle-info text-indigo-400"></i>
              Info Center
            </a>

            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="ml-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition font-semibold flex items-center gap-2"
              >
                <i className="fa-solid fa-layer-group text-indigo-300"></i>
                Tools
                <i className="fas fa-chevron-down text-xs text-zinc-300"></i>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-[#0B0F1D]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <a
                    href="/scanner"
                    className="flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-white/5 transition"
                  >
                    <span className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
                      <i className="fa-solid fa-qrcode text-indigo-300"></i>
                    </span>
                    <div>
                      <p className="font-semibold">Scanner</p>
                      <p className="text-xs text-zinc-400">Scan QR expenses</p>
                    </div>
                  </a>

                  <a
                    href="/payment"
                    className="flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-white/5 transition"
                  >
                    <span className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center">
                      <i className="fa-solid fa-wallet text-purple-300"></i>
                    </span>
                    <div>
                      <p className="font-semibold">Payment Apps</p>
                      <p className="text-xs text-zinc-400">UPI shortcut setup</p>
                    </div>
                  </a>

                  <a
                    href="/rooms"
                    className="flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-white/5 transition"
                  >
                    <span className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center">
                      <i className="fa-solid fa-users text-cyan-300"></i>
                    </span>
                    <div>
                      <p className="font-semibold">Rooms</p>
                      <p className="text-xs text-zinc-400">Shared tracking</p>
                    </div>
                  </a>

                  <div className="h-px bg-white/10" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500/10 transition"
                  >
                    <span className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <i className="fas fa-sign-out-alt"></i>
                    </span>
                    <span className="font-semibold">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden w-11 h-11 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition flex items-center justify-center"
          >
            <i className="fas fa-bars text-lg"></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="px-6 py-5 space-y-2">
              <a
                href="/dashboard"
                className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition text-zinc-200"
              >
                <i className="fas fa-chart-line mr-3 text-indigo-300"></i> Dashboard
              </a>
              <a
                href="/about"
                className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition text-zinc-200"
              >
                <i className="fa-solid fa-circle-info mr-3 text-indigo-300"></i> Info Center
              </a>
              <a
                href="/rooms"
                className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition text-zinc-200"
              >
                <i className="fa-solid fa-users mr-3 text-indigo-300"></i> My Rooms
              </a>
              <a
                href="/payment"
                className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition text-zinc-200"
              >
                <i className="fa-solid fa-wallet mr-3 text-indigo-300"></i> Add Payment App
              </a>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 transition text-red-300 font-semibold"
              >
                <i className="fas fa-sign-out-alt mr-3"></i> Logout
              </button>
            </div>
          </div>
        )}
      </nav>
  )
}

export default Navbar