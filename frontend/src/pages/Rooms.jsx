import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function RoomPage() {
  const [activeTab, setActiveTab] = useState("create"); // create | myRooms | allRooms

  const [form, setForm] = useState({
    name: "",
    description: "",
    password: "",
  });

  const [allRooms, setAllRooms] = useState([]);
  const [myRooms, setMyRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);

  const [search, setSearch] = useState("");

  const filteredAllRooms = useMemo(() => {
    if (!search.trim()) return allRooms;
    return allRooms.filter((r) =>
      r?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [allRooms, search]);

  const fetchRooms = async () => {
    try {
      setLoadingRooms(true);
      const res = await api.get("/rooms");
      setAllRooms(res.data.allRooms || []);
      setMyRooms(res.data.myRooms || []);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load rooms");
    } finally {
      setLoadingRooms(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreateRoom = async (e) => {
    e.preventDefault();

    if (!form.name || !form.password) {
     toast.error("Room name and password required");
      return;
    }

    try {
      await api.post("/rooms", form);
     toast.success("Room created ✅");
      setForm({ name: "", description: "", password: "" });
      setActiveTab("myRooms");
      fetchRooms();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Create room failed");
    }
  };

  const tabBtnClass = (key) =>
    `tab-btn flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
      activeTab === key
        ? "bg-blue-500 text-white"
        : "bg-gray-100 text-gray-600"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <i className="fas fa-wallet text-white text-sm sm:text-lg"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              KhaataPro
            </h3>
          </div>

          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 transition text-gray-700 font-semibold"
            >
              <i className="fas fa-home text-blue-500"></i> <span className="hidden sm:inline">Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Tab Navigation */}
      <div className="lg:hidden sticky top-[73px] z-40 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("create")}
            className={tabBtnClass("create")}
          >
            <i className="fas fa-plus"></i> Create
          </button>
          <button
            onClick={() => setActiveTab("myRooms")}
            className={tabBtnClass("myRooms")}
          >
            <i className="fas fa-user"></i> My Rooms
          </button>
          <button
            onClick={() => setActiveTab("allRooms")}
            className={tabBtnClass("allRooms")}
          >
            <i className="fas fa-door-open"></i> All Rooms
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:flex lg:h-[calc(100vh-73px)]">
        {/* LEFT SIDEBAR: My Rooms */}
        <aside
          className={`${
            activeTab === "myRooms" ? "block" : "hidden"
          } lg:block lg:w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto`}
        >
          <div className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-user text-blue-500"></i>
              My Rooms
              <span className="ml-auto text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                Joined
              </span>
            </h3>

            {loadingRooms ? (
              <p className="text-gray-600">Loading...</p>
            ) : myRooms.length === 0 ? (
              <p className="text-gray-500 text-sm">You haven’t joined any room.</p>
            ) : (
              <div className="space-y-3">
                {myRooms.map((room) => (
                  <div
                    key={room._id}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md hover:shadow-blue-300/30 transition cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{room.name}</h4>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {room.description || "No description"}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span><i className="fas fa-users"></i> {room.members?.length || 0} members</span>
                      <span><i className="fas fa-lock"></i> Protected</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">Total: {myRooms.length} rooms</p>
            </div>
          </div>
        </aside>

        {/* CENTER: Create Room Form */}
        <main
          className={`${
            activeTab === "create" ? "flex" : "hidden"
          } lg:flex flex-1 items-center justify-center bg-gray-50 overflow-hidden`}
        >
          <div className="max-w-2xl w-full mx-auto px-4 sm:px-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-blue-500/25">
                  <i className="fas fa-plus text-white text-xl sm:text-2xl"></i>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
                  Create a Room
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Add a shared room for you and your friends to track expenses
                  together.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleCreateRoom} className="space-y-5 sm:space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    <i className="fas fa-door-open mr-2"></i> Room Name
                  </label>

                  <input
                    type="text"
                    placeholder="E.g. Flatmates Expenses"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm sm:text-base
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    <i className="fas fa-file-alt mr-2"></i> Description (optional)
                  </label>

                  <textarea
                    placeholder="Short note about this room..."
                    rows="3"
                    value={form.description}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, description: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm sm:text-base
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    <i className="fas fa-lock mr-2"></i> Room Password
                  </label>

                  <input
                    type="password"
                    placeholder="Set a secure password"
                    required
                    value={form.password}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, password: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm sm:text-base
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Share this with members to join the room
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 
                    text-white font-semibold py-3 sm:py-4 rounded-lg transition duration-200 
                    shadow-lg hover:shadow-blue-600/20"
                  >
                    <i className="fas fa-plus"></i> Create Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR: All Rooms */}
        <aside
          className={`${
            activeTab === "allRooms" ? "block" : "hidden"
          } lg:block lg:w-80 bg-gray-50 border-l border-gray-200 overflow-y-auto`}
        >
          <div className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-door-open text-blue-500"></i> All Rooms
              <span className="ml-auto text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                Public
              </span>
            </h3>

            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search rooms..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm sm:text-base
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400"
                />
                <i className="fas fa-search absolute left-3 top-2.5 text-gray-500"></i>
              </div>
            </div>

            {loadingRooms ? (
              <p className="text-gray-600">Loading...</p>
            ) : (
              <div className="space-y-3">
                {filteredAllRooms.map((room) => (
                  <div
                    key={room._id}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md hover:shadow-blue-300/20 transition cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{room.name}</h4>
                      <span className="text-gray-500 text-xs"><i className="fas fa-lock"></i></span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {room.description || "No description"}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span><i className="fas fa-users"></i> {room.members?.length || 0} members</span>
                      <button className="text-blue-500 font-medium hover:text-blue-600">
                        Join →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={fetchRooms}
                className="text-sm text-blue-500 hover:text-blue-600 font-medium transition"
              >
                Refresh Rooms →
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}