package com.project.yourjs.api.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.yourjs.api.req.Self_IntroReq;
import com.project.yourjs.api.res.Self_IntroDeleteRes;
import com.project.yourjs.api.res.Self_IntroPatchRes;
import com.project.yourjs.api.res.Self_IntroPostRes;
import com.project.yourjs.api.service.Self_IntroService;
import com.project.yourjs.db.entity.Self_Intro;

@RestController
@RequestMapping("/self")
public class Self_IntroController {
    private final Self_IntroService selfIntroService;

    public Self_IntroController(Self_IntroService selfIntroService){
        this.selfIntroService = selfIntroService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<Self_Intro>> getAllSelf_Intro(Authentication authentication){
        return ResponseEntity.ok(selfIntroService.getAllSelf_Intro(authentication.getName()));
    }
    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<Self_IntroPostRes> createSelf_Intro(Authentication authentication, @Valid @RequestBody Self_IntroReq self_IntroReq){
        return ResponseEntity.ok(selfIntroService.createSelf_IntroNoNotice(authentication.getName(), self_IntroReq));
    } 
    @PatchMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<Self_IntroPatchRes> updateSelf_Intro(){
        return null;
    }
    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<Self_IntroDeleteRes> deleteSelf_Intro(){
        return null;
    }
}
