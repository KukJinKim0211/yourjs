package com.project.yourjs.api.service;

import java.util.Collections;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.project.yourjs.api.req.UserRegisterPostReq;
import com.project.yourjs.api.res.RefreshAccessRes;
import com.project.yourjs.api.res.UserLoginRes;
import com.project.yourjs.common.dto.LoginDto;
import com.project.yourjs.common.dto.RefreshTokenDto;
import com.project.yourjs.common.dto.UserDto;
import com.project.yourjs.common.exception.DuplicateMemberException;
import com.project.yourjs.common.exception.NotFoundMemberException;
import com.project.yourjs.common.jwt.JwtFilter;
import com.project.yourjs.common.jwt.TokenProvider;
import com.project.yourjs.common.util.SecurityUtil;
import com.project.yourjs.db.entity.Authority;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenProvider tokenProvider,
            AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    @Transactional
    public UserDto signup(UserRegisterPostReq userRegisterPostReq) {
        if (userRepository.findOneWithAuthoritiesByUserId(userRegisterPostReq.getUserId()).orElse(null) != null) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }

        if (userRepository.findOneWithAuthoritiesByNickname(userRegisterPostReq.getNickname()).orElse(null) != null) {
            throw new DuplicateMemberException("이미 사용중인 닉네임 입니다.");
        }
        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();
        User user = User.builder()
                .userId(userRegisterPostReq.getUserId())
                .userName(userRegisterPostReq.getUserName())
                .password(passwordEncoder.encode(userRegisterPostReq.getPassword()))
                .nickname(userRegisterPostReq.getNickname())
                .authorities(Collections.singleton(authority))
                .activated(true)
                .build();
        return UserDto.from(userRepository.save(user));
    }

    @Transactional
    public ResponseEntity<UserLoginRes> login(LoginDto loginDto) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDto.getUserId(), loginDto.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.createToken(authentication);
        String refreshToken = tokenProvider.createRefreshToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + refreshToken);
        return new ResponseEntity<>(new UserLoginRes(jwt, refreshToken), httpHeaders, HttpStatus.OK);
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
                        .orElseThrow(() -> new NotFoundMemberException("Member not found")));
    }

    @Transactional
    public Boolean isDuplicatedUID(String userId) {
        if (userRepository.findOneWithAuthoritiesByUserId(userId).orElse(null) != null)
            return false;
        else
            return true;
    }

    @Transactional
    public Boolean isDuplicatedUNN(String nickname) {
        if (userRepository.findOneWithAuthoritiesByNickname(nickname).orElse(null) != null)
            return false;
        else
            return true;
    }

    @Transactional
    public String getAccessToken(RefreshTokenDto refreshToken) {
        String jwt = refreshToken.getRefreshToken();
        String tokenValid = tokenProvider.validateRefreshToken(jwt);
        System.out.println(tokenValid);
        if (tokenValid.equals("expired")) {
            System.out.println("refreshToken expired");
            return null;
        } else {
            if (StringUtils.hasText(jwt) && tokenValid.equals("valid")) {
                // accessToken 생성
                Authentication authentication = tokenProvider.getRefreshAuthentication(jwt);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                jwt = tokenProvider.createToken(authentication);
                return jwt;
            } else {
                System.out.println("refreshToken Not Valid");
            }
        }
        return null;
    }
}
