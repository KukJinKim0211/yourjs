package com.project.yourjs.api.controller;

import com.project.yourjs.api.req.Portfolio.Graduate.GraduateDeleteReq;
import com.project.yourjs.api.req.Portfolio.Graduate.GraduatePostReq;
import com.project.yourjs.api.res.Portfolio.Graduate.GraduateRes;
import com.project.yourjs.api.service.GraduateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("graduate")
@Tag(name = "Graduation",description = "학력사항 API")
public class GraduateController {

    private GraduateService graduateService;

    @Operation(summary = "학력사항 추가", description = "유저가 작성한 [학력사항]을 저장한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = GraduateRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> createGraduate(Authentication authentication, @Valid @RequestBody GraduatePostReq graduatePostReq){
        String userId = authentication.getName();
        return ResponseEntity.ok(graduateService.createGraduate(userId, graduatePostReq));
    }


    @Operation(summary = "학력사항 조회 ", description = "유저의 모든 [학력사항]을 조회한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = GraduateRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<GraduateRes>> getAllGraduates(Authentication authentication) {
        String userId = authentication.getName();
        return ResponseEntity.ok(graduateService.getAllGraduates(userId));
    }


    @Operation(summary = "학력사항 수정 ", description = "해당 엔티티의 [학력사항]을 수정한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = GraduateRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PutMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> updateGraduate(Authentication authentication, @Valid @RequestBody GraduateRes graduateRes){
        String userId = authentication.getName();
        return ResponseEntity.ok(graduateService.updateGraduate(userId, graduateRes));
    }


    @Operation(summary = "학력사항 삭제 ", description = "해당 graduateSeq 의 [학력사항]을 삭제한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = GraduateRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> deleteGraduate(Authentication authentication, @Valid @RequestBody GraduateDeleteReq graduateDeleteReqSeq){
        String userId = authentication.getName();
        boolean hasDeleted = graduateService.deleteGraduate(userId, graduateDeleteReqSeq.getGraduateSeq());
        return ResponseEntity.ok(hasDeleted);
    }

}
