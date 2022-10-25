package com.project.yourjs.api.controller;

import com.project.yourjs.api.req.NoticeReq;
import com.project.yourjs.api.req.ProjectPostReq;
import com.project.yourjs.api.req.ProjectUpdateReq;
import com.project.yourjs.api.res.NoticePostRes;
import com.project.yourjs.api.service.ProjectService;
import com.project.yourjs.common.auth.PUserDetails;
import com.project.yourjs.db.entity.Project;
import com.project.yourjs.db.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> createProject(Authentication authentication, @Valid @RequestBody ProjectPostReq projectPostReq){
        String userId = authentication.getName();
        Project project = projectService.createProject(userId, projectPostReq);
        return ResponseEntity.ok(project); //ResponseEntity.ok(NoticeService)
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<Project>> getAllProjects(Authentication authentication){
        List<Project> projects = projectService.getAllProjects(authentication.getName());
        return ResponseEntity.ok(projects); //ResponseEntity.ok(NoticeService)
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> updateProject(Authentication authentication, @Valid @RequestBody ProjectUpdateReq projectUpdateReq){
        String userId = authentication.getName();
        Project project = projectService.updateProject(userId, projectUpdateReq);
        return ResponseEntity.ok(project); //ResponseEntity.ok(NoticeService)
    }

    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> deleteProject(Authentication authentication, @Valid @RequestBody Project project){
        String userId = authentication.getName();
        boolean hasDeleted = projectService.deleteProject(userId, project);
        return ResponseEntity.ok(hasDeleted); //ResponseEntity.ok(NoticeService)
    }
}
