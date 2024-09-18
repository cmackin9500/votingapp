import { useEffect, useState } from "react";
import "./App.css";
import Voter from "./components/Voter";
import { saveVoter } from "./api/ApiService";
import Candidate from "./components/Candidates";

function App() {
  const [candidatesTableData, setCandidatesTableData] = useState([]);
  const [currentTable, setCurrentTable] = useState("votersTable");
  const [selectedVoter, setSelectedVoter] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
