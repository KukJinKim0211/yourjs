package com.project.yourjs.api.req;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KakaoLoginReq {
    private String userNickname;
    private String userEmail;
    
}
