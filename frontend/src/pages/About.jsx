import { useState } from "react";
import Navbar from "./Navbar";

export default function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Add your contact form submission logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const features = [
    {
      icon: "fa-plus",
      title: "Add Your Hisaab",
      description: "Create an expense quickly for any transaction with just a few clicks."
    },
    {
      icon: "fa-users",
      title: "Create Rooms",
      description: "Manage shared group expenses with friends, family, and roommates."
    },
    {
      icon: "fa-wallet",
      title: "Add Payment Apps",
      description: "Link UPI apps like GPay, PhonePe, or Paytm for seamless payments."
    },
    {
      icon: "fa-chart-line",
      title: "Track Expenses",
      description: "Filter, sort, and manage all your transaction history easily."
    },
    {
      icon: "fa-qrcode",
      title: "QR Code Scanning",
      description: "Scan receipts and QR codes to automatically add expenses."
    },
    {
      icon: "fa-shield-alt",
      title: "Secure & Private",
      description: "Your financial data is encrypted and completely secure."
    }
  ];

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

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-6">
            <i className="fa-solid fa-circle-info text-blue-600 text-4xl"></i>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            About KhaataPro
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Your modern companion for tracking expenses, managing finances, and staying organized
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        
        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              KhaataPro is a modern expense tracking tool designed for individuals, groups,
              and roommates. We believe managing money shouldn't be complicated.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our simple UI, fast performance, and UPI integration make it the easiest way to
              stay organized financially. Track shared expenses, split bills, and manage all
              payments in one place.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-md">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-4xl font-bold text-blue-600 mb-2">10K+</p>
                <p className="text-gray-500 text-sm">Active Users</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600 mb-2">50K+</p>
                <p className="text-gray-500 text-sm">Expenses Tracked</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600 mb-2">99.9%</p>
                <p className="text-gray-500 text-sm">Uptime</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600 mb-2">24/7</p>
                <p className="text-gray-500 text-sm">Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <i className="fa-solid fa-gears text-blue-600"></i>
              How It Works
            </h3>
            <p className="text-gray-600 text-lg">Everything you need to manage your expenses efficiently</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 hover:border-blue-200 rounded-xl p-6 transition duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 border border-blue-200 mb-4">
                  <i className={`fa-solid ${feature.icon} text-blue-600 text-xl`}></i>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-md">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                <i className="fa-solid fa-envelope text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Get In Touch</h3>
              <p className="text-gray-600">Have a question? We'd love to hear from you</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Your Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
              >
                <i className="fa-solid fa-paper-plane"></i>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="text-center mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-500 text-sm mb-2">Or reach us directly at:</p>
              <a href="mailto:support@khaatapro.com" className="text-blue-600 hover:text-blue-700 font-medium text-lg transition">
                support@khaatapro.com
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-10 mt-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-gray-600">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <i className="fas fa-wallet text-blue-600"></i> KhaataPro
            </h2>
            <p className="mt-3 text-gray-500">
              Smart, simple, and powerful expense tracking for everyone.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="hover:text-blue-600 transition">Dashboard</a></li>
              <li><a href="/create" className="hover:text-blue-600 transition">Add New Hisaab</a></li>
              <li><a href="/scanner" className="hover:text-blue-600 transition">Scan</a></li>
              <li><a href="/rooms" className="hover:text-blue-600 transition">My Rooms</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-3">Connect</h3>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-blue-600 transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-blue-600 transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-blue-600 transition"><i className="fab fa-github"></i></a>
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