package com.project.yourjs.db.repository;

import com.project.yourjs.db.entity.Certificate;
import com.project.yourjs.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {
    List<Certificate> findAllByUser(User user);
}
