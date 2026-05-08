import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "../LoginForm";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      const data = response.data;
      login(data.user, data.token);
      toast.success("Login successful 🎉");

      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || "Login failed. Please try again.",
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

        <LoginForm onSubmit={handleSubmit} loading={loading} />

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

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
};

const formContainerStyle = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "400px",
};

const titleStyle = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginBottom: "0.5rem",
  color: "#333",
};

const subtitleStyle = {
  fontSize: "0.9rem",
  color: "#666",
  marginBottom: "1.5rem",
};

const linkTextStyle = {
  textAlign: "center",
  fontSize: "0.9rem",
  color: "#666",
};

const linkStyle = {
  color: "#007bff",
  textDecoration: "none",
  fontWeight: "bold",
};

export default Login;
