package com.casey.votingapp.service;

import com.casey.votingapp.domain.Voter;
import com.casey.votingapp.repo.VoterRepo;
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
public class VoterService {
    private final VoterRepo voterRepo;

    public Voter getVoter(String id) {
        return voterRepo.findById(id).orElseThrow(() -> new RuntimeException("Voter not found"));
    }

    public Page<Voter> getAllVoters(int page, int size) {
        return voterRepo.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    public Voter createVoter(Voter voter) {
        return voterRepo.save(voter);
    }

    public void deleteVoter(String id) {
        voterRepo.deleteById(id);
    }
}
