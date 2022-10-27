package com.project.yourjs.common.dto;

import com.project.yourjs.db.entity.Education;
import lombok.*;

import java.sql.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EducationDto {
    private Long eduSeq;
    private String eduName;
    private String eduContents;
    private String eduInstitution;
    private Date startDate;
    private Date endDate;
    private Integer eduTime;
    private Boolean completionState;

    public Education toEntity(){
        return Education.builder()
                .eduSeq(this.eduSeq)
                .eduName(this.eduName)
                .eduContents(this.eduContents)
                .eduInstitution(this.eduInstitution)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .eduTime(this.eduTime)
                .completionState(this.completionState)
                .build();
    }

}
