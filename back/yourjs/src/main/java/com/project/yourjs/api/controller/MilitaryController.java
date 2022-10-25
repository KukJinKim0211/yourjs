package com.project.yourjs.api.controller;

import com.project.yourjs.api.req.MilitaryPostReq;
import com.project.yourjs.api.req.MilitaryUpdateReq;
import com.project.yourjs.api.service.MilitaryService;
import com.project.yourjs.api.service.MilitaryService;
import com.project.yourjs.db.entity.Military;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("military")
public class MilitaryController {

    private MilitaryService militaryService;

    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> createMilitary(Authentication authentication, @Valid @RequestBody MilitaryPostReq militaryPostReq){
        String userId = authentication.getName();
        Military military = militaryService.createMilitary(userId, militaryPostReq);
        return ResponseEntity.ok(military); //ResponseEntity.ok(NoticeService)
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<Military>> getAllMilitaryies(Authentication authentication){
        List<Military> militaries = militaryService.getAllMilitaries(authentication.getName());
        return ResponseEntity.ok(militaries); //ResponseEntity.ok(NoticeService)
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> updateMilitary(Authentication authentication, @Valid @RequestBody MilitaryUpdateReq militaryUpdateReq){
        String userId = authentication.getName();
        Military military = militaryService.updateMilitary(userId, militaryUpdateReq);
        return ResponseEntity.ok(military); //ResponseEntity.ok(NoticeService)
    }

    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> deleteMilitary(Authentication authentication, @Valid @RequestBody Military military){
        String userId = authentication.getName();
        boolean hasDeleted = militaryService.deleteMilitary(userId, military);
        return ResponseEntity.ok(hasDeleted); //ResponseEntity.ok(NoticeService)
    }
}
