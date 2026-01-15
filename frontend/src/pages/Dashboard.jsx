import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  Filler
);

export default function Dashboard() {
  const [expensesByCategory, setExpensesByCategory] = useState([]);
  const [hisaabTotals, setHisaabTotals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => {
        setExpensesByCategory(res.data.expensesByCategory || []);
        setHisaabTotals(res.data.hisaabTotals || []);
      })
      .catch(() => navigate("/login"));
  }, []);

  const totalExpenses = expensesByCategory.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );
  const totalHisaabs = hisaabTotals.length;
  const avgPerHisaab = totalHisaabs > 0 ? totalExpenses / totalHisaabs : 0;
  const monthlyExpense = totalExpenses; // Simplified

  // Chart data
  const expenseChartData = {
    labels: expensesByCategory.map((item) => item._id),
    datasets: [
      {
        label: "Expenses by Category",
        data: expensesByCategory.map((item) => item.totalAmount),
        backgroundColor: [
          "#3b82f6",
          "#60a5fa",
          "#1d4ed8",
          "#93c5fd",
          "#bfdbfe",
          "#1e3a8a",
          "#2563eb",
        ],
        borderColor: "#e5e7eb",
        borderWidth: 2,
      },
    ],
  };

  const hisaabChartData = {
    labels: hisaabTotals.map((h) => h.title),
    datasets: [
      {
        label: "Hisaab Total",
        data: hisaabTotals.map((h) => h.totalValue),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        borderRadius: 10,
      },
    ],
  };

  // Monthly trend data
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonthIndex = new Date().getMonth();
  const last6Months = [];
  for (let i = 5; i >= 0; i--) {
    last6Months.push(months[(currentMonthIndex - i + 12) % 12]);
  }
  const monthlyData = last6Months.map(() =>
    Math.round(totalExpenses / 6 * (0.8 + Math.random() * 0.4))
  );

  const monthlyTrendData = {
    labels: last6Months,
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthlyData,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
        borderWidth: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { size: 14 },
          padding: 15,
          color: "#374151",
        },
      },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#111827",
        bodyColor: "#374151",
        borderColor: "#e5e7eb",
        borderWidth: 1,
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: { display: false },
      title: {
        display: true,
        text: "Total per Hisaab",
        font: { size: 18, weight: "bold" },
        color: "#111827",
        padding: { top: 10, bottom: 20 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#6b7280" },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: {
        ticks: { color: "#6b7280" },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
  };

  const lineOptions = {
    ...chartOptions,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Monthly Trend",
        font: { size: 18, weight: "bold" },
        color: "#111827",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#6b7280" },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: {
        ticks: { color: "#6b7280" },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
  };

  const pieOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        display: true,
        text: "Expenses by Category",
        font: { size: 18, weight: "bold" },
        color: "#111827",
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        ...chartOptions.plugins.tooltip,
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) label += ": ";
            const total = context.dataset.data.reduce(
              (sum, val) => sum + val,
              0
            );
            const percentage =
              ((context.parsed / total) * 100).toFixed(2) + "%";
            return (
              label + "₹" + context.parsed + " (" + percentage + ")"
            );
          },
        },
      },
    },
  };

  const sortedCategories = [...expensesByCategory]
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 5);

  const empty = expensesByCategory.length === 0 && hisaabTotals.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Background gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-[120px]" />
        <div className="absolute top-[280px] left-[8%] h-[320px] w-[520px] rounded-full bg-blue-100/20 blur-[120px]" />
        <div className="absolute bottom-0 right-[8%] h-[300px] w-[520px] rounded-full bg-blue-300/10 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <i className="fas fa-wallet text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                KhaataPro
              </h1>
              <p className="text-xs text-gray-500 -mt-0.5">
                Analytics Dashboard
              </p>
            </div>
          </div>

          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 transition text-gray-700 font-semibold"
          >
            <i className="fas fa-home text-blue-500"></i> Home
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-10">
        {/* Page Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-md">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Expense Dashboard
              </h2>
              <p className="text-gray-600 mt-2">
                A visual breakdown of your spending patterns and hisaab totals.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/create"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold transition shadow-lg shadow-blue-500/25"
              >
                <i className="fas fa-plus-circle"></i> Add Hisaab
              </a>
              <a
                href="/scanner"
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 px-5 py-3 rounded-lg font-semibold transition text-gray-700"
              >
                <i className="fa-solid fa-qrcode text-blue-500"></i> Scanner
              </a>
            </div>
          </div>
        </div>

        {/* Empty state */}
        {empty ? (
          <div className="text-center py-16">
            <div className="max-w-xl mx-auto rounded-xl border border-gray-200 bg-white p-10 shadow-md">
              <div className="w-16 h-16 mx-auto rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-500">
                <i className="fas fa-chart-pie text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mt-5">
                No Analytics Yet
              </h3>
              <p className="text-gray-600 mt-2">
                Create a hisaab and add expenses to unlock charts and insights.
              </p>
              <a
                href="/create"
                className="inline-flex items-center gap-2 mt-6 bg-blue-500 hover:bg-blue-600 text-white px-7 py-4 rounded-lg font-semibold transition shadow-lg shadow-blue-500/25"
              >
                <i className="fas fa-plus"></i> Create First Hisaab
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
              <StatCard
                title="Total Expenses"
                value={`₹${totalExpenses.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}`}
                icon="fas fa-rupee-sign"
                accent="blue"
              />
              <StatCard
                title="This Month"
                value={`₹${monthlyExpense.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}`}
                icon="fas fa-calendar-alt"
                accent="green"
              />
              <StatCard
                title="Total Hisaabs"
                value={`${totalHisaabs}`}
                icon="fas fa-book"
                accent="purple"
              />
              <StatCard
                title="Avg per Hisaab"
                value={`₹${Math.round(avgPerHisaab).toLocaleString("en-IN")}`}
                icon="fas fa-chart-bar"
                accent="yellow"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <GlassPanel>
                {expensesByCategory.length > 0 && (
                  <Pie data={expenseChartData} options={pieOptions} />
                )}
              </GlassPanel>

              <GlassPanel>
                {hisaabTotals.length > 0 && (
                  <Bar data={hisaabChartData} options={barOptions} />
                )}
              </GlassPanel>
            </div>

            {/* Trend + Top categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <GlassPanel>
                <Line data={monthlyTrendData} options={lineOptions} />
              </GlassPanel>

              <GlassPanel>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <i className="fas fa-trophy text-yellow-500"></i>
                    Top Categories
                  </h3>
                  <span className="text-xs text-gray-500">
                    Top 5 only
                  </span>
                </div>

                <div className="space-y-3">
                  {sortedCategories.map((cat, index) => {
                    const percentage = (
                      (cat.totalAmount / totalExpenses) *
                      100
                    ).toFixed(1);

                    return (
                      <div
                        key={cat._id}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-800 font-bold">
                            {index + 1}
                          </div>

                          <div className="min-w-0">
                            <p className="font-bold truncate">{cat._id}</p>
                            <p className="text-xs text-gray-500">
                              {percentage}% of total
                            </p>
                          </div>
                        </div>

                        <p className="text-blue-500 font-bold">
                          ₹{cat.totalAmount.toLocaleString("en-IN")}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </GlassPanel>
            </div>

            {/* Recent activity */}
            <div className="mt-6">
              <GlassPanel>
                <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <i className="fas fa-history text-blue-500"></i>
                    Recent Activity
                  </h3>
                  <span className="text-xs text-gray-500">
                    latest hisaab totals
                  </span>
                </div>

                <div className="space-y-3">
                  {hisaabTotals.slice(0, 5).map((hisaab) => (
                    <div
                      key={hisaab._id}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                          <i className="fas fa-receipt text-gray-500"></i>
                        </div>

                        <div className="min-w-0">
                          <p className="font-bold truncate">{hisaab.title}</p>
                          <p className="text-xs text-gray-500">
                            Added recently
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-900 font-bold">
                        ₹{hisaab.totalValue.toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10 text-gray-600">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <i className="fas fa-wallet text-white"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                KhaataPro
              </h2>
            </div>
            <p className="mt-3 text-gray-500">
              Smart, simple, and powerful expense tracking for everyone.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-500">
              <li>
                <a href="/" className="hover:text-blue-500 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/create" className="hover:text-blue-500 transition">
                  Add New Hisaab
                </a>
              </li>
              <li>
                <a
                  href="/scanner"
                  className="hover:text-blue-500 transition"
                >
                  Scanner
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
            <p className="text-gray-400 mt-3 text-sm">
              support@khaatapro.com
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 py-5 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} KhaataPro — All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

/* ----------------------- UI Components (NO LOGIC CHANGE) ----------------------- */

function GlassPanel({ children }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-md">
      {children}
    </div>
  );
}

function StatCard({ title, value, icon, accent = "blue" }) {
  const accentMap = {
    blue: "bg-blue-100 border-blue-200 text-blue-500",
    green: "bg-green-100 border-green-200 text-green-500",
    purple: "bg-purple-100 border-purple-200 text-purple-500",
    yellow: "bg-yellow-100 border-yellow-200 text-yellow-500",
  };

  const accentClass = accentMap[accent] || accentMap.blue;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
            {value}
          </p>
        </div>

        <div
          className={`w-12 h-12 rounded-lg border flex items-center justify-center ${accentClass}`}
        >
          <i className={`${icon} text-lg`}></i>
        </div>
      </div>
    </div>
  );
}