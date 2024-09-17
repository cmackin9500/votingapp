import React from "react";

const Voter = ({
  votersTableData,
  setCurrentTable,
  addRow,
  editingRowIndex,
  setEditingRowIndex,
  setVotersTableData,
  handleKeydown,
  handleInputChange,
  handleBlur,
}) => {
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
                  setCurrentTable("votersTable");
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
                    onBlur={(event) => handleBlur(event, index)}
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

export default Voter;
