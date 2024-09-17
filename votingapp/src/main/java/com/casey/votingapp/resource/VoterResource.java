package com.casey.votingapp.resource;

import com.casey.votingapp.domain.Voter;
import com.casey.votingapp.service.VoterService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

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

    @GetMapping
    public ResponseEntity<Page<Voter>> getVoters(@RequestParam(value = "page", defaultValue = "0") int page,
                                                   @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok().body(voterService.getAllVoters(page, size));
    }
}
