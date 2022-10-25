package com.project.yourjs.db.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "portfolio")
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "portfolio_seq")
    private Long portfolioSeq;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "cn_name", nullable = true)
    private String cnName;

    @Column(name = "eng_name", nullable = false)
    private String engName;

    @Column(name = "tech_stacks", nullable = false)
    private String techStacks;

    @Column(name = "links", nullable = true)
    private String links;

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
}
