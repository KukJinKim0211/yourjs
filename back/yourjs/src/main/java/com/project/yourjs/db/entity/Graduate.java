package com.project.yourjs.db.entity;

import com.project.yourjs.api.res.Portfolio.Graduate.GraduateRes;
import com.project.yourjs.common.dto.AwardDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "graduate")
@NoArgsConstructor
public class Graduate {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "graduate_seq")
    private Long graduateSeq;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "school_name", nullable = false)
    private String schoolName;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "tot_avg_credit")
    private String totAvgCredit;

    @Column(name = "major_avg_credit")
    private String majorAvgCredit;

    @Column(name = "tot_credit")
    private String totCredit;

    @Column(name = "major_credit")
    private String majorCredit;

    @Column(name = "major_name")
    private String majorName;

    @Column(name = "doubl_major_name")
    private String doubleMajorName;

    @Column(name = "sub_major_name")
    private String subMajorName;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

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

    public GraduateRes toDto() {
         return new GraduateRes(
                 this.graduateSeq,
                 this.schoolName,
                 this.location,
                 this.totAvgCredit,
                 this.majorAvgCredit,
                 this.totCredit,
                 this.majorCredit,
                 this.majorName,
                 this.doubleMajorName,
                 this.subMajorName,
                 this.startDate,
                 this.endDate,
                 this.fileSrc
         );
    }

}
