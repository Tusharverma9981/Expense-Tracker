import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

export default function CreateHisaab() {
  const [formData, setFormData] = useState({
    title: "",
    label: "",
    encrypted: false,
    password: ""
  });
  const [content, setContent] = useState([{ key: "", value: "" }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleContentChange = (index, field, value) => {
    const newContent = [...content];
    newContent[index][field] = value;
    setContent(newContent);
  };

  const addContentItem = () => {
    setContent([...content, { key: "", value: "" }]);
  };

  const removeContentItem = (index) => {
    if (content.length > 1) {
      setContent(content.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.label) {
      toast.error("Title and Label are required");
      return;
    }

    if (formData.encrypted && !formData.password) {
     toast.error("Password is required for encrypted hisaab");
      return;
    }

    const validContent = content.filter(item => item.key && item.value);
    if (validContent.length === 0) {
      toast.error("Please add at least one expense item");
      return;
    }

    try {
      setLoading(true);
      await api.post("/hisaabs", {
        title: formData.title,
        label: formData.label,
        content: validContent,
        encrypted: formData.encrypted,
        password: formData.encrypted ? formData.password : undefined
      });

     toast.success("Hisaab created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create hisaab");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = content.reduce((sum, item) => {
    const value = parseFloat(item.value) || 0;
    return sum + value;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <i className="fas fa-wallet text-white text-lg"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">KhaataPro</h1>
          </div>
          <div className="flex items-center gap-4">
            <a className="text-gray-600 hover:text-blue-600 font-medium transition" href="/">
              <i className="fas fa-home mr-2"></i>
              <span className="hidden sm:inline">Home</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <i className="fas fa-plus-circle text-blue-600 text-3xl"></i>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Create New Hisaab
          </h2>
          <p className="text-gray-600 text-lg">
            Track your expenses with detailed records
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Basic Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <i className="fas fa-info-circle text-blue-600"></i>
                Basic Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Grocery Shopping"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="label"
                    value={formData.label}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Bills">Bills</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Encryption Option */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="encrypted"
                    checked={formData.encrypted}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <span className="text-gray-900 font-medium flex items-center gap-2">
                      <i className="fas fa-lock text-yellow-600"></i>
                      Enable Password Protection
                    </span>
                    <p className="text-xs text-gray-600 mt-1">
                      Keep this hisaab private and secure with a password
                    </p>
                  </div>
                </label>

                {formData.encrypted && (
                  <div className="mt-4">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      required={formData.encrypted}
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Expense Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="fas fa-receipt text-blue-600"></i>
                  Expense Items
                </h3>
                <button
                  type="button"
                  onClick={addContentItem}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition text-sm shadow-lg shadow-blue-500/25"
                >
                  <i className="fas fa-plus"></i>
                  Add Item
                </button>
              </div>

              <div className="space-y-3">
                {content.map((item, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 grid md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Item name"
                          value={item.key}
                          onChange={(e) => handleContentChange(index, "key", e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                          <input
                            type="number"
                            placeholder="0.00"
                            value={item.value}
                            onChange={(e) => handleContentChange(index, "value", e.target.value)}
                            step="0.01"
                            min="0"
                            className="w-full pl-8 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          />
                        </div>
                      </div>
                      {content.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeContentItem(index)}
                          className="p-2.5 text-red-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Amount */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Creating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check"></i>
                    Create Hisaab
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-10 mt-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-gray-600">
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

          <div>
            <h3 className="text-gray-900 font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="hover:text-blue-500 transition">Dashboard</a></li>
              <li><a href="/create" className="hover:text-blue-500 transition">Add New Hisaab</a></li>
              <li><a href="/scanner" className="hover:text-blue-500 transition">Scan</a></li>
              <li><a href="/rooms" className="hover:text-blue-500 transition">My Rooms</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-3">Connect</h3>
            <div className="flex gap-4 text-xl text-gray-500">
              <a href="#" className="hover:text-blue-500 transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-blue-500 transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-blue-500 transition"><i className="fab fa-github"></i></a>
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