import { useEffect, useState } from "react";
import "./App.css";
import Voter from "./components/Voter";
import { saveVoter } from "./api/ApiService";

function App() {
  const [candidatesTableData, setCandidatesTableData] = useState([]);
  const [currentTable, setCurrentTable] = useState("votersTable");
  const [selectedVoter, setSelectedVoter] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");

  return (
    <div className="App">
      <div className="table1">
        <Voter />
      </div>
    </div>
  );
}

export default App;
