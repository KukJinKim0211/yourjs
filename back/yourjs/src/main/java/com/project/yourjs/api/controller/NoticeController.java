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
import com.project.yourjs.api.req.NoticeUpdateReq;
import com.project.yourjs.api.res.NoticeDeleteRes;
import com.project.yourjs.api.res.NoticePatchRes;
import com.project.yourjs.api.res.NoticePostRes;
import com.project.yourjs.api.service.NoticeService;
import com.project.yourjs.db.entity.Notice;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@Tag(name = "Notice", description = "공고")
@RestController
@RequestMapping(("/notice"))
public class NoticeController {
  private final NoticeService noticeService;

  public NoticeController(NoticeService noticeService) {
    this.noticeService = noticeService;
  }

  @GetMapping
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<List<Notice>> getAllNotice(Authentication authentication) {
    return ResponseEntity.ok(noticeService.getAllNotice(authentication.getName()));
  }

  @Operation(summary = "공고 등록")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = NoticePostReq.class))),
    @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
    @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
    @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
  })
  @PostMapping
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<NoticePostRes> createNotice(Authentication authentication,
      @Valid @RequestBody NoticePostReq noticePostReq) {
    return ResponseEntity.ok(noticeService.createNotice(authentication.getName(), noticePostReq)); // ResponseEntity.ok(NoticeService)
  }

  @PatchMapping
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<NoticePatchRes> updateNotice(Authentication authentication,
      @Valid @RequestBody NoticeUpdateReq noticeUpdateReq) {
    return ResponseEntity.ok(noticeService.updateNotice(authentication.getName(), noticeUpdateReq));
  }

  @DeleteMapping
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<NoticeDeleteRes> deleteNotice(Authentication authentication, @RequestBody Integer noticeSeq) {
    return ResponseEntity.ok(noticeService.deleteNotice(authentication.getName(), noticeSeq));
  }
}
