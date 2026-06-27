import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="overlay">
        <div className="landing-content">
          
          <h1 className="title">
            Change Request<br />Management System
          </h1>

          <p className="subtitle">
            A centralized system to manage, track and approve change requests efficiently.
          </p>

          <button
            className="start-btn"
            onClick={() => navigate("/login")}
          >
            Start
          </button>

        </div>
      </div>
    </div>
  );
}

export default LandingPage;