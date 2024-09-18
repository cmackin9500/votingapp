import React, { useState } from "react";
import {
  getCandidates,
  getVoters,
  updateCandidate,
  updateVoter,
} from "../api/ApiService";

const VotingForm = () => {
  const [voters, setVoters] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedVoterId, setSelectedVoterId] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [voterName, setVoterName] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [numberOfVotes, setNumberOfVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  const fetchVoters = async () => {
    setLoading(true);
    try {
      const response = await getVoters();
      setVoters(response.data);
    } catch (error) {
      console.error("Error fetching voters:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const response = await getCandidates();
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching voters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVoterDropdownOpen = () => {
    fetchVoters();
  };

  const handleCandidateDropdownOpen = () => {
    fetchCandidates();
  };

  const handleVoterChange = (e) => {
    const selectedId = e.target.value;
    setSelectedVoterId(selectedId);

    const selectedVoter = voters.find((voter) => voter.id === selectedId);

    if (selectedVoter) {
      setVoterName(selectedVoter.name); // Set name for editing
    }
  };

  const handleCandidateChange = (e) => {
    const selectedId = e.target.value;
    setSelectedCandidateId(selectedId);

    const selectedCandidate = candidates.find(
      (candidate) => candidate.id === selectedId
    );

    if (selectedCandidate) {
      setCandidateName(selectedCandidate.name); // Set name for editing
      setHasVoted(selectedCandidate.numberOfVotes); // Set hasVoted for editing
    }
  };

  const submitVote = async () => {
    const voterToSave = {
      name: voterName,
      hasVoted: true,
    };

    const candidateToSave = {
      name: candidateName,
      numberOfVotes: numberOfVotes + 1,
    };
    setSelectedVoterId("");
    setSelectedCandidateId("");

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
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitVote();
        }}
      >
        <select
          value={selectedVoterId}
          onChange={handleVoterChange}
          onFocus={handleVoterDropdownOpen}
        >
          <option value="" disabled>
            Select a voter
          </option>
          {loading && <option>Loading...</option>}
          {voters
            .sort((a, b) =>
              a.hasVoted === b.hasVoted ? 0 : a.hasVoted ? 1 : -1
            )
            .map((voter) => (
              <option
                key={voter.id}
                value={voter.id}
                disabled={voter.hasVoted}
                style={{ color: voter.hasVoted ? "gray" : "black" }}
              >
                {voter.name}
              </option>
            ))}
        </select>
        <select
          value={selectedCandidateId}
          onChange={handleCandidateChange}
          onFocus={handleCandidateDropdownOpen}
        >
          <option value="" disabled>
            Select a candidate
          </option>
          {loading && <option>Loading...</option>}
          {candidates.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.name}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VotingForm;
