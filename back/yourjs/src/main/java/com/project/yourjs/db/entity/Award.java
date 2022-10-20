package com.project.yourjs.db.entity;

import lombok.Getter;
import lombok.Setter;
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
@Table(name = "award")
public class Award {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "award_seq")
    private Long awardSeq;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "award_name", nullable = false)
    private String awardName;

    @Column(name = "award_contents", nullable = false)
    private String awardContents;

    @Column(name = "award_institution", nullable = false)
    private String awardInstitution;

    @Column(name = "win_date", nullable = false)
    private Date winDate;

    @Column(name = "file_src")
    private String fileSrc;

    @CreationTimestamp
    @CreatedDate
    @Column(updatable = false,nullable = false)
    private LocalDateTime regDtm;

    @UpdateTimestamp
    @LastModifiedDate
    @Column
    private LocalDateTime modDtm;
}
