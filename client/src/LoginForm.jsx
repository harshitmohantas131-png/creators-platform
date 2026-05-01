import { useState } from "react";

const LoginForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    setError("");
    onSubmit({
      email: formData.email.trim(),
      password: formData.password,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label htmlFor="email" style={labelStyle}>
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        style={inputStyle}
      />

      <label htmlFor="password" style={labelStyle}>
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        style={inputStyle}
      />

      {error && (
        <div role="alert" style={alertStyle}>
          {error}
        </div>
      )}

      <button type="submit" disabled={loading} style={buttonStyle}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginBottom: "1.5rem",
};

const labelStyle = {
  fontWeight: "600",
  color: "#333",
};

const inputStyle = {
  padding: "0.75rem",
  fontSize: "1rem",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontFamily: "inherit",
};

const buttonStyle = {
  padding: "0.75rem",
  fontSize: "1rem",
  fontWeight: "bold",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const alertStyle = {
  color: "#b00020",
  backgroundColor: "#fff1f2",
  border: "1px solid #f5c2c7",
  padding: "0.75rem",
  borderRadius: "4px",
};

export default LoginForm;
