import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/login", { email, password });
      toast.success("Login successful ✅");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      
      <div className="absolute inset-0  pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-zinc-200 border border-zinc-200 rounded-xl p-8 space-y-8 shadow-xl">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-black tracking-tight">Sign In</h2>
            <p className="text-black text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-black">
                  Password
                </label>
                
              </div>
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
              className="w-full bg-black text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-white transform transition duration-150 active:scale-[0.98]"
            >
              Continue
            </button>
          </form>

         

        

          <p className="text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <a href="/register" className="text-cyan-400 hover:text-cyan-300 font-medium transition">
              Sign up
            </a>
          </p>
        </div>
      
    </div>
    </div>
  );
}