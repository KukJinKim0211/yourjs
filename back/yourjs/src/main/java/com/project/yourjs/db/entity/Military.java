package com.project.yourjs.db.entity;

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
@Table(name = "military")
@NoArgsConstructor
public class Military {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "military_seq")
    private Long militarySeq;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "military_type", nullable = false)
    private String militaryType;

    @Column(name = "speciality_type", nullable = false)
    private String specialityType;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "file_src", nullable = true)
    private String fileSrc;

    @CreationTimestamp
    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime regDtm;

    @UpdateTimestamp
    @LastModifiedDate
    @Column
    private LocalDateTime modDtm;

    public Military(User user, String militaryType, String specialityType, Date startDate, Date endDate, String fileSrc) {
        this.user = user;
        this.militaryType = militaryType;
        this.specialityType = specialityType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.fileSrc = fileSrc;
    }
}
