import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Link, useNavigate } from "react-router-dom";

export default function Scanner() {
  const navigate = useNavigate();

  const scannerRef = useRef(null);
  const fileRef = useRef(null);

  const [isScanning, setIsScanning] = useState(false);
  const [status, setStatus] = useState('Click "Start Scanning" to begin');
  const [statusColor, setStatusColor] = useState("text-gray-500");

  const [result, setResult] = useState("");

  // create scanner once
  useEffect(() => {
    scannerRef.current = new Html5Qrcode("reader");

    return () => {
      // cleanup: stop camera when leaving page
      const stopScanner = async () => {
        try {
          if (scannerRef.current?.isScanning) {
            await scannerRef.current.stop();
          }
          await scannerRef.current?.clear();
        } catch (e) {
          // ignore cleanup errors
        }
      };
      stopScanner();
    };
  }, []);

  const onScanSuccess = async (decodedText) => {
    setResult(decodedText);
    setStatus("QR Code scanned successfully!");
    setStatusColor("text-green-600");

    // stop after success
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
      } catch (e) {}
      setIsScanning(false);
    }
  };

  const startScanning = async () => {
    try {
      setStatus("Starting camera...");
      setStatusColor("text-gray-500");

      await scannerRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        onScanSuccess,
        () => {} // ignore scan errors
      );

      setIsScanning(true);
      setStatus("Scanning... Point camera at QR code");
      setStatusColor("text-green-600");
    } catch (err) {
      setStatus("Error: " + (err?.message || err));
      setStatusColor("text-red-600");
    }
  };

  const stopScanning = async () => {
    try {
      if (scannerRef.current && isScanning) {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
        setIsScanning(false);
        setStatus("Scanning stopped");
        setStatusColor("text-gray-500");
      }
    } catch (err) {
      setStatus("Error stopping scanner");
      setStatusColor("text-red-600");
    }
  };

  const uploadImage = () => {
    fileRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const tempQr = new Html5Qrcode("reader");
      const decodedText = await tempQr.scanFile(file, true);
      await tempQr.clear();

      onScanSuccess(decodedText);
    } catch (err) {
      setStatus("Failed to scan image. Try another image.");
      setStatusColor("text-red-600");
    } finally {
      e.target.value = "";
    }
  };

  const copyToClipboard = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setStatus("Copied to clipboard ✅");
    setStatusColor("text-green-600");
  };

  const useData = () => {
    if (!result) return;

    // If QR contains JSON (like expense data)
    try {
      const parsed = JSON.parse(result);
      console.log("Parsed data:", parsed);

      // Example: Navigate to create page with state
      // navigate("/create", { state: parsed });

      alert("QR JSON parsed ✅ (check console)");
    } catch (e) {
      alert("QR data: " + result);
    }
  };

  const clearResult = () => {
    setResult("");
    setStatus('Click "Start Scanning" to begin');
    setStatusColor("text-gray-500");
  };

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
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                KhaataPro
              </h1>
              <p className="text-xs text-gray-500 -mt-0.5">
                QR Scanner
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 transition text-gray-700 font-semibold"
          >
            <i className="fas fa-home text-blue-500"></i> Home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-blue-500 mr-3">📷</span>QR Code Scanner
          </h2>
          <p className="text-gray-600 text-lg">
            Scan QR codes to quickly add expense data
          </p>
        </div>

        {/* Scanner Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-md mb-8">
          {/* Scanner Container */}
          <div
            id="reader"
            className="w-full rounded-lg overflow-hidden mb-6 border border-gray-300"
          />

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isScanning ? (
              <button
                onClick={startScanning}
                className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition shadow-lg shadow-blue-500/25"
              >
                <i className="fas fa-camera"></i> Start Scanning
              </button>
            ) : (
              <button
                onClick={stopScanning}
                className="inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold transition shadow-lg shadow-red-500/25"
              >
                <i className="fas fa-stop"></i> Stop Scanning
              </button>
            )}

            <button
              onClick={uploadImage}
              className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-900 px-8 py-4 rounded-lg font-semibold transition"
            >
              <i className="fas fa-upload"></i> Upload QR Image
            </button>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Status Message */}
          <div className={`mt-6 text-center font-medium ${statusColor}`}>
            {status}
          </div>
        </div>

        {/* Result Card */}
        {result && (
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Scanned Result</h3>
              <button
                onClick={clearResult}
                className="text-gray-500 hover:text-gray-900 transition"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <p className="text-green-600 font-mono text-sm break-all">
                {result}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-blue-500/25"
              >
                <i className="fas fa-copy"></i> Copy to Clipboard
              </button>

              <button
                onClick={useData}
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-green-500/25"
              >
                <i className="fas fa-check"></i> Use This Data
              </button>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-white border border-gray-200 rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i className="fas fa-info-circle text-blue-500"></i> How to Use
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1">✔</span>
              <span>Click "Start Scanning" to activate your camera</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1">✔</span>
              <span>Point your camera at a QR code</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1">✔</span>
              <span>Or upload a QR code image from your device</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1">✔</span>
              <span>The scanned data will appear below for you to use</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-10">
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
              <li>
                <Link to="/dashboard" className="hover:text-blue-500 transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-blue-500 transition">
                  Add New Hisaab
                </Link>
              </li>
              <li>
                <Link to="/scanner" className="hover:text-blue-500 transition">
                  Scan
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-blue-500 transition">
                  My Rooms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-3">Connect</h3>
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

        <div className="mt-10 border-t border-gray-200 pt-4 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} KhaataPro — All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}