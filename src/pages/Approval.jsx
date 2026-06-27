import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "./Dashboard.css"; // reuse same design system

function Approval() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tickets/approval/")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="dashboard">

        {/* HEADER */}
        <div className="dashboard-header">
          <h1>Approval Queue</h1>
          <p>Manage pending change requests</p>
        </div>

        {/* CARDS */}
        <div className="card-grid">
          <div className="card">
            <h3>Pending</h3>
            <h1>{requests.filter(r => r.status === "open").length}</h1>
          </div>

          <div className="card">
            <h3>Approved</h3>
            <h1>{requests.filter(r => r.status === "resolved").length}</h1>
          </div>

          <div className="card">
            <h3>Rejected</h3>
            <h1>{requests.filter(r => r.status === "closed").length}</h1>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-section">
          <h2>Pending Approvals</h2>

          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Requester</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4">Loading...</td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan="4">No requests found</td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id}>
                    <td>#{req.id}</td>
                    <td>{req.title}</td>
                    <td>{req.requester}</td>
                    <td>
                      <span className={`status ${req.status}`}>
                        {req.status}
                      </span>
                    </td>
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

export default Approval;