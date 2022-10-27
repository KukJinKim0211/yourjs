package com.project.yourjs.api.res;

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
    private String fileSrc;

    public PortfolioRes(Long portfolioSeq, String cnName, String engName, String techStacks, String links, String fileSrc) {
    }
}
