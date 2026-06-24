import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    { title: "Total Requests", value: 45, color: "#2563EB" },
    { title: "Pending L1", value: 8, color: "#F59E0B" },
    { title: "Pending L2", value: 5, color: "#8B5CF6" },
    { title: "Assigned", value: 12, color: "#06B6D4" },
    { title: "Completed", value: 15, color: "#22C55E" },
    { title: "Rejected", value: 5, color: "#EF4444" },
  ];

  return (
    <Layout>
      <h1>CRM Dashboard</h1>

      <p style={{ color: "#64748B" }}>
        Welcome to the Change Management Dashboard
      </p>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <button onClick={() => navigate("/request-form")}>
          Create Request
        </button>

        <button
          style={{ marginLeft: "10px" }}
          onClick={() => navigate("/request-list")}
        >
          View Requests
        </button>

        <button
          style={{ marginLeft: "10px" }}
          onClick={() => navigate("/approval")}
        >
          Approval Queue
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              background: card.color,
              color: "white",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h3>{card.title}</h3>
            <h1>{card.value}</h1>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "40px" }}>
        Recent Change Requests
      </h2>

      <table
        style={{
          width: "100%",
          marginTop: "15px",
          background: "white",
        }}
      >
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Assigned To</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>CR001</td>
            <td>UI Enhancement</td>
            <td>Pending L1</td>
            <td>-</td>
          </tr>

          <tr>
            <td>CR002</td>
            <td>API Update</td>
            <td>Assigned</td>
            <td>Rahul</td>
          </tr>

          <tr>
            <td>CR003</td>
            <td>Bug Fix</td>
            <td>Completed</td>
            <td>Priya</td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
}

export default Dashboard;