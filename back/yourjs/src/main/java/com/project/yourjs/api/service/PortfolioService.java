package com.project.yourjs.api.service;

import com.project.yourjs.api.req.PortfolioPostReq;
import com.project.yourjs.api.res.PortfolioRes;
import com.project.yourjs.db.entity.Portfolio;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.PortfolioRepository;
import com.project.yourjs.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;

    private Portfolio getPortfolio(Portfolio portfolio, String cnName, String engName, String techStacks, String links, String fileSrc) {
        portfolio.setCnName(cnName);
        portfolio.setEngName(engName);
        portfolio.setTechStacks(techStacks);
        portfolio.setLinks(links);
        portfolio.setFileSrc(fileSrc);
        portfolioRepository.save(portfolio);
        return portfolio;
    }

    @Transactional
    public PortfolioRes getPortfolio(String userId) {
        User user = userRepository.findByUserId(userId).get();
        return portfolioRepository.findByUser(user).toDto();
    }

    @Transactional
    public PortfolioRes createPortfolio(String userId, PortfolioPostReq portfolioPostReq) {
        Portfolio portfolio = new Portfolio();
        portfolio.setUser(userRepository.findByUserId(userId).get());
        getPortfolio(portfolio, portfolioPostReq.getCnName(), portfolioPostReq.getEngName(), portfolioPostReq.getTechStacks(), portfolioPostReq.getLinks(), portfolioPostReq.getFileSrc());
        return portfolio.toDto();
    }

    @Transactional
    public PortfolioRes updatePortfolio(String userId, PortfolioRes portfolioRes) {
        Portfolio portfolio = portfolioRepository.findById(portfolioRes.getPortfolioSeq()).get();
        if (userId.equals(portfolio.getUser().getUserId())) {
            getPortfolio(portfolio, portfolioRes.getCnName(), portfolioRes.getEngName(), portfolioRes.getTechStacks(), portfolioRes.getLinks(), portfolioRes.getFileSrc());
            return portfolio.toDto();
        }
        return null;
    }

    @Transactional
    public boolean deletePortfolio(String userId, Long portfolioSeq) {
        if (userId.equals(portfolioRepository.findById(portfolioSeq).get().getUser().getUserId())) {
            portfolioRepository.deleteById(portfolioSeq);
            return true;
        }
        return false;
    }
}
