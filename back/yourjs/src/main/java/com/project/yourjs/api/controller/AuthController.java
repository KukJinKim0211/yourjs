package com.project.yourjs.api.controller;

import com.project.yourjs.api.req.UserLoginPostReq;
import com.project.yourjs.api.res.UserLoginPostRes;
import com.project.yourjs.api.service.UserService;
import com.project.yourjs.common.util.JwtTokenUtil;
import com.project.yourjs.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("login")
    public ResponseEntity<UserLoginPostRes> login(@RequestBody UserLoginPostReq loginInfo) {
        String userId = loginInfo.getUserId();
        String password = loginInfo.getPassword();

        User user = userService.getUserByUserId(userId);
        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if(passwordEncoder.matches(password, user.getPassword())) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(userId), user));
        }
        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
        return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null, null));
    }
}

