package com.project.yourjs.api.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.yourjs.api.req.NicknameDupleReq;
import com.project.yourjs.api.req.UserIdDupleReq;
import com.project.yourjs.api.req.UserRegisterPostReq;
import com.project.yourjs.api.res.RefreshAccessRes;
import com.project.yourjs.api.res.UserLoginRes;
import com.project.yourjs.api.service.UserService;
import com.project.yourjs.common.dto.LoginDto;
import com.project.yourjs.common.dto.RefreshTokenDto;
import com.project.yourjs.common.dto.TokenDto;
import com.project.yourjs.common.dto.UserDto;
import com.project.yourjs.common.jwt.JwtFilter;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@Tag(name = "User", description = "회원관리")
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // @PostMapping("/test-redirect")
    // public void testRedirect(HttpServletResponse response) throws IOException {
    // response.sendRedirect("/api/user");
    // }

    @Operation(summary = "회원 가입")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = UserDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping
    public ResponseEntity<UserDto> signup(
            @Valid @RequestBody UserRegisterPostReq userRegisterPostReq) {
        return ResponseEntity.ok(userService.signup(userRegisterPostReq));
    }

    @Operation(summary = "로그인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = TokenDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping("/login")
    public ResponseEntity<UserLoginRes> login(@Valid @RequestBody LoginDto loginDto) {
        return userService.login(loginDto);
    }

    @Operation(summary = "아이디 중복 확인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping("/duple/userid")
    public Boolean isDuplicatedUID(@RequestBody UserIdDupleReq userIdDupleReq) {
        return userService.isDuplicatedUID(userIdDupleReq.getUserId());
    }

    @Operation(summary = "닉네임 중복 확인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping("/duple/nickname")
    public Boolean isDuplicatedUNN(@RequestBody NicknameDupleReq nicknameDupleReq) {
        return userService.isDuplicatedUNN(nicknameDupleReq.getNickname());
    }

    @Operation(summary = "유저 권한 확인", description = "접속한 계정의 권한을 확인합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = UserDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping("/roles")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<UserDto> getMyUserInfo(HttpServletRequest request) {
        return ResponseEntity.ok(userService.getMyUserWithAuthorities());
    }

    @Operation(summary = "유저 권한 확인", description = "다른 유저의 권한을 확인합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = UserDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping("/roles/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UserDto> getUserInfo(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getUserWithAuthorities(userId));
    }

    @Operation(summary = "엑세스 토큰 재발급", description = "리프레쉬 토큰을 이용하여 엑세스 토큰을 재발급 합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = RefreshAccessRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping("/refresh")
    public ResponseEntity<RefreshAccessRes> getAccessToken(HttpServletResponse response,
            @RequestHeader HttpHeaders headers) throws IOException {
        RefreshTokenDto refreshToken = new RefreshTokenDto();
        refreshToken.setRefreshToken(headers.get("authorization").get(0).split(" ")[1]);
        RefreshAccessRes refreshAccessRes = new RefreshAccessRes();
        String jwt = userService.getAccessToken(refreshToken);
        HttpHeaders httpHeaders = new HttpHeaders();
        if (jwt != null) {
            refreshAccessRes.setAccessToken(jwt);
            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        } else
            response.sendRedirect("/api/user");

        return new ResponseEntity<>(refreshAccessRes, httpHeaders, HttpStatus.OK);
    }
}
