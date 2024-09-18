package com.casey.votingapp.resource;

import com.casey.votingapp.domain.Voter;
import com.casey.votingapp.service.VoterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/voters")
@RequiredArgsConstructor
public class VoterResource {
    private final VoterService voterService;

    @PostMapping
    public ResponseEntity<Voter> createVoter(@RequestBody Voter voter) {
        return ResponseEntity.created(URI.create("/voters/userID")).body(voterService.createVoter(voter));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Voter> getVoter(@PathVariable(value = "id") String id) {
        return ResponseEntity.ok().body(voterService.getVoter(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Voter> deleteVoter(@PathVariable String id) {
        boolean isDeleted = voterService.deleteVoter(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Voter> updateVoter(@PathVariable String id, @RequestBody Voter updatedVoter) {
        Voter savedVoter = voterService.updateVoter(id, updatedVoter);
        return ResponseEntity.ok(savedVoter);
    }

    @GetMapping
    public ResponseEntity<List<Voter>> getVoters() {
        List<Voter> allVoters = voterService.getAllVoters();
        return ResponseEntity.ok().body(allVoters);
    }
}
