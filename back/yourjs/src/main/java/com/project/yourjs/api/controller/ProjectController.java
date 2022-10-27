package com.project.yourjs.api.controller;

import com.project.yourjs.api.req.ProjectDeleteReq;
import com.project.yourjs.api.req.ProjectPostReq;
import com.project.yourjs.api.res.ProjectRes;
import com.project.yourjs.api.service.ProjectService;
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
@RequestMapping("project")
public class ProjectController {

    private ProjectService projectService;


    @Operation(summary = "프로젝트경험 추가", description = "유저가 작성한 [프로젝트경험]을 저장한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ProjectRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> createProject(Authentication authentication, @Valid @RequestBody ProjectPostReq projectPostReq){
        String userId = authentication.getName();
        return ResponseEntity.ok(projectService.createProject(userId, projectPostReq));
    }


    @Operation(summary = "프로젝트경험 조회 ", description = "유저의 모든 [프로젝트경험]을 조회한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ProjectRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<ProjectRes>> getAllProjects(Authentication authentication){
        String userId = authentication.getName();
        return ResponseEntity.ok(projectService.getAllProjects(userId));
    }


    @Operation(summary = "프로젝트경험 수정 ", description = "해당 엔티티의 [프로젝트경험]을 수정한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ProjectRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PutMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> updateProject(Authentication authentication, @Valid @RequestBody ProjectRes projectRes){
        String userId = authentication.getName();
        return ResponseEntity.ok(projectService.updateProject(userId, projectRes));
    }


    @Operation(summary = "프로젝트경험 삭제 ", description = "해당 projectSeq 의 [프로젝트경험]을 수정한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ProjectRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> deleteProject(Authentication authentication, @Valid @RequestBody ProjectDeleteReq projectDeleteReq){
        String userId = authentication.getName();
        System.out.println(userId);
        boolean hasDeleted = projectService.deleteProject(userId, projectDeleteReq.getProjectSeq());
        System.out.println(hasDeleted);
        return ResponseEntity.ok(hasDeleted);
    }
}
