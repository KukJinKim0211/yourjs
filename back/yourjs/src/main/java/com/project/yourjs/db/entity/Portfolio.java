package com.project.yourjs.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.project.yourjs.api.res.Portfolio.PortfolioRes;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "portfolio")
@NoArgsConstructor
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "portfolio_seq")
    private Long portfolioSeq;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "cn_name")
    private String cnName;

    @Column(name = "eng_name")
    private String engName;

    @Column(name = "tech_stacks")
    private String techStacks;

    @Column(name = "links")
    private String links;

    @CreationTimestamp
    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime regDtm;

    @UpdateTimestamp
    @LastModifiedDate
    @Column
    private LocalDateTime modDtm;

    public PortfolioRes toDto() {
        return new PortfolioRes(
                this.portfolioSeq,
                this.cnName,
                this.engName,
                this.techStacks,
                this.links
        );
    }
}
