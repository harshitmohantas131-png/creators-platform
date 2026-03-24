
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
return (
  <header style={headerStyle}>
    <div style={containerStyle}>
      <h1>
        <Link to="/" style={logoStyle}>CreatorHub</Link>
      </h1>

      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Home</Link>

        {isAuthenticated() ? (
          <>
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            <span style={userStyle}>Hi, {user.name}</span>
            <button onClick={logout} style={logoutBtnStyle}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )} 
        
      </nav>
    </div>
  </header>
);
};

/* -------- STYLES -------- */
const headerStyle = { backgroundColor: "#222", padding: "1rem 2rem", };

const containerStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", }; 

const navStyle = { display: "flex", alignItems: "center", gap: "1rem", }; 

const linkStyle = { color: "white", textDecoration: "none", }; 

const logoStyle = { color: "white", textDecoration: "none", }; 

const userStyle = { color: "#ddd", };

const logoutBtnStyle = { padding: "0.4rem 0.8rem", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", }; 

export default Header;

          

