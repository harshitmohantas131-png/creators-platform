import { useState } from "react";

const ConnectionTest = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const testConnection = async () => {
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/health");

      if (!response.ok) {
        throw new Error("Server response not OK");
      }

      const data = await response.json();
      setMessage(data.message);

    } catch (err) {
      setError("Connection failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px", background: "#f5f5f5", marginTop: "20px" }}>
      <h3>Backend Connection Test</h3>

      <button onClick={testConnection}>
        Test Connection
      </button>

      {message && (
        <p style={{ color: "green" }}>
          Success: {message}
        </p>
      )}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default ConnectionTest;