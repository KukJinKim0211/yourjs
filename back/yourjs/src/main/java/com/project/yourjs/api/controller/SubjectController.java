package com.project.yourjs.api.controller;

import com.project.yourjs.api.req.Portfolio.Project.ProjectPostReq;
import com.project.yourjs.api.req.User.UserSubjectPostReq;
import com.project.yourjs.api.service.SubjectService;
import com.project.yourjs.api.service.UserService;
import com.project.yourjs.api.service.UserSubjectService;
import com.project.yourjs.db.entity.Project;
import com.project.yourjs.db.entity.Subject;
import com.project.yourjs.db.entity.UserSubject;
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

@Tag(name = "Subject",description = "구직포지션 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("subject")
public class SubjectController {

    private final SubjectService subjectService;
    private final UserSubjectService userSubjectService;
    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<Subject>> getAllSubjects(){
        List<Subject> subjects = subjectService.getAllSubjects();
        return ResponseEntity.ok(subjects);
    }

    @Operation(summary = "유저 관심포지션 조회", description = "해당 유저의 [관심포지션]을 조회한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = UserSubject.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> getAllUserSubject(Authentication authentication) {
        String userId = authentication.getName();
        return ResponseEntity.ok(userSubjectService.getAllUserSubjects(userId));
    }

    @Operation(summary = "유저 관심포지션 등록", description = "해당 유저의 [관심포지션]을 등록한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = UserSubject.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping("/user")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> postUserSubjects(Authentication authentication, @RequestBody UserSubjectPostReq userSubjectPostReq) {
        String userId = authentication.getName();
        return ResponseEntity.ok(userSubjectService.postUserSubjects(userId, userSubjectPostReq));
    }
}
