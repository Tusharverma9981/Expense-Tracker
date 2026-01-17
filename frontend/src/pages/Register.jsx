import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        username,
        email,
        password,
      });

      toast.success("Registered successful ✅");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-white pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-zinc-200 border border-zinc-200 rounded-xl p-8 space-y-8 shadow-xl">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-black tracking-tight">Create Account</h2>
            <p className="text-black text-sm">
              Enter your information to get started
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                Username
              </label>
              <input
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
              />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                Email
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
              />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-white transform transition duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

        

          <p className="text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}