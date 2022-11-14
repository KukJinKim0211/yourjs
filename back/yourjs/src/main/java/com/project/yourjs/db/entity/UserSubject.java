package com.project.yourjs.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "user_subject")
public class UserSubject {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_subject_seq")
    private Long userSubjectSeq;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_seq")
    private User user;

    @ManyToOne(targetEntity = Subject.class)
    @JoinColumn(name = "subject_seq")
    private Subject subject;


}
