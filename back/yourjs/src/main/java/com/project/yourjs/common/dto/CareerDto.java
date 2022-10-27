package com.project.yourjs.common.dto;

import com.project.yourjs.db.entity.Career;
import lombok.*;

import java.sql.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CareerDto {
    private Long careerSeq;
    private String company;
    private String department;
    private String position;
    private Date startDate;
    private Date endDate;
    private Integer salary;
    private Boolean careerState;

    public Career toEntity(){
        return Career.builder()
                .careerSeq(this.careerSeq)
                .company(this.company)
                .department(this.department)
                .position(this.position)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .salary(this.salary)
                .careerState(this.careerState)
                .build();

    }
}
