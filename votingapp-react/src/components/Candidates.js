import React, { useState, useEffect } from "react";

const Candidate = ({
  candidatesTableData,
  setCandidatesTableData,
  addCandidateRow,
  handleCandidateInputChange,
  handleCandidateKeydown,
  editingCandidateRowIndex,
}) => {
  useEffect(() => {
    setCandidatesTableData(candidatesTableData);
  }, [candidatesTableData, setCandidatesTableData]);
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
                  addCandidateRow();
                }}
                onKeyDown={(event) =>
                  handleCandidateKeydown(event, editingCandidateRowIndex)
                }
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
                    onChange={(event) =>
                      handleCandidateInputChange(event, index)
                    }
                    onKeyDown={(event) => handleCandidateKeydown(event, index)}
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
