package com.project.yourjs.api.req.Portfolio.Graduate;

import lombok.Getter;

import javax.persistence.Column;
import java.sql.Date;

@Getter
public class GraduatePostReq {

    private String schoolName;
    private String location;
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
