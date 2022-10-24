package com.project.yourjs.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.yourjs.db.entity.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
