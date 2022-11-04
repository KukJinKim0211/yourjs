package com.project.yourjs.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "intro_tag")
public class IntroTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "intro_tag_seq")
    private Integer introTagSeq;

    @JsonBackReference
    @ManyToOne(targetEntity = Self_Intro.class)
    @JoinColumn(name = "intro_seq")
    Self_Intro self_Intro;

    @Column(name = "intro_tag_name")
    String introTagName;
}
