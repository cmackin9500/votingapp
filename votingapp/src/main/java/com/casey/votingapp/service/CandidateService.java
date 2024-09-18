package com.casey.votingapp.service;

import com.casey.votingapp.domain.Candidate;
import com.casey.votingapp.repo.CandidateRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class CandidateService {
    private final CandidateRepo candidateRepo;

    public Candidate getCandidate(String id) {
        return candidateRepo.findById(id).orElseThrow(() -> new RuntimeException("Candidate not found"));
    }

    public Candidate updateCandidate(String id, Candidate updatedVoter) {
        Candidate existingCandidate = getCandidate(id);
        existingCandidate.setName(updatedVoter.getName());
        existingCandidate.setNumberOfVotes(updatedVoter.getNumberOfVotes());
        return candidateRepo.save(existingCandidate);
    }

    public List<Candidate> getAllCandidates() {
        return candidateRepo.findAll();
    }

    public Candidate createCandidate(Candidate candidate) {
        return candidateRepo.save(candidate);
    }

    public boolean deleteCandidate(String id) {
        if (candidateRepo.existsById(id)) {
            candidateRepo.deleteById(id);
            return true;
        }
        return false;
    }
}
