package com.project.yourjs.api.controller;

import com.project.yourjs.api.req.AwardDeleteReq;
import com.project.yourjs.api.req.AwardPostReq;
import com.project.yourjs.api.res.AwardDeleteRes;
import com.project.yourjs.api.res.AwardPatchRes;
import com.project.yourjs.api.res.AwardPostRes;
import com.project.yourjs.api.service.AwardService;
import com.project.yourjs.common.dto.AwardDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = AwardDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<AwardDto>> getAllAwards(Authentication authentication){
        return ResponseEntity.ok(awardService.getAllAwards(authentication.getName()));
    }

    @Operation(summary = "Create Award", description = "수상내역 등록")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = AwardPostRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<AwardPostRes> createNotice(Authentication authentication, @Valid @RequestBody AwardPostReq awardPostReq){
        return ResponseEntity.ok(awardService.createAward(authentication.getName(), awardPostReq));
    }

    @Operation(summary = "Update Award", description = "수상내역 수정")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = AwardPatchRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PutMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<AwardPatchRes> updateNotice(Authentication authentication, @Valid @RequestBody AwardDto awardDto){
        return ResponseEntity.ok(awardService.updateAward(authentication.getName(), awardDto));
    }

    @Operation(summary = "Delete Award", description = "수상내역 삭제")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = AwardDeleteRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<AwardDeleteRes> deleteNotice(Authentication authentication, @Valid @RequestBody AwardDeleteReq awardDeleteReq){
        return ResponseEntity.ok(awardService.deleteAward(authentication.getName(), awardDeleteReq));
    }

}
