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

import com.project.yourjs.api.req.Notice.NoticeDeleteReq;
import com.project.yourjs.api.req.Notice.NoticePostReq;
import com.project.yourjs.api.req.Notice.NoticeUpdateReq;
import com.project.yourjs.api.res.Notice.NoticeDeleteRes;
import com.project.yourjs.api.res.Notice.NoticeGetRes;
import com.project.yourjs.api.res.Notice.NoticePatchRes;
import com.project.yourjs.api.res.Notice.NoticePostRes;
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

  @Operation(summary = "공고 목록 조회")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = NoticeGetRes.class))),
    @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
    @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
    @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
  })
  @GetMapping
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<List<NoticeGetRes>> getAllNotice(Authentication authentication) {
    return ResponseEntity.ok(noticeService.getAllNotice(authentication.getName()));
  }

  @Operation(summary = "공고 단일 조회")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = NoticeGetRes.class))),
    @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
    @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
    @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
  })
  @GetMapping("/{noticeSeq}")
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<NoticeGetRes> getNotice(Authentication authentication, @PathVariable Integer noticeSeq) {
    return ResponseEntity.ok(noticeService.getNotice(authentication.getName(), noticeSeq));
  }

  @Operation(summary = "공고 등록")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = NoticePostRes.class))),
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

  @Operation(summary = "공고 수정")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = NoticePatchRes.class))),
    @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
    @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
    @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
  })
  @PatchMapping
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<NoticePatchRes> updateNotice(Authentication authentication,
      @Valid @RequestBody NoticeUpdateReq noticeUpdateReq) {
    return ResponseEntity.ok(noticeService.updateNotice(authentication.getName(), noticeUpdateReq));
  }

  @Operation(summary = "공고 삭제")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = NoticeDeleteRes.class))),
    @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
    @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
    @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
  })
  @DeleteMapping
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<NoticeDeleteRes> deleteNotice(Authentication authentication, @RequestBody NoticeDeleteReq noticeDeleteReq) {
    return ResponseEntity.ok(noticeService.deleteNotice(authentication.getName(), noticeDeleteReq.getNoticeSeq()));
  }
}
