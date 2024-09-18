package com.casey.votingapp.resource;

import com.casey.votingapp.domain.Candidate;
import com.casey.votingapp.service.CandidateService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

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

    @GetMapping
    public ResponseEntity<Page<Candidate>> getCandidates(@RequestParam(value = "page", defaultValue = "0") int page,
                                                         @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok().body(candidateService.getAllCandidates(page, size));
    }
}
