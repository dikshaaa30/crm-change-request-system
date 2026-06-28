import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    loadAssignments();
  }, []);

  // Load data from localStorage
  const loadAssignments = () => {
    const data = JSON.parse(localStorage.getItem("assignments")) || [];
    setAssignments(data);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>CRM Dashboard</h2>

      <div style={styles.card}>
        <h3>Assigned Developers</h3>

        {assignments.length === 0 ? (
          <p>No developers assigned yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Change Request</th>
                <th style={styles.th}>Assigned Developer</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((item, index) => (
                <tr key={index}>
                  <td style={styles.td}>{item.request}</td>
                  <td style={styles.td}>{item.developer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
  },
  heading: {
    marginBottom: "20px",
  },
  card: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    border: "1px solid #ccc",
    padding: "10px",
    backgroundColor: "#ddd",
  },
  td: {
    border: "1px solid #ccc",
    padding: "10px",
  },
};
const handleAssign = () => {
  const data = JSON.parse(localStorage.getItem("assignments")) || [];

  data.push({
    request: selectedRequest,
    developer: selectedDeveloper
  });

  localStorage.setItem("assignments", JSON.stringify(data));
};

export default Dashboard;