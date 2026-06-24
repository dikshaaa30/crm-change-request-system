import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f7fc"
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "30px",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)"
        }}
      >
        <h2>CRM Login</h2>

        <input
          type="text"
          placeholder="Username"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px"
          }}
        />

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            background: "#2563EB",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;