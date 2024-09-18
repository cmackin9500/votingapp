import React, { useState } from "react";
import { saveCandidate } from "../api/ApiService";

const Candidate = () => {
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [candidatesTableData, setCandidatesTableData] = useState([]);

  const addRow = () => {
    setCandidatesTableData([
      ...candidatesTableData,
      { name: "", numberOfVotes: 0, isEditing: true }, // Ensure all fields are present
    ]);
    setEditingRowIndex(candidatesTableData.length);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedCandidates = [...candidatesTableData];
    updatedCandidates[index][name] = value;
    setCandidatesTableData(updatedCandidates);
  };

  const handleKeydown = async (event, index) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const candidateToSave = {
        name: candidatesTableData[index].name,
        numberOfVotes: 0,
      };
      const response = await saveCandidate(candidateToSave);
      saveRow(index);
    }
  };

  const saveRow = (index) => {
    if (!candidatesTableData[index].name.trim()) {
      const newData = candidatesTableData.filter((_, i) => i !== index);
      setCandidatesTableData(newData);
      setEditingRowIndex(null);
    } else {
      const updatedData = [...candidatesTableData];
      updatedData[index].isEditing = false;
      setCandidatesTableData(updatedData);
    }
  };

  return (
    <div>
      <h2>Candidates</h2>
      <table>
        <thead>
          <tr>
            <th colSpan="2" className="title-row">
              Candidates
              <span
                className="plus-sign"
                tabIndex="0"
                role="button"
                aria-label="Add new row to Candidates table"
                onClick={() => {
                  addRow("candidatesTable");
                }}
                onKeyDown={(event) => handleKeydown(event, editingRowIndex)}
              >
                +
              </span>
            </th>
          </tr>
          <tr>
            <th className="name-column">Name</th>
            <th className="votes-column">Votes</th>
          </tr>
        </thead>
        <tbody>
          {candidatesTableData.map((row, index) => (
            <tr className={`row-${index}`} key={index}>
              <td className="name-column">
                {row.isEditing ? (
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name..."
                    value={row.name}
                    onChange={(event) => handleInputChange(event, index)}
                    onKeyDown={(event) => handleKeydown(event, index)}
                  />
                ) : (
                  row.name
                )}
              </td>
              <td className="votes-column">{row.numberOfVotes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Candidate;
