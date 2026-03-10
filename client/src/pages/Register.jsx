import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1>Create Account</h1>
        <p>Join CreatorHub today</p>

        <div style={placeholderStyle}>
          <p>Registration form will be implemented later.</p>
          <ul>
            <li>Name field</li>
            <li>Email field</li>
            <li>Password field</li>
            <li>Confirm password</li>
          </ul>
        </div>

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

const placeholderStyle = {
  background: "#f5f5f5",
  padding: "1rem",
  marginTop: "1rem",
};

export default Register;