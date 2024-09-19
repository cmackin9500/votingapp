import { useEffect, useState } from "react";
import "./App.css";
import Voter from "./components/Voter";
import {
  saveVoter,
  saveCandidate,
  getVoters,
  getCandidates,
  updateVoter,
  updateCandidate,
} from "./api/ApiService";
import Candidate from "./components/Candidates";
import VotingForm from "./components/VotingForm";

function App() {
  // Voters useState
  const [votersTableData, setVotersTableData] = useState([]);
  const [editingVotersRowIndex, setEditingVotersRowIndex] = useState(null);
  // Candidates useState
  const [candidatesTableData, setCandidatesTableData] = useState([]);
  const [editingCandidateRowIndex, setEditingCandidateRowIndex] =
    useState(null);
  // Voting Form useState
  const [selectedVoterId, setSelectedVoterId] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [loading, setLoading] = useState(true);
  const [voterName, setVoterName] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [numberOfVotes, setNumberOfVotes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [voterResponse, candidateResponse] = await Promise.all([
          getVoters(),
          getCandidates(),
        ]);
        setVotersTableData(voterResponse.data);
        setCandidatesTableData(candidateResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // VOTER LOGIC
  const addVoterRow = () => {
    setVotersTableData([
      ...votersTableData,
      { name: "", hasVoted: false, isEditing: true },
    ]);
    setEditingVotersRowIndex(votersTableData.length);
  };

  const handleVoterInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedVoters = [...votersTableData];
    updatedVoters[index][name] = value;
    setVotersTableData(updatedVoters);
  };

  const handleVoterKeydown = async (event, index) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const voterToSave = {
        name: votersTableData[index].name,
        hasVoted: false,
      };
      const response = await saveVoter(voterToSave);
      saveVoterRow(index);
    }
  };

  const saveVoterRow = (index) => {
    if (!votersTableData[index].name.trim()) {
      const newData = votersTableData.filter((_, i) => i !== index);
      setVotersTableData(newData);
      setEditingVotersRowIndex(null);
    } else {
      const updatedData = [...votersTableData];
      updatedData[index].isEditing = false;
      setVotersTableData(updatedData);
    }
  };

  const handleVoterDropdownOpen = () => {
    fetchVoters();
  };

  const handleVoterChange = (e) => {
    const selectedId = e.target.value;
    setSelectedVoterId(selectedId);

    const selectedVoter = votersTableData.find(
      (voter) => voter.id === selectedId
    );

    if (selectedVoter) {
      setVoterName(selectedVoter.name);
    }
  };

  const fetchVoters = async () => {
    setLoading(true);
    try {
      const response = await getVoters();
      setVotersTableData(response.data);
    } catch (error) {
      console.error("Error fetching voters:", error);
    } finally {
      setLoading(false);
    }
  };

  // CANDIDATE LOGIC
  const addCandidateRow = () => {
    setCandidatesTableData([
      ...candidatesTableData,
      { name: "", numberOfVotes: 0, isEditing: true },
    ]);
    setEditingCandidateRowIndex(candidatesTableData.length);
  };

  const handleCandidateInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedCandidates = [...candidatesTableData];
    updatedCandidates[index][name] = value;
    setCandidatesTableData(updatedCandidates);
  };

  const handleCandidateKeydown = async (event, index) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const candidateToSave = {
        name: candidatesTableData[index].name,
        numberOfVotes: 0,
      };
      const response = await saveCandidate(candidateToSave);
      saveCandidateRow(index);
    }
  };

  const saveCandidateRow = (index) => {
    if (!candidatesTableData[index].name.trim()) {
      const newData = candidatesTableData.filter((_, i) => i !== index);
      setCandidatesTableData(newData);
      setEditingCandidateRowIndex(null);
    } else {
      const updatedData = [...candidatesTableData];
      updatedData[index].isEditing = false;
      setCandidatesTableData(updatedData);
    }
  };

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const response = await getCandidates();
      setCandidatesTableData(response.data);
    } catch (error) {
      console.error("Error fetching voters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCandidateDropdownOpen = () => {
    fetchCandidates();
  };

  const handleCandidateChange = (e) => {
    const selectedId = e.target.value;
    setSelectedCandidateId(selectedId);

    const selectedCandidate = candidatesTableData.find(
      (candidate) => candidate.id === selectedId
    );

    if (selectedCandidate) {
      setCandidateName(selectedCandidate.name);
      setNumberOfVotes(selectedCandidate.numberOfVotes);
    }
  };

  // OTHER LOGICS
  const submitVote = async () => {
    const voterToSave = {
      name: voterName,
      hasVoted: true,
    };

    const candidateToSave = {
      name: candidateName,
      numberOfVotes: numberOfVotes + 1,
    };

    try {
      const voterResponse = await updateVoter(selectedVoterId, voterToSave);
      const candidateResponse = await updateCandidate(
        selectedCandidateId,
        candidateToSave
      );
    } catch (error) {
      console.error(
        "Error updating voter:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setVotersTableData((votersTableData) =>
        votersTableData.map((voter) =>
          voter.id === selectedVoterId
            ? { ...voter, hasVoted: true } // Set hasVoted to true for the specific voter
            : voter
        )
      );
      setCandidatesTableData((candidatesTableData) =>
        candidatesTableData.map((candidate) =>
          candidate.id === selectedCandidateId
            ? { ...candidate, numberOfVotes: candidateToSave.numberOfVotes } // Set hasVoted to true for the specific voter
            : candidate
        )
      );

      setSelectedVoterId("");
      setSelectedCandidateId("");
    }
  };

  return (
    <div className="container">
      <div className="top-half">
        <div className="table-container">
          <div className="table-wrapper">
            <div className="table1">
              <Voter
                votersTableData={votersTableData}
                setVotersTableData={setVotersTableData}
                addVoterRow={addVoterRow}
                handleVoterInputChange={handleVoterInputChange}
                handleVoterKeydown={handleVoterKeydown}
                saveRow={saveVoterRow}
                editingRowIndex={editingVotersRowIndex}
              />
            </div>
            <div className="table2">
              <Candidate
                candidatesTableData={candidatesTableData}
                setCandidatesTableData={setCandidatesTableData}
                addCandidateRow={addCandidateRow}
                handleCandidateInputChange={handleCandidateInputChange}
                handleCandidateKeydown={handleCandidateKeydown}
                editingCandidateRowIndex={editingCandidateRowIndex}
              />
            </div>
          </div>
        </div>{" "}
      </div>
      <div className="bottom-half">
        <VotingForm
          submitVote={submitVote}
          loading={loading}
          selectedVoterId={selectedVoterId}
          votersTableData={votersTableData}
          handleVoterChange={handleVoterChange}
          handleVoterDropdownOpen={handleVoterDropdownOpen}
          selectedCandidateId={selectedCandidateId}
          candidatesTableData={candidatesTableData}
          handleCandidateChange={handleCandidateChange}
          handleCandidateDropdownOpen={handleCandidateDropdownOpen}
        />
      </div>
    </div>
  );
}

export default App;
