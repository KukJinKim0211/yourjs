package com.project.yourjs.api.service;

import java.util.Collections;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mysql.cj.protocol.Security;
import com.project.yourjs.common.dto.UserDto;
import com.project.yourjs.common.exception.DuplicateMemberException;
import com.project.yourjs.common.exception.NotFoundMemberException;
import com.project.yourjs.common.util.SecurityUtil;
import com.project.yourjs.db.entity.Authority;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserDto signup(UserDto userDto) {
        if (userRepository.findOneWithAuthoritiesByUserId(userDto.getUserId()).orElse(null) != null) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }
        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();
        User user = User.builder()
                .userId(userDto.getUserId())
                .userName(userDto.getUserName())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .nickname(userDto.getNickname())
                .authorities(Collections.singleton(authority))
                .activated(true)
                .build();
        return UserDto.from(userRepository.save(user));
    }

    @Transactional(readOnly = true)
    public UserDto getUserWithAuthorities(String userId) {
        return UserDto.from(userRepository.findOneWithAuthoritiesByUserId(userId).orElse(null));
    }

    @Transactional(readOnly = true)
    public UserDto getMyUserWithAuthorities() {
        System.out.println(SecurityUtil.getCurrentUserId());
        return UserDto.from(
                SecurityUtil.getCurrentUserId()
                        .flatMap(userRepository::findOneWithAuthoritiesByUserId)
                        .orElseThrow(() -> new NotFoundMemberException("Member not found"))
        );
    }
}
