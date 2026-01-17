import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import UnlockHisaab from "./UnlockHisaab";
import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function ViewHisaab() {
  const [hisaab, setHisaab] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/hisaabs/${id}`)
      .then((res) => {
        setHisaab(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load hisaab");
        navigate("/");
      });
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this Hisaab?")) {
      return;
    }

    try {
      await api.delete(`/hisaabs/${id}`);
     toast.success("Hisaab deleted successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to delete hisaab");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hisaab...</p>
        </div>
      </div>
    );
  }

  if (!hisaab) {
    return null;
  }

  const total = hisaab.content.reduce((sum, item) => sum + parseFloat(item.value || 0), 0);

  const chartData = {
    labels: hisaab.content.map(item => item.key),
    datasets: [{
      data: hisaab.content.map(item => parseFloat(item.value)),
      backgroundColor: [
        '#3b82f6',
        '#60a5fa',
        '#2563eb',
        '#93c5fd',
        '#dbeafe',
        '#1e40af',
        '#1d4ed8'
      ],
      borderColor: '#ffffff',
      borderWidth: 3
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#4b5563',
          font: {
            size: 13,
            family: "'Inter', sans-serif"
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: 'Expense Breakdown',
        color: '#111827',
        font: {
          size: 18,
          weight: '600',
          family: "'Inter', sans-serif"
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#111827',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
            const value = context.parsed;
            const percentage = ((value / total) * 100).toFixed(2) + '%';
            return label + '₹ ' + value + ' (' + percentage + ')';
          }
        }
      }
    }
  };

  if (hisaab.encrypted) {
    return <UnlockHisaab id={id} />;
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-wallet text-white text-sm"></i>
              </div>
              <span className="text-xl font-bold text-gray-900">KhaataPro</span>
            </div>
            <div className="flex items-center gap-4">
              <a className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" href="/">
                <i className="fas fa-home mr-2"></i>Home
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{hisaab.title}</h1>
                {hisaab.encrypted && (
                  <i className="fas fa-lock text-amber-500 text-lg"></i>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <i className="fas fa-calendar-alt"></i>
                  {new Date(hisaab.date).toDateString()}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
                  {hisaab.label}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/hisaab/${hisaab._id}/edit`)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <i className="fas fa-edit"></i>
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
              >
                <i className="fas fa-trash"></i>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Expense List - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Expense Details</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {hisaab.content.map((item, index) => (
                  <div key={index} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                    <span className="text-gray-900 font-medium">{item.key}</span>
                    <span className="text-gray-600 font-semibold">₹ {item.value}</span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 border-t-2 border-gray-300 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-600">₹ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart - Takes 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Expense Analytics</h2>
                <p className="text-sm text-gray-600">Distribution of expenses by item</p>
              </div>
              <div className="flex items-center justify-center">
                <Pie data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
            Back to Home
          </button>
          <button
            onClick={() => navigate(`/hisaab/${hisaab._id}/edit`)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            <i className="fas fa-edit"></i>
            Edit Hisaab
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-wallet text-white text-sm"></i>
                </div>
                <span className="text-lg font-bold text-gray-900">KhaataPro</span>
              </div>
              <p className="text-sm text-gray-600">
                Smart, simple, and powerful expense tracking.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Product</h3>
              <ul className="space-y-2">
                <li><a href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Dashboard</a></li>
                <li><a href="/create" className="text-sm text-gray-600 hover:text-gray-900">Add Hisaab</a></li>
                <li><a href="/scanner" className="text-sm text-gray-600 hover:text-gray-900">Scan</a></li>
                <li><a href="/rooms" className="text-sm text-gray-600 hover:text-gray-900">My Rooms</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Resources</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-sm text-gray-600 hover:text-gray-900">Info Center</a></li>
                <li><a href="/payment" className="text-sm text-gray-600 hover:text-gray-900">Payment Apps</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <i className="fab fa-github text-xl"></i>
                </a>
              </div>
              <p className="text-sm text-gray-600 mt-4">support@khaatapro.com</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} KhaataPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}