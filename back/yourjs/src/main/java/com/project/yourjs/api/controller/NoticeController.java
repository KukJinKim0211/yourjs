package com.project.yourjs.api.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.yourjs.api.req.NoticeReq;
import com.project.yourjs.api.res.NoticeDeleteRes;
import com.project.yourjs.api.res.NoticePatchRes;
import com.project.yourjs.api.res.NoticePostRes;
import com.project.yourjs.api.service.NoticeService;
import com.project.yourjs.db.entity.Notice;

@RestController
@RequestMapping(("/notice"))
public class NoticeController {
  private final NoticeService noticeService;

  public NoticeController(NoticeService noticeService){
    this.noticeService = noticeService;
  }

  @GetMapping
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<List<Notice>> getAllNotice(){
    return ResponseEntity.ok(noticeService.getAllNotice());
  }

  @PostMapping
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<NoticePostRes> createNotice(Authentication authentication, @Valid @RequestBody NoticeReq noticeReq){
    return ResponseEntity.ok(noticeService.createNotice(authentication.getName(), noticeReq)); //ResponseEntity.ok(NoticeService)
  }

  @PatchMapping("/{noticeSeq}")
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<NoticePatchRes> updateNotice(Authentication authentication, @PathVariable Integer noticeSeq, @Valid @RequestBody NoticeReq noticeReq){
    return ResponseEntity.ok(noticeService.updateNotice(authentication.getName(), noticeSeq, noticeReq));
  }

  @DeleteMapping("/{noticeSeq}")
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<NoticeDeleteRes> deleteNotice(Authentication authentication, @PathVariable Integer noticeSeq){
    return ResponseEntity.ok(noticeService.deleteNotice(authentication.getName(), noticeSeq));
  }
}
