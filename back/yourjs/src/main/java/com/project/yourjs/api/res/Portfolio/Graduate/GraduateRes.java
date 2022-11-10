package com.project.yourjs.api.res.Portfolio.Graduate;

import com.project.yourjs.db.entity.Award;
import com.project.yourjs.db.entity.Graduate;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class GraduateRes {

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

    public GraduateRes(Long graduateSeq, String schoolName, String location, String totAvgCredit, String majorAvgCredit, String totCredit, String majorCredit, String majorName, String doubleMajorName, String subMajorName, Date startDate, Date endDate, String fileSrc) {
        this.graduateSeq = graduateSeq;
        this.schoolName = schoolName;
        this.location = location;
        this.totAvgCredit = totAvgCredit;
        this.majorAvgCredit = majorAvgCredit;
        this.totCredit = totCredit;
        this.majorCredit = majorCredit;
        this.majorName = majorName;
        this.doubleMajorName = doubleMajorName;
        this.subMajorName = subMajorName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.fileSrc = fileSrc;
    }
}
