package com.project.yourjs.api.service;

import com.project.yourjs.api.req.ProjectPostReq;
import com.project.yourjs.api.req.ProjectUpdateReq;
import com.project.yourjs.db.entity.Project;
import com.project.yourjs.db.entity.User;

import java.util.List;

public interface ProjectService {
    List<Project> getAllProjects(String userId);

    Project createProject(String userId, ProjectPostReq projectPostReq);

    Project updateProject(String userId, ProjectUpdateReq projectUpdateReq);

    boolean deleteProject(String userId, Project project);
}
