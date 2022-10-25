package com.project.yourjs.api.controller;

import com.project.yourjs.api.req.GraduatePostReq;
import com.project.yourjs.api.req.GraduateUpdateReq;
import com.project.yourjs.api.service.GraduateService;
import com.project.yourjs.api.service.GraduateService;
import com.project.yourjs.db.entity.Graduate;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("graduate")
public class GraduateController {

    private GraduateService graduateService;

    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> createGraduate(Authentication authentication, @Valid @RequestBody GraduatePostReq graduatePostReq){
        String userId = authentication.getName();
        Graduate graduate = graduateService.createGraduate(userId, graduatePostReq);
        return ResponseEntity.ok(graduate); //ResponseEntity.ok(NoticeService)
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<Graduate>> getAllGraduates(Authentication authentication){
        List<Graduate> militaries = graduateService.getAllMilitaries(authentication.getName());
        return ResponseEntity.ok(militaries); //ResponseEntity.ok(NoticeService)
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> updateGraduate(Authentication authentication, @Valid @RequestBody GraduateUpdateReq graduateUpdateReq){
        String userId = authentication.getName();
        Graduate graduate = graduateService.updateGraduate(userId, graduateUpdateReq);
        return ResponseEntity.ok(graduate); //ResponseEntity.ok(NoticeService)
    }

    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> deleteGraduate(Authentication authentication, @Valid @RequestBody Graduate graduate){
        String userId = authentication.getName();
        boolean hasDeleted = graduateService.deleteGraduate(userId, graduate);
        return ResponseEntity.ok(hasDeleted); //ResponseEntity.ok(NoticeService)
    }

}
