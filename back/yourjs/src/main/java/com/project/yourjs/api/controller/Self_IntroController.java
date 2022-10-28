package com.project.yourjs.api.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.yourjs.api.req.NoticePostReq;
import com.project.yourjs.api.req.Self_IntroPostReq;
import com.project.yourjs.api.req.Self_IntroReq;
import com.project.yourjs.api.res.Self_IntroDeleteRes;
import com.project.yourjs.api.res.Self_IntroPatchRes;
import com.project.yourjs.api.res.Self_IntroPostRes;
import com.project.yourjs.api.service.Self_IntroService;
import com.project.yourjs.db.entity.Self_Intro;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@Tag(name = "SelfIntroduce", description = "자소서")
@RestController
@RequestMapping("/self")
public class Self_IntroController {
    private final Self_IntroService selfIntroService;

    public Self_IntroController(Self_IntroService selfIntroService){
        this.selfIntroService = selfIntroService;
    }

    @Operation(summary = "자소서 목록 조회")
    @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = NoticePostReq.class))),
      @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<Self_Intro>> getAllSelf_Intro(Authentication authentication){
        return ResponseEntity.ok(selfIntroService.getAllSelf_Intro(authentication.getName()));
    }

    @Operation(summary = "자소서 등록")
    @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = NoticePostReq.class))),
      @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<Self_IntroPostRes> createSelf_Intro(Authentication authentication, @Valid @RequestBody Self_IntroPostReq self_IntroPostReq){
        return ResponseEntity.ok(selfIntroService.createSelf_IntroNoNotice(authentication.getName(), self_IntroPostReq));
    }

    @Operation(summary = "자소서 수정")
    @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = NoticePostReq.class))),
      @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PatchMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<Self_IntroPatchRes> updateSelf_Intro(){
        return null;
    }

    @Operation(summary = "자소서 삭제")
    @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = NoticePostReq.class))),
      @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<Self_IntroDeleteRes> deleteSelf_Intro(){
        return null;
    }
}
