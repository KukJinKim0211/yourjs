package com.project.yourjs.api.controller;

import com.project.yourjs.api.req.MilitaryDeleteReq;
import com.project.yourjs.api.req.MilitaryPostReq;
import com.project.yourjs.api.res.MilitaryRes;
import com.project.yourjs.api.service.MilitaryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("military")
public class MilitaryController {

    private MilitaryService militaryService;


    @Operation(summary = "군복무사항 추가", description = "유저가 작성한 [군복무사항]을 저장한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = MilitaryRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> createMilitary(Authentication authentication, @Valid @RequestBody MilitaryPostReq militaryPostReq){
        String userId = authentication.getName();
        return ResponseEntity.ok(militaryService.createMilitary(userId, militaryPostReq));
    }


    @Operation(summary = "군복무사항 조회 ", description = "유저의 모든 [군복무사항]을 조회한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = MilitaryRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<MilitaryRes>> getAllMilitaries(Authentication authentication){
        String userId = authentication.getName();
        return ResponseEntity.ok(militaryService.getAllMilitaries(userId)); //ResponseEntity.ok(NoticeService)
    }


    @Operation(summary = "군복무사항 수정 ", description = "해당 엔티티의 [군복무사항]을 수정한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = MilitaryRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PutMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> updateMilitary(Authentication authentication, @Valid @RequestBody MilitaryRes militaryRes){
        String userId = authentication.getName();
        return ResponseEntity.ok(militaryService.updateMilitary(userId, militaryRes));
    }


    @Operation(summary = "군복무사항 조회 ", description = "해당 militarySeq 의 [군복무사항]을 삭제한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = MilitaryRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> deleteMilitary(Authentication authentication, @Valid @RequestBody MilitaryDeleteReq militaryDeleteReq){
        String userId = authentication.getName();
        boolean hasDeleted = militaryService.deleteMilitary(userId, militaryDeleteReq.getMilitarySeq());
        return ResponseEntity.ok(hasDeleted);
    }
}
