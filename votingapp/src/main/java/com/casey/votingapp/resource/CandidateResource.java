package com.casey.votingapp.resource;

import com.casey.votingapp.domain.Candidate;
import com.casey.votingapp.domain.Voter;
import com.casey.votingapp.service.CandidateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/candidates")
@RequiredArgsConstructor
public class CandidateResource {
    private final CandidateService candidateService;

    @PostMapping
    public ResponseEntity<Candidate> createCandidate(@RequestBody Candidate candidate) {
        return ResponseEntity.created(URI.create("/candidates/userID")).body(candidateService.createCandidate(candidate));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Candidate> getCandidate(@PathVariable(value = "id") String id) {
        return ResponseEntity.ok().body(candidateService.getCandidate(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Candidate> deleteCandidate(@PathVariable String id) {
        boolean isDeleted = candidateService.deleteCandidate(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable String id, @RequestBody Candidate updatedCandidate) {
        Candidate savedCandidate = candidateService.updateCandidate(id, updatedCandidate);
        return ResponseEntity.ok(savedCandidate);
    }

    @GetMapping
    public ResponseEntity<List<Candidate>> getCandidates() {
        List<Candidate> allCandidates = candidateService.getAllCandidates();
        return ResponseEntity.ok().body(allCandidates);
    }

}
