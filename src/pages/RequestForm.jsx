import { useState } from "react";
import Layout from "../components/Layout";

function RequestForm() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("employee_name", "Pranjal"); // You can later replace this with logged-in user
    formData.append("project_name", projectName);
    formData.append("description", description);

    if (file) {
      formData.append("attachment", file);
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/tickets/create/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Ticket Created Successfully!");

        setProjectName("");
        setDescription("");
        setFile(null);

        console.log(data);
      } else {
        alert("Error creating ticket");
        console.log(data);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <Layout>
      <h1>New Change Request</h1>

      <form onSubmit={handleSubmit}>
        <label>Project</label>
        <br />

        <select
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        >
          <option value="">Select Project</option>
          <option value="CRM Portal">CRM Portal</option>
          <option value="Inventory System">Inventory System</option>
          <option value="Employee Management">Employee Management</option>
        </select>

        <br />
        <br />

        <label>Description</label>
        <br />

        <textarea
          rows="5"
          cols="60"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <br />

        <label>Attachment</label>
        <br />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br />
        <br />

        <button type="submit">
          Submit Request
        </button>
      </form>
    </Layout>
  );
}

export default RequestForm;