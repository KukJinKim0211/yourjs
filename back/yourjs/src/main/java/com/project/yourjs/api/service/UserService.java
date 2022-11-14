package com.project.yourjs.api.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collections;
import java.util.HashMap;
import java.util.Optional;

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

import com.project.yourjs.api.req.User.ChangeUserInfoReq;
import com.project.yourjs.api.req.User.ChangeUserLevelReq;
import com.project.yourjs.api.req.User.PassChangeReq;
import com.project.yourjs.api.req.User.UserRegisterPostReq;
import com.project.yourjs.api.res.User.PassChangeRes;
import com.project.yourjs.api.res.User.UserDetailInfoRes;
import com.project.yourjs.api.res.User.UserLoginRes;
import com.project.yourjs.api.res.User.UserSimpleInfoRes;
import com.project.yourjs.common.dto.LoginDto;
import com.project.yourjs.common.dto.RefreshTokenDto;
import com.project.yourjs.common.dto.UserDto;
import com.project.yourjs.common.exception.DuplicateMemberException;
import com.project.yourjs.common.exception.NotFoundMemberException;
import com.project.yourjs.common.jwt.JwtFilter;
import com.project.yourjs.common.jwt.TokenProvider;
import com.project.yourjs.common.util.SecurityUtil;
import com.project.yourjs.db.entity.Authority;
import com.project.yourjs.db.entity.Portfolio;
import com.project.yourjs.db.entity.User;
import com.project.yourjs.db.repository.PortfolioRepository;
import com.project.yourjs.db.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final PortfolioRepository portfolioRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenProvider tokenProvider,
            AuthenticationManagerBuilder authenticationManagerBuilder, PortfolioRepository portfolioRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.portfolioRepository = portfolioRepository;
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
        Portfolio portfolio = new Portfolio();
        portfolio.setUser(user);
        portfolioRepository.save(portfolio);
        return UserDto.from(userRepository.save(user));
    }

    // @Transactional
    public ResponseEntity<UserLoginRes> login(LoginDto loginDto) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDto.getUserId(), loginDto.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Optional<User> oUser = userRepository.findByUserId(loginDto.getUserId());
        User user = new User();
        if (oUser.isPresent()) {
            user = oUser.get();
        }

        String jwt = tokenProvider.createToken(authentication);
        String refreshToken = tokenProvider.createRefreshToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + refreshToken);
        return new ResponseEntity<>(new UserLoginRes(jwt, refreshToken, user.getNickname(), user.getInfoLevel()),
                httpHeaders, HttpStatus.OK);
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

    @Transactional
    public UserSimpleInfoRes getSimpleInfo(String userId) {
        UserSimpleInfoRes userSimpleInfoRes = new UserSimpleInfoRes();
        Optional<User> oUser = userRepository.findByUserId(userId);
        User user = new User();
        if (oUser.isPresent()) {
            user = oUser.get();
            userSimpleInfoRes.setNickname(user.getNickname());
            userSimpleInfoRes.setInfoLevel(user.getInfoLevel());
        }
        return userSimpleInfoRes;
    }

    @Transactional
    public UserDetailInfoRes getDetailInfo(String userId) {
        UserDetailInfoRes userDetailInfoRes = new UserDetailInfoRes();
        Optional<User> oUser = userRepository.findByUserId(userId);
        User user = new User();
        if (oUser.isPresent()) {
            user = oUser.get();
            userDetailInfoRes.setUserName(user.getUserName());
            userDetailInfoRes.setEmail(user.getEmail());
            userDetailInfoRes.setNickname(user.getNickname());
            userDetailInfoRes.setInfoLevel(user.getInfoLevel());
            userDetailInfoRes.setUserImg(user.getUserImg());
        }
        return userDetailInfoRes;
    }

    @Transactional
    public PassChangeRes passwordChange(String userId, PassChangeReq passChangeReq) {
        PassChangeRes passChangeRes = new PassChangeRes();
        passChangeRes.setType("fail");
        Optional<User> oUser = userRepository.findByUserId(userId);
        if (oUser.isPresent()) {
            User user = oUser.get();
            if (passwordEncoder.matches(passChangeReq.getCurPassword(), user.getPassword())) {
                user.setPassword(passwordEncoder.encode(passChangeReq.getNewPassword()));
                userRepository.save(user);
                passChangeRes.setType("success");
            }
        }
        return passChangeRes;
    }

    @Transactional
    public void changeUserInfo(String userId, ChangeUserInfoReq changeUserInfoReq) {
        Optional<User> oUser = userRepository.findByUserId(userId);
        if (oUser.isPresent()) {
            User user = oUser.get();
            user.setEmail(changeUserInfoReq.getEmail());
            user.setNickname(changeUserInfoReq.getNickname());
            user.setUserImg(changeUserInfoReq.getUserImg());
            userRepository.save(user);
        }
    }

    @Transactional
    public void changeUserLevel(String userId, ChangeUserLevelReq changeUserLevelReq) {
        Optional<User> oUser = userRepository.findByUserId(userId);
        if (oUser.isPresent()) {
            User user = oUser.get();
            user.setInfoLevel(changeUserLevelReq.getType());
            userRepository.save(user);
        }
    }

    @Transactional
    public void deleteUser(String userId) {
        userRepository.deleteByUserId(userId);
    }

    @Transactional
    public ResponseEntity<UserLoginRes> kakaoLogin(String code) {
        ResponseEntity<UserLoginRes> userLoginRes;
        String accessToken = "";
        String refreshToken = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=fb0ecb04816f465587d8bf341bacac7a");
            // sb.append("&redirect_uri=https://yourjs.co.kr/login/kakao");
            sb.append("&redirect_uri=http://localhost:3000/login/kakao");
            sb.append("&code=" + code);
            sb.append("&client_secret=OIvUN78Uyo8YNKFJ0jlAetvEqmEyMkaL");
            bw.write(sb.toString());
            bw.flush();

            int responseCode = conn.getResponseCode();
            // System.out.println("responseCode : " + responseCode);
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            // System.out.println("response body : " + result);

            accessToken = result.substring(result.indexOf("access_token\":") + 15, result.indexOf("\",\"token_type"));

            br.close();
            bw.close();

            HashMap<String, Object> userInfo = new HashMap<>();
            reqURL = "https://kapi.kakao.com/v2/user/me";
            try {
                url = new URL(reqURL);
                conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("charset", "utf-8");

                // 요청에 필요한 Header에 포함될 내용
                conn.setRequestProperty("Authorization", "Bearer " + accessToken);

                responseCode = conn.getResponseCode();
                // System.out.println("responseCode : " + responseCode);

                br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));

                line = "";
                result = "";

                while ((line = br.readLine()) != null) {
                    result += line;
                }
                System.out.println("response body : " + result);

                String userId = result.substring(result.indexOf("id\":") + 4, result.indexOf(",\"connected_at"));
                String nickname = result.substring(result.indexOf("\"properties\":{\"nickname\":\"") + 26,
                        result.indexOf("\",\"profile"));
                String userName = "kakao" + nickname;
                Optional<User> oUser = userRepository.findByUserId(userId);
                if (oUser.isPresent()) {
                    User user = oUser.get();
                    // 액세스 토큰 생성
                    userLoginRes = this.login(new LoginDto(user.getUserId(), "kakao"));
                    return userLoginRes;

                } else {
                    // 회원 가입 후 액세스 토큰 생성
                    System.out.println("sfsdfsdf");
                    UserRegisterPostReq userRegisterPostReq = new UserRegisterPostReq();
                    userRegisterPostReq.setUserId(userId);
                    userRegisterPostReq.setNickname(nickname);
                    userRegisterPostReq.setUserName(userName);
                    userRegisterPostReq.setPassword("kakao");

                    UserDto userDto = this.signup(userRegisterPostReq);
                    // 액세스 토큰 생성
                    userLoginRes = this.login(new LoginDto(userDto.getUserId(), "kakao"));
                    return userLoginRes;
                }

            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        // System.out.println(userLoginRes.getBody().getAccessToken());

        return null;
    }

    @Transactional
    public ResponseEntity<UserLoginRes> naverLogin(String code) {
        System.out.println(code);
        return null;
    }
}
