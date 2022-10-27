package com.project.yourjs.api.res;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class ProjectRes {

    private Long projectReq;
    private String projectName;
    private String tools;
    private String belongs;
    private Date startDate;
    private Date endDate;
    private String fileSrc;

    public ProjectRes(Long projectReq, String projectName, String tools, String belongs, Date startDate, Date endDate, String fileSrc) {
        this.projectReq = projectReq;
        this.projectName = projectName;
        this.tools = tools;
        this.belongs = belongs;
        this.startDate = startDate;
        this.endDate = endDate;
        this.fileSrc = fileSrc;
    }
}
