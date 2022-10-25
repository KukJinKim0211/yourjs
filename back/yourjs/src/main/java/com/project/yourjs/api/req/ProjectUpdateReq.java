package com.project.yourjs.api.req;

import lombok.Getter;

import java.sql.Date;

@Getter
public class ProjectUpdateReq {

    private Long projectReq;
    private String projectName;
    private String tools;
    private String belongs;
    private Date startDate;
    private Date endDate;
    private String fileSrc;
}
