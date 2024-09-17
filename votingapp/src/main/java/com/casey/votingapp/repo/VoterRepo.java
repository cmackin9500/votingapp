package com.casey.votingapp.repo;

import com.casey.votingapp.domain.Voter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoterRepo extends JpaRepository<Voter, String> {
    Optional<Voter> findById(String id);
}
