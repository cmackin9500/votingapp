package com.casey.votingapp.service;

import com.casey.votingapp.domain.Voter;
import com.casey.votingapp.repo.VoterRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class VoterService {
    private final VoterRepo voterRepo;

    public Voter getVoter(String id) {
        return voterRepo.findById(id).orElseThrow(() -> new RuntimeException("Voter not found"));
    }

    public Voter updateVoter(String id, Voter updatedVoter) {
        Voter existingVoter = getVoter(id);
        existingVoter.setName(updatedVoter.getName());
        existingVoter.setHasVoted(updatedVoter.getHasVoted());
        return voterRepo.save(existingVoter);
    }

    public List<Voter> getAllVoters() {
        return voterRepo.findAll();
    }

    public Voter createVoter(Voter voter) {
        return voterRepo.save(voter);
    }

    public boolean deleteVoter(String id) {
        if (voterRepo.existsById(id)) {
            voterRepo.deleteById(id);
            return true;
        }
        return false;
    }
}
