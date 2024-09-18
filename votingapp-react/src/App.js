import { useEffect, useState } from "react";
import "./App.css";
import Voter from "./components/Voter";
import { saveVoter } from "./api/ApiService";
import Candidate from "./components/Candidates";
import VotingForm from "./components/VotingForm";

function App() {
  const [voterData, setVoterData] = useState([]);
  const [candidateData, setCandidateData] = useState([]);

  return (
    <div className="container">
      <div className="top-half">
        <div className="table-container">
          <div className="table-wrapper">
            <div className="table1">
              <Voter />
            </div>
            <div className="table2">
              <Candidate />
            </div>
          </div>
        </div>{" "}
      </div>
      <div className="bottom-half">
        <VotingForm />
      </div>
    </div>
  );
}

export default App;
