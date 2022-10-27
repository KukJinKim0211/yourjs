package com.project.yourjs.api.controller;

import com.project.yourjs.api.req.EducationDeleteReq;
import com.project.yourjs.api.req.EducationPostReq;
import com.project.yourjs.api.res.EducationDeleteRes;
import com.project.yourjs.api.res.EducationPostRes;
import com.project.yourjs.api.res.EducationUpdateRes;
import com.project.yourjs.api.service.EducationService;
import com.project.yourjs.common.dto.EducationDto;
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

@Tag(name = "Education",description = "교육사항 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/education")
public class EducationController {

    private final EducationService educationService;

    @Operation(summary = "Get Educations", description = "교육사항 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = EducationDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<EducationDto>> getAllEducations(Authentication authentication){
        return ResponseEntity.ok(educationService.getAllEducations(authentication.getName()));
    }

    @Operation(summary = "Create Education", description = "교육사항 등록")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = EducationPostRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<EducationPostRes> createEducation(Authentication authentication, @Valid @RequestBody EducationPostReq educationPostReq){
        return ResponseEntity.ok(educationService.createEducation(authentication.getName(), educationPostReq));
    }

    @Operation(summary = "Update Education", description = "교육사항 수정")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = EducationUpdateRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PutMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<EducationUpdateRes> updateEducation(Authentication authentication, @Valid @RequestBody EducationDto educationDto){
        return ResponseEntity.ok(educationService.updateEducation(authentication.getName(), educationDto));
    }

    @Operation(summary = "Delete Education", description = "교육사항 삭제")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = EducationDeleteRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<EducationDeleteRes> deleteEducation(Authentication authentication, @Valid @RequestBody EducationDeleteReq educationDeleteReq){
        return ResponseEntity.ok(educationService.deleteEducation(authentication.getName(), educationDeleteReq));
    }
}
