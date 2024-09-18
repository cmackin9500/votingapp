package com.casey.votingapp.service;

import com.casey.votingapp.domain.Candidate;
import com.casey.votingapp.repo.CandidateRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class CandidateService {
    private final CandidateRepo candidateRepo;

    public Candidate getCandidate(String id) {
        return candidateRepo.findById(id).orElseThrow(() -> new RuntimeException("Candidate not found"));
    }

    public Page<Candidate> getAllCandidates(int page, int size) {
        return candidateRepo.findAll(PageRequest.of(page, size, Sort.by("name")));
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
