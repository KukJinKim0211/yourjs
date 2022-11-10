package com.project.yourjs.api.controller;

import com.project.yourjs.api.req.Portfolio.Career.CareerDeleteReq;
import com.project.yourjs.api.req.Portfolio.Career.CareerPostReq;
import com.project.yourjs.api.res.Portfolio.Career.CareerDeleteRes;
import com.project.yourjs.api.res.Portfolio.Career.CareerPostRes;
import com.project.yourjs.api.res.Portfolio.Career.CareerUpdateRes;
import com.project.yourjs.api.service.CareerService;
import com.project.yourjs.common.dto.CareerDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Tag(name = "Career",description = "경력사항 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/career")
public class CareerController {

    private final CareerService careerService;


    @Operation(summary = "Get Careers", description = "경력사항 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = CareerDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<CareerDto>> getAllCareers(Authentication authentication){
        return ResponseEntity.ok(careerService.getAllCareers(authentication.getName()));
    }

    @Operation(summary = "Create Career", description = "경력사항 등록")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = CareerPostRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<CareerPostRes> createCareer(Authentication authentication, @Valid @RequestBody CareerPostReq careerPostReq){
        return ResponseEntity.ok(careerService.createCareer(authentication.getName(), careerPostReq));
    }

    @Operation(summary = "Update Career", description = "경력사항 수정")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = CareerUpdateRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PutMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<CareerUpdateRes> updateCareer(Authentication authentication, @Valid @RequestBody CareerDto careerDto){
        return ResponseEntity.ok(careerService.updateCareer(authentication.getName(), careerDto));
    }

    @Operation(summary = "Delete Career", description = "경력사항 삭제")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = CareerDeleteRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<CareerDeleteRes> deleteCareer(Authentication authentication, @Valid @RequestBody CareerDeleteReq careerDeleteReq){
        return ResponseEntity.ok(careerService.deleteCareer(authentication.getName(), careerDeleteReq));
    }

}
