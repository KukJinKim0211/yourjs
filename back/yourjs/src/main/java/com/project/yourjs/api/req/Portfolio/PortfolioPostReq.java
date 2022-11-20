package com.project.yourjs.api.req.Portfolio;

import lombok.Getter;

import javax.persistence.Column;

@Getter
public class PortfolioPostReq {

    private String cnName;
    private String engName;
    private String techStacks;
    private String links;
}
