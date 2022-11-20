package com.project.yourjs.api.controller;

import com.project.yourjs.api.req.FollowReq;
import com.project.yourjs.api.res.Portfolio.Award.AwardPostRes;
import com.project.yourjs.api.service.FollowService;
import com.project.yourjs.db.entity.Follow;
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

@Tag(name = "Follow",description = "팔로우 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("follow")
public class FollowController {

    private final FollowService followService;

    @Operation(summary = "팔로우 요청 생성", description = "유저의 [팔로우 요청]을 생성한다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Follow.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> requestFollow(Authentication authentication, @RequestBody FollowReq followReq) {
        String requestUserId = authentication.getName();
        return ResponseEntity.ok(followService.requestFollow(requestUserId, followReq.getResponseUserId()));
    }

    @Operation(summary = "팔로우 관계 삭제", description = "[팔로우 관계]를 삭제한다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = boolean.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> deleteFollow(Authentication authentication, @RequestBody FollowReq followReq) {
        String requestUserId = authentication.getName();
        return ResponseEntity.ok(followService.deleteFollow(requestUserId, followReq.getResponseUserId()));
    }

    @Operation(summary = "팔로우 관계 조회", description = "유저의 모든 [팔로우 관계]를 조회한다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Follow.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> getAllFollows(Authentication authentication) {
        String requestUserId = authentication.getName();
        return ResponseEntity.ok(followService.getAllFollows(requestUserId));
    }
}
