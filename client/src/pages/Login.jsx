
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api"; // ✅ axios instance

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // 🔁 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🚀 Handle submit using axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      const data = response.data;

      // ✅ Save to context
      login(data.user, data.token);

      // 🔁 Redirect to intended page or dashboard
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });

    } catch (err) {
      console.error(err);

      // Axios error handling
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1 style={titleStyle}>Welcome Back</h1>
        <p style={subtitleStyle}>Login to your account</p>

        {/* ❌ Error */}
        {error && <p style={errorStyle}>{error}</p>}

        {/* 📝 Form */}
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* 🔗 Register */}
        <p style={linkTextStyle}>
          Don't have an account?{" "}
          <Link to="/register" style={linkStyle}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const containerStyle = {
  minHeight: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
};

const formContainerStyle = {
  background: "white",
  padding: "2rem",
  borderRadius: "8px",
  width: "350px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "0.5rem",
};

const subtitleStyle = {
  textAlign: "center",
  marginBottom: "1rem",
  color: "#666",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const inputStyle = {
  padding: "0.75rem",
  marginBottom: "1rem",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "0.75rem",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const errorStyle = {
  color: "red",
  textAlign: "center",
  marginBottom: "1rem",
};

const linkTextStyle = {
  textAlign: "center",
  marginTop: "1rem",
};

const linkStyle = {
  color: "#007bff",
  textDecoration: "none",
};

export default Login;


