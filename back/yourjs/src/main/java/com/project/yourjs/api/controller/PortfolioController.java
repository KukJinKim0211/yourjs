package com.project.yourjs.api.controller;

import com.project.yourjs.api.req.PortfolioPostReq;
import com.project.yourjs.api.req.PortfolioUpdateReq;
import com.project.yourjs.api.req.ProjectPostReq;
import com.project.yourjs.api.service.PortfolioService;
import com.project.yourjs.db.entity.Portfolio;
import com.project.yourjs.db.entity.Project;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("portfolio")
public class PortfolioController {

    private PortfolioService portfolioService;

    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> createPortfolio(Authentication authentication, @Valid @RequestBody PortfolioPostReq portfolioPostReq){
        String userId = authentication.getName();
        Portfolio portfolio = portfolioService.createPortfolio(userId, portfolioPostReq);
        return ResponseEntity.ok(portfolio); //ResponseEntity.ok(NoticeService)
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> getPortfolio(Authentication authentication){
        Portfolio portfolio = portfolioService.getPortfolio(authentication.getName());
        return ResponseEntity.ok(portfolio); //ResponseEntity.ok(NoticeService)
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> updatePortfolio(Authentication authentication, @Valid @RequestBody PortfolioUpdateReq portfolioUpdateReq){
        String userId = authentication.getName();
        Portfolio portfolio = portfolioService.updatePortfolio(userId, portfolioUpdateReq);
        return ResponseEntity.ok(portfolio); //ResponseEntity.ok(NoticeService)
    }

    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> deletePortfolio(Authentication authentication, @Valid @RequestBody Portfolio portfolio){
        String userId = authentication.getName();
        boolean hasDeleted = portfolioService.deletePortfolio(userId, portfolio);
        return ResponseEntity.ok(hasDeleted); //ResponseEntity.ok(NoticeService)
    }
}
