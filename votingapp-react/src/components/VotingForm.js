import React, { useState } from "react";
import { getVoters } from "../api/ApiService";

const VotingForm = () => {
  const [selectedVoter, setSelectedVoter] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVoters = async () => {
    setLoading(true);
    try {
      const response = await getVoters();
      console.log(response);
    } catch (error) {
      console.error("Error fetching voters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDropdownOpen = () => {
    if (options.length === 0) {
      fetchVoters();
    }
  };

  const submitVote = () => {
    console.log();
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
          value={selectedVoter}
          onChange={(e) => setSelectedVoter(e.target.value)}
          onFocus={handleDropdownOpen}
        >
          <option value="" disabled>
            Select a voter
          </option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VotingForm;
