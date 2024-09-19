import React, { useEffect, useState } from "react";

const VoterTable = ({
  votersTableData,
  setVotersTableData,
  addVoterRow,
  handleVoterInputChange,
  handleVoterKeydown,
  editingVoterRowIndex,
}) => {
  useEffect(() => {
    setVotersTableData(votersTableData);
  }, []);

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
                  addVoterRow();
                }}
                onKeyDown={(event) =>
                  handleVoterKeydown(event, editingVoterRowIndex)
                }
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
                    onChange={(event) => handleVoterInputChange(event, index)}
                    onKeyDown={(event) => handleVoterKeydown(event, index)}
                  />
                ) : (
                  row.name
                )}
              </td>
              <td className="voted-column">{row.hasVoted ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoterTable;
