import React, { useState } from "react";

function AssignDeveloper() {
  const [developer, setDeveloper] = useState("");

  const developers = [
    "Pranjal",
    "Ankesh",
    "Pranay",
    "Zaki"
  ];

  const assignDeveloper = () => {
    if (!developer) {
      alert("Please select a developer");
      return;
    }

    alert(`Developer ${developer} assigned successfully!`);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Assign Developer</h2>

      <label>Select Developer</label>
      <br /><br />

      <select
        value={developer}
        onChange={(e) => setDeveloper(e.target.value)}
      >
        <option value="">Select</option>

        {developers.map((dev) => (
          <option key={dev} value={dev}>
            {dev}
          </option>
        ))}
      </select>

      <br /><br />

      <button onClick={assignDeveloper}>
        Assign
      </button>
    </div>
  );
}

export default AssignDeveloper;