package com.project.yourjs.api.service;

import com.project.yourjs.api.req.GraduatePostReq;
import com.project.yourjs.api.req.GraduateUpdateReq;
import com.project.yourjs.db.entity.Graduate;

import java.util.List;

public interface GraduateService {
    Graduate createGraduate(String userId, GraduatePostReq graduatePostReq);

    List<Graduate> getAllMilitaries(String name);

    Graduate updateGraduate(String userId, GraduateUpdateReq graduateUpdateReq);

    boolean deleteGraduate(String userId, Graduate graduate);
}
