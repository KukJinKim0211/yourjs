package com.project.yourjs.db.entity;


import com.project.yourjs.common.dto.EducationDto;
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
@Table(name = "education")
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "edu_seq")
    private Long eduSeq;

    @ManyToOne(fetch = LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "edu_name",nullable = false)
    private String eduName;

    @Column(name = "edu_contents",nullable = false)
    private String eduContents;

    @Column(name = "edu_institution",nullable = false)
    private String eduInstitution;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "edu_time",nullable = false)
    private Integer eduTime;

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

    public EducationDto toDto(){
        return EducationDto.builder()
                .eduSeq(this.eduSeq)
                .eduName(this.eduName)
                .eduContents(this.eduContents)
                .eduInstitution(this.eduInstitution)
                .eduTime(this.eduTime)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .build();
    }

}
