package com.project.yourjs.api.req;

import com.project.yourjs.db.entity.Education;
import lombok.Builder;
import lombok.Getter;

import java.sql.Date;

@Getter
@Builder
public class EducationPostReq {
    private String eduName;
    private String eduContents;
    private String eduInstitution;
    private Date startDate;
    private Date endDate;
    private Integer eduTime;

    public Education toEntity(){
        return Education.builder()
                .eduName(this.eduName)
                .eduContents(this.eduContents)
                .eduInstitution(this.eduInstitution)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .eduTime(this.eduTime)
                .build();
    }

}
