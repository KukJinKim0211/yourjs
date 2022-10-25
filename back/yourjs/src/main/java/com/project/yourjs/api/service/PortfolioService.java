package com.project.yourjs.api.service;

import com.project.yourjs.api.req.PortfolioPostReq;
import com.project.yourjs.api.req.PortfolioUpdateReq;
import com.project.yourjs.db.entity.Portfolio;

import javax.validation.Valid;

public interface PortfolioService {

    Portfolio createPortfolio(String userId, PortfolioPostReq portfolioPostReq);
    Portfolio getPortfolio(String name);
    Portfolio updatePortfolio(String userId, @Valid PortfolioUpdateReq updatedPortfolio);
    boolean deletePortfolio(String userId, Portfolio portfolio);

}
