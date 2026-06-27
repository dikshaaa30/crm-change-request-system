import { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function RequestForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requester: "",
    project: "",   // ✅ ADDED
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/tickets/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then(() => {
        navigate("/request-list");
      })
      .catch(() => alert("Error creating request"));
  };

  return (
    <Layout>
      <div className="dashboard">

        <div className="dashboard-header">
          <h1>Create New Request</h1>
          <p>Submit a change request</p>
        </div>

        <div className="form-wrapper">

          <form className="form-box" onSubmit={handleSubmit}>

            {/* TITLE */}
            <label>Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            {/* PROJECT DROPDOWN ✅ NEW */}
            <label>Project</label>
            <select
              name="project"
              value={formData.project}
              onChange={handleChange}
              required
            >
              <option value="">Select Project</option>
              <option value="CRM System">CRM System</option>
              <option value="HR Portal">HR Portal</option>
              <option value="Finance App">Finance App</option>
              <option value="Website Upgrade">Website Upgrade</option>
            </select>

            {/* REQUESTER */}
            <label>Requester</label>
            <input
              name="requester"
              value={formData.requester}
              onChange={handleChange}
              required
            />

            {/* DESCRIPTION */}
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />

            <button type="submit">
              Submit Request
            </button>

          </form>

        </div>

      </div>
    </Layout>
  );
}

export default RequestForm;