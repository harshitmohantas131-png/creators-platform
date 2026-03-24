
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout, loading } = useAuth();

  // ⏳ Wait for auth check
  if (loading) {
    return <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>;
  }

  // 🔐 Protect route
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
        <p><strong>Email:</strong> {user.email}</p>
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

