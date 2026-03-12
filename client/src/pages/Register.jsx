import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
  newErrors.email = "Email is required";
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  newErrors.email = "Please enter a valid email address";
}

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {

      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
  name: formData.name.trim(),
  email: formData.email.trim().toLowerCase(),
  password: formData.password
})
      });

      const data = await response.json();

      if (response.ok) {

        setSuccessMessage("Account created successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } else {

        setApiError(data.message);

      }

    } catch (error) {
       console.error("Registration error: ", error);
      setApiError("Server connection failed");

    } finally {

      setIsLoading(false);

    }
  };

  return (

    <div style={containerStyle}>
      <div style={formContainerStyle}>

        <h1>Create Account</h1>
        <p>Join CreatorHub today</p>

        {successMessage && <p style={{color:"green"}}>{successMessage}</p>}
        {apiError && <p style={{color:"red"}}>{apiError}</p>}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{color:"red"}}>{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{color:"red"}}>{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{color:"red"}}>{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p style={{color:"red"}}>{errors.confirmPassword}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>

        </form>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>

      </div>
    </div>

  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80vh",
};

const formContainerStyle = {
  background: "white",
  padding: "2rem",
  borderRadius: "8px",
};



export default Register;