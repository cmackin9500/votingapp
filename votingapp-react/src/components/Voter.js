import React, { useState } from "react";
import { saveVoter } from "../api/ApiService";

const VoterTable = () => {
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [votersTableData, setVotersTableData] = useState([]);

  const addRow = () => {
    setVotersTableData([
      ...votersTableData,
      { name: "", hasVoted: "No", isEditing: true }, // Ensure all fields are present
    ]);
    setEditingRowIndex(votersTableData.length);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedVoters = [...votersTableData];
    updatedVoters[index][name] = value;
    setVotersTableData(updatedVoters);
  };

  const handleKeydown = async (event, index) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const voterToSave = {
        name: votersTableData[index].name,
        hasVoted: false,
      };
      const response = await saveVoter(voterToSave);
      saveRow(index);
    }
  };

  const saveRow = (index) => {
    if (!votersTableData[index].name.trim()) {
      const newData = votersTableData.filter((_, i) => i !== index);
      setVotersTableData(newData);
      setEditingRowIndex(null);
    } else {
      const updatedData = [...votersTableData];
      updatedData[index].isEditing = false;
      setVotersTableData(updatedData);
    }
  };

  return (
    <div>
      <h2>Voters</h2>
      <table>
        <thead>
          <tr>
            <th colSpan="2" className="title-row">
              Voters
              <span
                className="plus-sign"
                tabIndex="0"
                role="button"
                aria-label="Add new row to Voters table"
                onClick={() => {
                  addRow("votersTable");
                }}
                onKeyDown={(event) => handleKeydown(event, editingRowIndex)}
              >
                +
              </span>
            </th>
          </tr>
          <tr>
            <th className="name-column">Name</th>
            <th className="voted-column">Has Voted</th>
          </tr>
        </thead>
        <tbody>
          {votersTableData.map((row, index) => (
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
              <td className="voted-column">{row.hasVoted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoterTable;
