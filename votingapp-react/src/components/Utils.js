export const addRow = (
  tableType,
  votersTableData,
  setVotersTableData,
  candidatesTableData,
  setCandidatesTableData,
  setCurrentTable,
  setEditingRowIndex
) => {
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
