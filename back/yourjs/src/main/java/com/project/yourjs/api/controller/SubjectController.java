package com.project.yourjs.api.controller;

import com.project.yourjs.api.req.Portfolio.Subject.SubjectSeqReq;
import com.project.yourjs.api.req.Portfolio.Subject.UserSubjectPostReq;
import com.project.yourjs.api.res.Portfolio.Subject.SubjectUserRes;
import com.project.yourjs.api.service.SubjectService;
import com.project.yourjs.api.service.UserService;
import com.project.yourjs.api.service.UserSubjectService;
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

import java.util.List;

@Tag(name = "Subject",description = "구직포지션 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("subject")
public class SubjectController {

    private final SubjectService subjectService;
    private final UserSubjectService userSubjectService;
    private final UserService userService;

    @Operation(summary = "DB의 모든 포지션 조회", description = "DB에 등록된 모든 [포지션]을 조회한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = UserSubject.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
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
        String subjectName = userSubjectPostReq.getSubjectsStr();
        return ResponseEntity.ok(userSubjectService.postUserSubjects(userId, subjectName));
    }


    @Operation(summary = "관심포지션 겹치는 유저 조회", description = "해당 유저의 관심포지션과 동일한 모든 유저를 조회한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = SubjectUserRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping("/position")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<SubjectUserRes>> getAllSubjectUsers(Authentication authentication){
        String userId = authentication.getName();
        List<SubjectUserRes> users = subjectService.getAllSubjectUsers(userId);
        return ResponseEntity.ok(users);
    }
}
