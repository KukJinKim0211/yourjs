package com.project.yourjs.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.yourjs.db.entity.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long>{
}
