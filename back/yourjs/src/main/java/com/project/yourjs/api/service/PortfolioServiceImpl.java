package com.project.yourjs.api.service;

import com.project.yourjs.api.req.PortfolioPostReq;
import com.project.yourjs.api.req.PortfolioUpdateReq;
import com.project.yourjs.db.entity.Portfolio;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.PortfolioRepository;
import com.project.yourjs.db.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;

@Service
@RequiredArgsConstructor
public class PortfolioServiceImpl implements PortfolioService{

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

    @Override
    public Portfolio getPortfolio(String userId) {
        User user = userRepository.findByUserId(userId).get();
        return portfolioRepository.findByUser(user);
    }

    @Override
    public Portfolio createPortfolio(String userId, PortfolioPostReq portfolioPostReq) {
        Portfolio portfolio = new Portfolio();
        portfolio.setUser(userRepository.findByUserId(userId).get());
        return getPortfolio(portfolio, portfolioPostReq.getCnName(), portfolioPostReq.getEngName(), portfolioPostReq.getTechStacks(), portfolioPostReq.getLinks(), portfolioPostReq.getFileSrc());
    }

    @Override
    public Portfolio updatePortfolio(String userId, PortfolioUpdateReq portfolioUpdateReq) {
        Portfolio portfolio = portfolioRepository.findById(portfolioUpdateReq.getPortfolioSeq()).get();
        return getPortfolio(portfolio, portfolioUpdateReq.getCnName(), portfolioUpdateReq.getEngName(), portfolioUpdateReq.getTechStacks(), portfolioUpdateReq.getLinks(), portfolioUpdateReq.getFileSrc());
    }

    @Override
    public boolean deletePortfolio(String userId, Portfolio portfolio) {
        if (userId.equals(portfolio.getUser().getUserId())) {
            portfolioRepository.deleteById(portfolio.getPortfolioSeq());
            return true;
        }
        return false;
    }
}
