import { useEffect, useState } from "react";
import "./App.css";
import Voter from "./components/Voter";

function App() {
  const [votersTableData, setVotersTableData] = useState([]);
  const [candidatesTableData, setCandidatesTableData] = useState([]);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [currentTable, setCurrentTable] = useState("votersTable");
  const [selectedVoter, setSelectedVoter] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");

  const addRow = (tableType) => {
    if (tableType === "votersTable") {
      setVotersTableData([
        ...votersTableData,
        { name: "", hasVoted: "No", isEditing: true }, // Ensure all fields are present
      ]);
      setCurrentTable("votersTable");
      setEditingRowIndex(votersTableData.length);
    } else if (tableType === "candidatesTable") {
      setCandidatesTableData([
        ...candidatesTableData,
        { name: "", votes: 0, isEditing: true }, // Ensure all fields are present
      ]);
      setCurrentTable("candidatesTable");
      setEditingRowIndex(candidatesTableData.length);
    }
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    if (currentTable === "votersTable") {
      const updatedVoters = [...votersTableData];
      updatedVoters[index][name] = value;
      setVotersTableData(updatedVoters);
    } else {
      const updatedCandidates = [...candidatesTableData];
      updatedCandidates[index][name] = value;
      setCandidatesTableData(updatedCandidates);
    }
  };

  const handleDropdownChange = (event, index) => {
    const updatedVoters = [...votersTableData];
    updatedVoters[index].hasVoted = event.target.value;
    setVotersTableData(updatedVoters);
  };

  const saveRow = (index) => {
    const data =
      currentTable === "votersTable" ? votersTableData : candidatesTableData;
    if (!data[index].name.trim()) {
      const newData = data.filter((_, i) => i !== index);
      if (currentTable === "votersTable") {
        setVotersTableData(newData);
      } else {
        setCandidatesTableData(newData);
      }
      setEditingRowIndex(null);
    } else {
      const updatedData = [...data];
      updatedData[index].isEditing = false;
      if (currentTable === "votersTable") {
        setVotersTableData(updatedData);
      } else {
        setCandidatesTableData(updatedData);
      }
    }
  };

  const handleKeydown = (event, index) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveRow(index);
    }
  };

  const handleBlur = (event, index) => {
    setTimeout(() => {
      const data =
        currentTable === "votersTable" ? votersTableData : candidatesTableData;
      if (!data[index].name.trim()) {
        saveRow(index);
      }
    }, 0);
  };

  const submitVote = () => {
    if (selectedVoter && selectedCandidate) {
      const voterIndex = votersTableData.findIndex(
        (voter) => voter.name === selectedVoter
      );
      const candidateIndex = candidatesTableData.findIndex(
        (candidate) => candidate.name === selectedCandidate
      );

      if (
        voterIndex !== -1 &&
        candidateIndex !== -1 &&
        votersTableData[voterIndex].hasVoted === "No"
      ) {
        const updatedVoters = [...votersTableData];
        updatedVoters[voterIndex].hasVoted = "Yes";
        setVotersTableData(updatedVoters);

        const updatedCandidates = [...candidatesTableData];
        updatedCandidates[candidateIndex].votes += 1;
        setCandidatesTableData(updatedCandidates);

        setSelectedVoter("");
        setSelectedCandidate("");
      }
    }
  };

  useEffect(() => {
    if (editingRowIndex !== null) {
      const input = document.querySelector(`.row-${editingRowIndex} input`);
      if (input) {
        input.focus();
      }
    }
  }, [editingRowIndex]);

  return (
    <div className="App">
      <div className="table1">
        <Voter
          votersTableData={votersTableData}
          setVotersTableData={setVotersTableData}
          setCurrentTable={setCurrentTable}
          addRow={addRow}
          editingRowIndex={editingRowIndex}
          setEditingRowIndex={setEditingRowIndex}
          handleKeydown={handleKeydown}
          handleInputChange={handleInputChange}
          handleBlur={handleBlur}
        />
      </div>
    </div>
  );
}

export default App;
