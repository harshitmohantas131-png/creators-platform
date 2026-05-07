import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1 style={titleStyle}>Login</h1>
        <p style={subtitleStyle}>Sign in to your account</p>

        <div style={placeholderStyle}>
          <p>Login form will be implemented in a future lesson.</p>
          <ul>
            <li>Email input field</li>
            <li>Password input field</li>
            <li>Login button</li>
          </ul>
        </div>

        <p style={linkTextStyle}>
          Don't have an account? <Link to="/register">Register here</Link>
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

const titleStyle = {
  textAlign: "center",
};

const subtitleStyle = {
  textAlign: "center",
};

const placeholderStyle = {
  background: "#f5f5f5",
  padding: "1rem",
  marginTop: "1rem",
};

const linkTextStyle = {
  textAlign: "center",
  marginTop: "1rem",
};

export default Login;