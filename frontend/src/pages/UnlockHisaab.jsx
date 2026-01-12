import { useState } from "react";
import api from "../services/api";
import Hisab1 from "./Hisab1";

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
     <Hisab1 hisaab={hisaab} />
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>🔒 Hisaab Locked</h2>

      <form onSubmit={unlock}>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading}>
          {loading ? "Unlocking..." : "Unlock"}
        </button>
      </form>
    </div>
  );
}
