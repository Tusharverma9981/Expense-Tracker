import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [hisaabs, setHisaabs] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileFab, setShowMobileFab] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortBy, setSortBy] = useState("date_desc");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/hisaabs")
      .then((res) => setHisaabs(res.data?.hisaabs || res.data))
      .catch(() => navigate("/login"));
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/login");
  };

  const filteredAndSortedHisaabs = () => {
    let filtered = [...hisaabs];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((h) =>
        h.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date
    if (dateFilter) {
      filtered = filtered.filter((h) => {
        const hisaabDate = new Date(h.date).toISOString().split("T")[0];
        return hisaabDate === dateFilter;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date_desc":
          return new Date(b.date) - new Date(a.date);
        case "date_asc":
          return new Date(a.date) - new Date(b.date);
        case "title_asc":
          return a.title.localeCompare(b.title);
        case "title_desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const list = filteredAndSortedHisaabs();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Background gradient - simplified for Paytm inspiration */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-[120px]" />
        <div className="absolute top-[260px] left-[10%] h-[320px] w-[520px] rounded-full bg-blue-100/20 blur-[120px]" />
        <div className="absolute bottom-0 right-[8%] h-[300px] w-[520px] rounded-full bg-blue-300/10 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4 flex justify-between items-center">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-blue-600">KhaataPro</h1>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="/dashboard"
              className="px-4 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition flex items-center gap-2"
            >
              <i className="fas fa-chart-line text-blue-500"></i>
              Dashboard
            </a>
            <a
              href="/about"
              className="px-4 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition flex items-center gap-2"
            >
              <i className="fa-solid fa-circle-info text-blue-500"></i>
              Info Center
            </a>

            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="ml-2 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 transition font-semibold flex items-center gap-2"
              >
                <i className="fa-solid fa-layer-group text-blue-400"></i>
                Tools
                <i className="fas fa-chevron-down text-xs text-gray-500"></i>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-3 w-56 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
                  <a
                    href="/scanner"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 transition"
                  >
                    <span className="w-9 h-9 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center">
                      <i className="fa-solid fa-qrcode text-blue-500"></i>
                    </span>
                    <div>
                      <p className="font-semibold">Scanner</p>
                      <p className="text-xs text-gray-500">Scan QR expenses</p>
                    </div>
                  </a>

                  <a
                    href="/payment"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 transition"
                  >
                    <span className="w-9 h-9 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center">
                      <i className="fa-solid fa-wallet text-purple-500"></i>
                    </span>
                    <div>
                      <p className="font-semibold">Payment Apps</p>
                      <p className="text-xs text-gray-500">UPI shortcut setup</p>
                    </div>
                  </a>

                  <a
                    href="/rooms"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 transition"
                  >
                    <span className="w-9 h-9 rounded-lg bg-cyan-100 border border-cyan-200 flex items-center justify-center">
                      <i className="fa-solid fa-users text-cyan-500"></i>
                    </span>
                    <div>
                      <p className="font-semibold">Rooms</p>
                      <p className="text-xs text-gray-500">Shared tracking</p>
                    </div>
                  </a>

                  <div className="h-px bg-gray-200" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
                  >
                    <span className="w-9 h-9 rounded-lg bg-red-100 border border-red-200 flex items-center justify-center">
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
            className="md:hidden w-11 h-11 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition flex items-center justify-center"
          >
            <i className="fas fa-bars text-lg text-blue-600"></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-6 py-5 space-y-2">
              <a
                href="/dashboard"
                className="block px-4 py-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition text-gray-700"
              >
                <i className="fas fa-chart-line mr-3 text-blue-500"></i> Dashboard
              </a>
              <a
                href="/about"
                className="block px-4 py-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition text-gray-700"
              >
                <i className="fa-solid fa-circle-info mr-3 text-blue-500"></i> Info Center
              </a>
              <a
                href="/rooms"
                className="block px-4 py-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition text-gray-700"
              >
                <i className="fa-solid fa-users mr-3 text-blue-500"></i> My Rooms
              </a>
              <a
                href="/payment"
                className="block px-4 py-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition text-gray-700"
              >
                <i className="fa-solid fa-wallet mr-3 text-blue-500"></i> Add Payment App
              </a>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 transition text-red-600 font-semibold"
              >
                <i className="fas fa-sign-out-alt mr-3"></i> Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <header className="max-w-7xl mx-auto px-6 pt-14 pb-10 md:pt-20">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-800">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <p className="text-sm font-medium">Track expenses. Lock sensitive ledgers. Stay in control.</p>
            </div>

            <h2 className="mt-5 text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Track money <span className="text-blue-500">like a pro</span>.
            </h2>

            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl">
              A smart Khata Book for personal + shared tracking. Search, sort, secure with passwords, and access anywhere.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="/create"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition shadow-lg shadow-blue-500/25"
              >
                <i className="fas fa-plus-circle"></i> Add New Hisaab
              </a>

              <button
                onClick={() => setShowFilter(!showFilter)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold bg-gray-100 hover:bg-gray-200 border border-gray-200 transition text-gray-900"
              >
                <i className="fas fa-filter text-blue-500"></i> Filter & Sort
              </button>
            </div>
          </div>

          {/* Right hero card */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <i className="fas fa-shield-alt text-blue-500"></i>
                Secure Ledger
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Password-protected hisaabs keep your sensitive records safe.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Total Hisaabs</p>
                  <p className="text-2xl font-bold mt-1">{hisaabs.length}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Locked</p>
                  <p className="text-2xl font-bold mt-1">
                    {hisaabs.filter((h) => h.encrypted).length}
                  </p>
                </div>
              </div>

              <div className="mt-5 text-xs text-gray-500">
                Tip: Use <span className="text-blue-500 font-semibold">Search + Sort</span> to find expenses instantly.
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      {showFilter && (
        <section className="max-w-7xl mx-auto px-6 pb-10">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <i className="fas fa-sliders-h text-blue-500"></i> Filters & Sorting
              </h3>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setDateFilter("");
                  setSortBy("date_desc");
                }}
                className="text-sm text-gray-600 hover:text-blue-600 bg-gray-100 hover:bg-gray-200 border border-gray-200 px-4 py-2 rounded-lg transition"
              >
                Reset Filters
              </button>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div className="relative">
                <i className="fas fa-calendar absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div className="relative">
                <i className="fas fa-sort absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="date_desc">Newest First</option>
                  <option value="date_asc">Oldest First</option>
                  <option value="title_asc">Title A-Z</option>
                  <option value="title_desc">Title Z-A</option>
                </select>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cards */}
      <main className="max-w-7xl mx-auto px-6 pb-14">
        {/* header row */}
        <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
          <div>
            <h3 className="text-2xl font-bold">Your Hisaabs</h3>
            <p className="text-gray-500 text-sm mt-1">
              Showing <span className="text-gray-900 font-semibold">{list.length}</span> records
            </p>
          </div>

          <a
            href="/create"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-semibold shadow-lg shadow-blue-500/25 text-white"
          >
            <i className="fas fa-plus"></i> Create Hisaab
          </a>
        </div>

        {list.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-lg mx-auto rounded-xl border border-gray-200 bg-white p-10 shadow-md">
              <div className="w-16 h-16 mx-auto rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-500">
                <i className="fas fa-inbox text-2xl"></i>
              </div>

              <h3 className="text-2xl font-bold mt-5">No Hisaabs Yet</h3>
              <p className="text-gray-600 mt-2">
                Start tracking expenses by creating your first hisaab.
              </p>

              <a
                href="/create"
                className="inline-flex items-center gap-2 mt-6 bg-blue-500 hover:bg-blue-600 text-white px-7 py-4 rounded-lg font-semibold transition shadow-lg shadow-blue-500/25"
              >
                <i className="fas fa-plus-circle"></i> Create First Hisaab
              </a>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((hisaab) => (
              <a
                key={hisaab._id}
                href={`/hisaab/${hisaab._id}`}
                className="group block"
              >
                <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* top */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-500 transition truncate">
                        {hisaab.title}
                      </h4>

                      <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                        <i className="fas fa-calendar-alt text-gray-400"></i>
                        {new Date(hisaab.date).toDateString()}
                      </p>
                    </div>

                    {hisaab.encrypted ? (
                      <div className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-100 border border-yellow-200 text-yellow-600 text-xs font-semibold">
                        <i className="fas fa-lock"></i> Locked
                      </div>
                    ) : (
                      <div className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 border border-green-200 text-green-600 text-xs font-semibold">
                        <i className="fas fa-unlock"></i> Open
                      </div>
                    )}
                  </div>

                  {/* label */}
                  <div className="mt-5">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 border border-blue-200 text-blue-800 text-sm font-semibold">
                      <i className="fas fa-tag text-xs text-blue-500"></i>
                      {hisaab.label}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10 text-gray-600">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <i className="fas fa-wallet text-white"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">KhaataPro</h2>
            </div>
            <p className="mt-3 text-gray-500">
              Smart, simple, and powerful expense tracking for everyone.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-500">
              <li>
                <a href="/dashboard" className="hover:text-blue-500 transition">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/create" className="hover:text-blue-500 transition">
                  Add New Hisaab
                </a>
              </li>
              <li>
                <a href="/scanner" className="hover:text-blue-500 transition">
                  Scanner
                </a>
              </li>
              <li>
                <a href="/rooms" className="hover:text-blue-500 transition">
                  My Rooms
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-bold mb-4">Connect</h3>
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

        <div className="border-t border-gray-200 py-5 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} KhaataPro — All Rights Reserved.
        </div>
      </footer>

      {/* Mobile FAB */}
      <div className="md:hidden fixed bottom-6 right-6 z-20">
        <button
          onClick={() => setShowMobileFab(!showMobileFab)}
          className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-2xl shadow-blue-500/30 transition flex items-center justify-center"
        >
          <i className="fas fa-bolt text-xl"></i>
        </button>

        {showMobileFab && (
          <div className="absolute bottom-16 right-0 w-56 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
            <a
              href="/scanner"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 transition font-semibold border-b border-gray-200"
            >
              <i className="fa-solid fa-qrcode mr-2 text-blue-500"></i> Scanner
            </a>
            <a
              href="/rooms"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 transition font-semibold border-b border-gray-200"
            >
              <i className="fa-solid fa-users mr-2 text-blue-500"></i> Rooms
            </a>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition font-semibold"
            >
              <i className="fas fa-sign-out-alt mr-2"></i> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}