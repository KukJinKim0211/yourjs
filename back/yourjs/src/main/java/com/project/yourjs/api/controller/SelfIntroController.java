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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.yourjs.api.req.SelfIntro.SelfIntroDeleteReq;
import com.project.yourjs.api.req.SelfIntro.SelfIntroPatchReq;
import com.project.yourjs.api.req.SelfIntro.SelfIntroPostReq;
import com.project.yourjs.api.res.SelfIntro.SelfIntroDeleteRes;
import com.project.yourjs.api.res.SelfIntro.SelfIntroGetRes;
import com.project.yourjs.api.res.SelfIntro.SelfIntroPatchRes;
import com.project.yourjs.api.res.SelfIntro.SelfIntroPostRes;
import com.project.yourjs.api.service.SelfIntroService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@Tag(name = "SelfIntroduce", description = "자소서")
@RestController
@RequestMapping("/introduce")
public class SelfIntroController {
  private final SelfIntroService selfIntroService;

  public SelfIntroController(SelfIntroService selfIntroService) {
    this.selfIntroService = selfIntroService;
  }

  @Operation(summary = "자소서 목록 조회")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = SelfIntroGetRes.class))),
      @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
  })
  @GetMapping
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<List<SelfIntroGetRes>> getAllSelfIntro(Authentication authentication) {
    return ResponseEntity.ok(selfIntroService.getAllSelfIntro(authentication.getName()));
  }

  @Operation(summary = "자소서 단일 조회")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = SelfIntroGetRes.class))),
      @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
  })
  @GetMapping("/{introSeq}")
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<SelfIntroGetRes> getSelfIntro(Authentication authentication, @PathVariable Integer introSeq) {
    return ResponseEntity.ok(selfIntroService.getSelfIntro(authentication.getName(), introSeq));
  }

  @Operation(summary = "자소서 등록")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = SelfIntroPostRes.class))),
      @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
  })
  @PostMapping
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<SelfIntroPostRes> createSelfIntro(Authentication authentication,
      @Valid @RequestBody SelfIntroPostReq selfIntroPostReq) {
    if (selfIntroPostReq.getNoticeSeq() == null)
      return ResponseEntity.ok(selfIntroService.createSelfIntroNoNotice(authentication.getName(), selfIntroPostReq));
    else
      return ResponseEntity.ok(selfIntroService.createSelfIntro(authentication.getName(), selfIntroPostReq));
  }

  @Operation(summary = "자소서 수정")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = SelfIntroPatchRes.class))),
      @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
  })
  @PatchMapping
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<SelfIntroPatchRes> updateSelfIntro(Authentication authentication,
      @Valid @RequestBody SelfIntroPatchReq selfIntroPatchReq) {
    return ResponseEntity.ok(selfIntroService.updateSelfIntro(authentication.getName(), selfIntroPatchReq));
  }

  @Operation(summary = "자소서 삭제")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = SelfIntroDeleteRes.class))),
      @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
  })
  @DeleteMapping
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<SelfIntroDeleteRes> deleteSelfIntro(Authentication authentication,
      @Valid @RequestBody SelfIntroDeleteReq selfIntroDeleteReq) {
    return ResponseEntity.ok(selfIntroService.deleteSelfIntro(authentication.getName(), selfIntroDeleteReq));
  }
}
