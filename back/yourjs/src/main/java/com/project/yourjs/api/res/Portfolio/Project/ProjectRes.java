package com.project.yourjs.api.res.Portfolio.Project;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class ProjectRes {

    private Long projectSeq;
    private String projectName;
    private String tools;
    private String belongs;
    private Date startDate;
    private Date endDate;
    private String fileSrc;
    private String content;

    public ProjectRes(Long projectSeq, String projectName, String tools, String belongs, Date startDate, Date endDate, String fileSrc, String content) {
        this.projectSeq = projectSeq;
        this.projectName = projectName;
        this.tools = tools;
        this.belongs = belongs;
        this.startDate = startDate;
        this.endDate = endDate;
        this.fileSrc = fileSrc;
        this.content = content;
    }
}
