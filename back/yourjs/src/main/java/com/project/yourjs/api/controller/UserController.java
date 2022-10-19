package com.project.yourjs.api.controller;

import com.project.yourjs.api.req.UserRegisterPostReq;
import com.project.yourjs.api.service.UserService;
import com.project.yourjs.db.entity.User;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@Tag(name="User", description = "회원 API")
@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping
    public ResponseEntity<?> register(
            @RequestBody UserRegisterPostReq registerInfo) {
        String userId = registerInfo.getUserId();
        String nickname = registerInfo.getNickname();
        if (userService.checkIdDuplicated(userId) && userService.checkNicknameDuplicated(nickname)) {
            User user = userService.createUser(registerInfo);
            return new ResponseEntity<>(userId + "의 회원가입이 완료되었습니다", HttpStatus.valueOf(200));
        }
        return new ResponseEntity<>("잘못된 요청입니다", HttpStatus.valueOf(400));
    }

//    @GetMapping("check-id/{userId}")
//    public ResponseEntity<Boolean> checkId(@PathVariable("userId") String userId) {
//        return new ResponseEntity<Boolean>(userService.checkIdDuplicated(userId), HttpStatus.OK);
//    }
//
//    @GetMapping("check-nickname/{nickname}")
//    public ResponseEntity<Boolean> checkNickname(@PathVariable("nickname") String nickname) {
//        return new ResponseEntity<Boolean>(userService.checkNicknameDuplicated(nickname), HttpStatus.OK);
//    }


}
