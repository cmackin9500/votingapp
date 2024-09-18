import axios from "axios";

const API_VOTERS_URL = "http://localhost:8080/voters";
const API_CANDIDATES_URL = "http://localhost:8080/candidates";

export async function saveVoter(voter) {
  return await axios.post(API_VOTERS_URL, voter);
}

export async function updateVoter(id, updatedData) {
  return await axios.put(`${API_VOTERS_URL}/${id}`, updatedData);
}

export async function deleteVoter(id) {
  return await axios.delete(`${API_VOTERS_URL}/voter/${id}`);
}

export async function getVoters() {
  return await axios.get(`${API_VOTERS_URL}`);
}

export async function saveCandidate(candidate) {
  return await axios.post(API_CANDIDATES_URL, candidate);
}

export async function updateCandidate(id, updatedData) {
  return await axios.put(`${API_CANDIDATES_URL}/${id}`, updatedData);
}

export async function deleteCandidate(id) {
  return await axios.delete(`${API_CANDIDATES_URL}/candidate/${id}`);
}

export async function getCandidates() {
  return await axios.get(`${API_CANDIDATES_URL}`);
}
