package com.project.yourjs.db.entity;

import com.project.yourjs.api.res.ProjectRes;
import lombok.Getter;
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
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "project_seq")
    private Long projectSeq;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "project_name", nullable = false)
    private String projectName;

    @Column(name = "tools", nullable = false)
    private String tools;

    @Column(name = "belongs", nullable = false)
    private String belongs;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "file_src", nullable = true)
    private String fileSrc;

    @Column(name = "content", nullable = false)
    private String content;

    @CreationTimestamp
    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime regDtm;

    @UpdateTimestamp
    @LastModifiedDate
    @Column
    private LocalDateTime modDtm;

    public ProjectRes toDto() {
        return new ProjectRes(
                this.projectSeq,
                this.projectName,
                this.tools,
                this.belongs,
                this.startDate,
                this.endDate,
                this.fileSrc,
                this.content
        );
    }
}
