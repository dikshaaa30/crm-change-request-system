import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);

  const [summary, setSummary] = useState(null);
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/tickets/summary/")
      .then((res) => {
        if (!res.ok) throw new Error("Dashboard API fetch failed");
        return res.json();
      })
      .then((data) => {
        setSummary(data.summary);
        setRecentTickets(data.recent_tickets || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const chartData = [
    { name: "Open", value: summary?.open ?? 0 },
    { name: "In Progress", value: summary?.in_progress ?? 0 },
    { name: "Resolved", value: summary?.resolved ?? 0 },
    { name: "Closed", value: summary?.closed ?? 0 },
  ];

  const COLORS = ["#F59E0B", "#8B5CF6", "#06B6D4", "#22C55E"];

  const cards = [
    {
      title: "Total Requests",
      value: summary?.total ?? 0,
      color: "#2563EB",
    },
    {
      title: "Open",
      value: summary?.open ?? 0,
      color: "#F59E0B",
    },
    {
      title: "In Progress",
      value: summary?.in_progress ?? 0,
      color: "#8B5CF6",
    },
    {
      title: "Resolved",
      value: summary?.resolved ?? 0,
      color: "#06B6D4",
    },
    {
      title: "Closed",
      value: summary?.closed ?? 0,
      color: "#22C55E",
    },
    {
      title: "Recent Tickets",
      value: recentTickets.length,
      color: "#EF4444",
    },
  ];

  return (
    <Layout>
      <div className={darkMode ? "dashboard dark" : "dashboard"}>
        {/* Header */}

        <div className="dashboard-header">
          <div>
            <h2>Dashboard</h2>
            <p>
              Welcome! Here's a quick overview of your change requests.
            </p>
          </div>

          <div className="action-buttons">
            <button
              className="theme-btn"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>

            <button
              className="create-btn"
              onClick={() => navigate("/request-form")}
            >
              + Create Request
            </button>
          </div>
        </div>

        {/* Summary Cards */}

        <div className="card-grid">
          {cards.map((card, index) => (
            <div
              key={index}
              className="card"
              style={{
                borderTop: `5px solid ${card.color}`,
              }}
            >
              <h3>{card.title}</h3>
              <h1>{card.value}</h1>
            </div>
          ))}
        </div>

        {/* Chart */}

        <div className="chart-box">
          <h3>Request Overview</h3>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={110}
                paddingAngle={4}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Requests */}

        <div className="table-section">
          <h2>Recent Change Requests</h2>

          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Requester</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="4">{error}</td>
                </tr>
              ) : recentTickets.length === 0 ? (
                <tr>
                  <td colSpan="4">No data found</td>
                </tr>
              ) : (
                recentTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>#{ticket.id}</td>

                    <td>{ticket.title}</td>

                    <td>
                      <span
                        className={`status ${ticket.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {ticket.status}
                      </span>
                    </td>

                    <td>{ticket.requester}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;