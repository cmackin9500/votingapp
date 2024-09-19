import React, { useState } from "react";

const VotingForm = ({
  submitVote,
  loading,
  selectedVoterId,
  votersTableData,
  handleVoterChange,
  handleVoterDropdownOpen,
  selectedCandidateId,
  candidatesTableData,
  handleCandidateChange,
  handleCandidateDropdownOpen,
}) => {
  return (
    <div className="voting-form-container">
      <form
        className="voting-form"
        onSubmit={(e) => {
          e.preventDefault();
          submitVote();
        }}
      >
        <select
          className="voter-select"
          value={selectedVoterId}
          onChange={handleVoterChange}
          onFocus={handleVoterDropdownOpen}
        >
          <option value="" disabled>
            Select a voter
          </option>
          {loading && <option>Loading...</option>}
          {votersTableData
            .slice()
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
          className="candidate-select"
          value={selectedCandidateId}
          onChange={handleCandidateChange}
          onFocus={handleCandidateDropdownOpen}
        >
          <option value="" disabled>
            Select a candidate
          </option>
          {loading && <option>Loading...</option>}
          {candidatesTableData.map((candidate) => (
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
