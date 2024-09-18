import axios from "axios";

const API_VOTERS_URL = "http://localhost:8080/voters";
const API_CANDIDATES_URL = "http://localhost:8080/candidates";

export async function saveVoter(voter) {
  return await axios.post(API_VOTERS_URL, voter);
}

export async function updateVoter(voter) {
  return await axios.post(API_VOTERS_URL, voter);
}

export async function deleteVoter(id) {
  return await axios.delete(`${API_VOTERS_URL}/voter/${id}`);
}

export async function saveCandidate(candidate) {
  return await axios.post(API_CANDIDATES_URL, candidate);
}

export async function updateCandidate(candidate) {
  return await axios.post(API_CANDIDATES_URL, candidate);
}

export async function deleteCandidate(id) {
  return await axios.delete(`${API_CANDIDATES_URL}/candidate/${id}`);
}
