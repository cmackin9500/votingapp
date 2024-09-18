package com.casey.votingapp.repo;

import com.casey.votingapp.domain.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CandidateRepo extends JpaRepository<Candidate, String> {
    Optional<Candidate> findById(String id);
}
