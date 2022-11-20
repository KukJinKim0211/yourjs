package com.project.yourjs.api.res.Portfolio;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PortfolioRes {

    private Long portfolioSeq;
    private String cnName;
    private String engName;
    private String techStacks;
    private String links;

    public PortfolioRes(Long portfolioSeq, String cnName, String engName, String techStacks, String links) {
        this.portfolioSeq = portfolioSeq;
        this.cnName = cnName;
        this.engName = engName;
        this.techStacks = techStacks;
        this.links = links;
    }
}
