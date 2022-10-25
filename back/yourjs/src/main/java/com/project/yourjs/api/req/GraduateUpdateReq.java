package com.project.yourjs.api.req;

import lombok.Getter;

import java.sql.Date;

@Getter
public class GraduateUpdateReq {

    private Long graduateSeq;
    private String schoolName;
    private String location;
    private String degree;
    private boolean graduateStatus;
    private String totAvgCredit;
    private String majorAvgCredit;
    private String totCredit;
    private String majorCredit;
    private String majorName;
    private String doubleMajorName;
    private String subMajorName;
    private Date startDate;
    private Date endDate;
    private String fileSrc;
}
