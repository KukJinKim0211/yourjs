package com.project.yourjs.api.req;

import lombok.Getter;

@Getter
public class PortfolioUpdateReq {

    private Long portfolioSeq;
    private String cnName;
    private String engName;
    private String techStacks;
    private String links;
    private String fileSrc;
}
