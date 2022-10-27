package com.project.yourjs.db.entity;

import com.project.yourjs.common.dto.CareerDto;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "career")
public class Career {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "career_seq")
    private Long careerSeq;

    @ManyToOne(fetch = LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String position;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(nullable = false)
    private Integer salary;

    @Column(name = "career_state", nullable = false)
    private Boolean careerState;

    @Column(name = "file_src")
    private String fileSrc;

    @CreationTimestamp
    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime regDtm;

    @UpdateTimestamp
    @LastModifiedDate
    @Column
    private LocalDateTime modDtm;

    public CareerDto toDto(){
        return CareerDto.builder()
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
