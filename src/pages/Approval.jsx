import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function Approval() {
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/approvals/level1/")
      .then((res) => res.json())
      .then((data) => setApprovals(data))
      .catch((err) => console.log(err));
  }, []);

  function approveTicket(id, status) {
    fetch(`http://127.0.0.1:8000/api/approvals/approve/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
        remarks: "",
      }),
    })
      .then((res) => res.json())
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h1>Approval Management</h1>

        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ticket</th>
              <th>Level</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {approvals.map((approval) => (
              <tr key={approval.id}>
                <td>{approval.id}</td>
                <td>{approval.ticket}</td>
                <td>{approval.level}</td>
                <td>{approval.status}</td>

                <td>
                  <button
                    onClick={() =>
                      approveTicket(approval.id, "Approved")
                    }
                  >
                    Approve
                  </button>

                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() =>
                      approveTicket(approval.id, "Rejected")
                    }
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Approval;