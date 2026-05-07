import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import socket from "../services/socket";
import toast from "react-hot-toast"; // 🔥 ADD THIS

const Dashboard = () => {
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    if (loading || !user) return;

    // 🔌 connect socket
    socket.connect();

    // ✅ connection logs
    socket.on("connect", () => {
      console.log("🔌 Connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket error:", err.message);
    });

    // 🔥 REAL-TIME EVENT LISTENER
    socket.on("newPost", (data) => {
      console.log("📢 New post event:", data);
      toast.success(data.message);
    });

    // 🧹 CLEANUP (VERY IMPORTANT)
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("newPost"); // 🔥 remove listener
      socket.disconnect();
    };
  }, [loading, user]);

  // ⏳ Loading
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        Loading...
      </div>
    );
  }

  // 🔐 Protection
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Welcome, {user.name} 👋</h1>
        <button onClick={logout} style={logoutBtnStyle}>
          Logout
        </button>
      </div>

      <p style={subtitleStyle}>Here’s your dashboard overview</p>

      <div style={boxStyle}>
        <h3>Your Info</h3>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Joined:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div style={boxStyle}>
        <p>This dashboard will show:</p>
        <ul>
          <li>Your content</li>
          <li>Statistics</li>
          <li>Create / Edit / Delete actions</li>
        </ul>
      </div>
    </div>
  );
};

/* -------- STYLES -------- */

const containerStyle = {
  padding: "2rem",
  maxWidth: "900px",
  margin: "0 auto",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const subtitleStyle = {
  marginTop: "0.5rem",
  color: "#555",
};

const boxStyle = {
  background: "#f5f5f5",
  padding: "1rem",
  marginTop: "1rem",
  borderRadius: "6px",
};

const logoutBtnStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Dashboard;
