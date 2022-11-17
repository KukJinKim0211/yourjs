package com.project.yourjs.api.req.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PassChangeReq {
    private String curPassword;
    private String newPassword;
}
