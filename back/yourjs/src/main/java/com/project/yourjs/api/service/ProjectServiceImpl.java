package com.project.yourjs.api.service;

import com.project.yourjs.api.req.ProjectPostReq;
import com.project.yourjs.api.req.ProjectUpdateReq;
import com.project.yourjs.db.entity.Project;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.ProjectRepository;
import com.project.yourjs.db.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    private Project getProject(Project project, String projectName, String tools, String belongs, Date startDate, Date endDate, String fileSrc) {
        project.setProjectName(projectName);
        project.setTools(tools);
        project.setBelongs(belongs);
        project.setStartDate(startDate);
        project.setEndDate(endDate);
        project.setFileSrc(fileSrc);
        return projectRepository.save(project);
    }

    @Override
    public List<Project> getAllProjects(String userId) {
        User user = userRepository.findByUserId(userId).get();
        return projectRepository.findAllByUser(user);
    }

    @Override
    public Project createProject(String userId, ProjectPostReq projectPostReq) {
        Project project = new Project();
        project.setUser(userRepository.findByUserId(userId).get());
        return getProject(project, projectPostReq.getProjectName(), projectPostReq.getTools(), projectPostReq.getBelongs(), projectPostReq.getStartDate(), projectPostReq.getEndDate(), projectPostReq.getFileSrc());
    }

    @Override
    public Project updateProject(String userId, ProjectUpdateReq projectUpdateReq) {
        Project project = projectRepository.findById(projectUpdateReq.getProjectReq()).get();
        return getProject(project, projectUpdateReq.getProjectName(), projectUpdateReq.getTools(), projectUpdateReq.getBelongs(), projectUpdateReq.getStartDate(), projectUpdateReq.getEndDate(), projectUpdateReq.getFileSrc());
    }

    @Override
    public boolean deleteProject(String userId, Project project) {
        if (userId.equals(project.getUser().getUserId())) {
            projectRepository.deleteById(project.getProjectSeq());
            return true;
        }
        return false;
    }
}
