import { Link } from "react-router-dom";
import ConnectionTest from "../components/common/ConnectionTest";

const Home = () => {
  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h1>Welcome to CreatorHub</h1>
      <p>A platform for creators to share their work.</p>

      <ConnectionTest />
``
      <div style={{ marginTop: "2rem" }}>
        <Link to="/register" style={{ marginRight: "1rem" }}>
          Get Started
        </Link>

        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Home;