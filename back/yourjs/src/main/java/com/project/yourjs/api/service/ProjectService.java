package com.project.yourjs.api.service;

import com.project.yourjs.api.req.Portfolio.Project.ProjectPostReq;
import com.project.yourjs.api.res.Portfolio.Project.ProjectRes;
import com.project.yourjs.db.entity.Project;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.ProjectRepository;
import com.project.yourjs.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    private Project getProject(Project project, String projectName, String tools, String belongs, Date startDate, Date endDate, String fileSrc, String content) {
        project.setProjectName(projectName);
        project.setTools(tools);
        project.setBelongs(belongs);
        project.setStartDate(startDate);
        project.setEndDate(endDate);
        project.setFileSrc(fileSrc);
        project.setContent(content);
        return projectRepository.save(project);
    }

    @Transactional
    public List<ProjectRes> getAllProjects(String userId) {
        User user = userRepository.findByUserId(userId).get();
        List<Project> projects = projectRepository.findAllByUser(user);
        List<ProjectRes> resList = new ArrayList<>();
        for (int i = 0; i < projects.size(); i++) {
            resList.add(projects.get(i).toDto());
        }
        return resList;
    }

    @Transactional
    public ProjectRes createProject(String userId, ProjectPostReq projectPostReq) {
        Project project = new Project();
        project.setUser(userRepository.findByUserId(userId).get());
        getProject(project, projectPostReq.getProjectName(), projectPostReq.getTools(), projectPostReq.getBelongs(), projectPostReq.getStartDate(), projectPostReq.getEndDate(), projectPostReq.getFileSrc(), projectPostReq.getContent());
        return project.toDto();
    }

    @Transactional
    public ProjectRes updateProject(String userId, ProjectRes projectRes) {
        Project project = projectRepository.findById(projectRes.getProjectSeq()).get();
        if (userId.equals(project.getUser().getUserId())) {
            getProject(project, projectRes.getProjectName(), projectRes.getTools(), projectRes.getBelongs(), projectRes.getStartDate(), projectRes.getEndDate(), projectRes.getFileSrc(), projectRes.getContent());
            return project.toDto();
        }
        return null;
    }

    @Transactional
    public boolean deleteProject(String userId, @Valid Long projectSeq) {
        if (userId.equals(projectRepository.findById(projectSeq).get().getUser().getUserId())) {
            projectRepository.deleteById(projectSeq);
            return true;
        }
        return false;
    }
}
