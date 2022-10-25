package com.project.yourjs.api.service;

import com.project.yourjs.api.req.MilitaryPostReq;
import com.project.yourjs.api.req.MilitaryUpdateReq;
import com.project.yourjs.db.entity.Military;

import java.util.List;

public interface MilitaryService {
    Military createMilitary(String userId, MilitaryPostReq militaryPostReq);

    List<Military> getAllMilitaries(String userId);

    Military updateMilitary(String userId, MilitaryUpdateReq militaryUpdateReq);

    boolean deleteMilitary(String userId, Military military);
}
