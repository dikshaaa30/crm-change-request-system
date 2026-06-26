import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function RequestList() {

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/api/tickets/"
    );

    const data = await response.json();

    setTickets(data);
  };

  return (
    <Layout>

      <h1>Request List</h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "20px",
        }}
      >

        <thead>
          <tr>
            <th>Ticket No.</th>
            <th>Employee</th>
            <th>Project</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>

          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.ticket_number}</td>
              <td>{ticket.employee_name}</td>
              <td>{ticket.project_name}</td>
              <td>{ticket.status}</td>
              <td>
                {new Date(ticket.created_at).toLocaleString()}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </Layout>
  );
}

export default RequestList;