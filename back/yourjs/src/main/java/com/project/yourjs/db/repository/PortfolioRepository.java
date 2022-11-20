package com.project.yourjs.db.repository;

import com.project.yourjs.db.entity.Portfolio;
import com.project.yourjs.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    Portfolio findByUser(User user);
}
