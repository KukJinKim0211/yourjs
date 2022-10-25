package com.project.yourjs.api.controller;

import com.project.yourjs.api.res.AwardDeleteRes;
import com.project.yourjs.api.res.AwardPatchRes;
import com.project.yourjs.api.res.AwardPostRes;
import com.project.yourjs.api.service.AwardService;
import com.project.yourjs.common.dto.AwardDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Tag(name = "Award",description = "수상내역 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/award")
public class AwardController {

    private final AwardService awardService;

    @Operation(summary = "Get Awards", description = "수상내역 조회")
    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<AwardDto>> getAllAwards(Authentication authentication){
        return ResponseEntity.ok(awardService.getAllAwards(authentication.getName()));
    }

    @Operation(summary = "Create Award", description = "수상내역 등록")
    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<AwardPostRes> createNotice(Authentication authentication, @Valid @RequestBody AwardDto awardDto){
        return ResponseEntity.ok(awardService.createAward(authentication.getName(), awardDto)); //ResponseEntity.ok(NoticeService)
    }

    @Operation(summary = "Update Award", description = "수상내역 수정")
    @PutMapping("/{awardSeq}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<AwardPatchRes> updateNotice(Authentication authentication, @PathVariable Long awardSeq, @Valid @RequestBody AwardDto awardDto){
        return ResponseEntity.ok(awardService.updateAward(authentication.getName(), awardSeq, awardDto));
    }

    @Operation(summary = "Delete Award", description = "수상내역 삭제")
    @DeleteMapping("/{awardSeq}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<AwardDeleteRes> deleteNotice(Authentication authentication, @PathVariable Long awardSeq){
        return ResponseEntity.ok(awardService.deleteAward(authentication.getName(), awardSeq));
    }

}
