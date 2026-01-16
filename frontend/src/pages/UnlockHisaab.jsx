import { useState } from "react";
import api from "../services/api";
import Hisab1 from "./Hisab1";
import ViewHisaab from "./ViewHisab";

export default function UnlockHisaab({ id }) {
  const [password, setPassword] = useState("");
  const [hisaab, setHisaab] = useState(null);
  const [loading, setLoading] = useState(false);

  const unlock = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post(`/hisaabs/${id}/unlock`, { password });
      setHisaab(res.data);
    } catch (err) {
      alert(err?.response?.data?.message || "Wrong password");
    } finally {
      setLoading(false);
    }
  };

  // ✅ after unlock show full page
  if (hisaab) {
    return (
     <ViewHisaab hisaab={hisaab} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4 bg-white border border-gray-200 rounded-xl p-8 shadow-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <i className="fas fa-lock text-blue-500 text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Hisaab Locked</h2>
          <p className="text-gray-600 mt-2">Enter password to unlock</p>
        </div>

        <form onSubmit={unlock} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold transition shadow-lg shadow-blue-500/25 disabled:opacity-50"
          >
            {loading ? "Unlocking..." : "Unlock"}
          </button>
        </form>
      </div>
    </div>
  );
}