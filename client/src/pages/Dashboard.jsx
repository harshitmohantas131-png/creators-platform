const Dashboard = () => {
  return (
    <div style={containerStyle}>
      <h1>Dashboard</h1>
      <p>Welcome back!</p>

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

const containerStyle = {
  padding: "2rem",
};

const boxStyle = {
  background: "#f5f5f5",
  padding: "1rem",
  marginTop: "1rem",
};

export default Dashboard;