import React, { useState } from "react";

function App() {

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("employee_name", "Pranjal");
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

      console.log(data);

      alert("Ticket Created Successfully");

    } catch (error) {

  console.error("Full Error:", error);

  alert("Check Browser Console (F12)");
}
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Raise Change Request</h1>

      <form onSubmit={handleSubmit}>

        <label>Project Name</label>

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

        <br /><br />

        <label>Description</label>

        <br />

        <textarea
          rows="5"
          cols="50"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <label>Upload File</label>

        <br />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        <button type="submit">
          Submit Ticket
        </button>

      </form>

    </div>
  );
}

export default App;