package com.project.yourjs.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "subject")
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_seq")
    private Long subjectSeq;

    @Column(name = "subject_name", nullable = false)
    private String subjectName;

}
