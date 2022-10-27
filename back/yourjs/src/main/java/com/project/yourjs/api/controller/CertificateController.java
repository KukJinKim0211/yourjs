package com.project.yourjs.api.controller;

import com.project.yourjs.api.req.CertificateDeleteReq;
import com.project.yourjs.api.req.CertificatePostReq;
import com.project.yourjs.api.res.CertificateDeleteRes;
import com.project.yourjs.api.res.CertificatePostRes;
import com.project.yourjs.api.res.CertificateUpdateRes;
import com.project.yourjs.api.service.CertificateService;
import com.project.yourjs.common.dto.CertificateDto;
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

@Tag(name = "Certificate",description = "자격증/어학 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/certificate")
public class CertificateController {
    
    private final CertificateService certificateService;

    @Operation(summary = "Get Certificates", description = "자격증/어학 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = CertificateDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<CertificateDto>> getAllCertificates(Authentication authentication){
        return ResponseEntity.ok(certificateService.getAllCertificates(authentication.getName()));
    }

    @Operation(summary = "Create Certificate", description = "자격증/어학 등록")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = CertificatePostRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<CertificatePostRes> createCertificate(Authentication authentication, @Valid @RequestBody CertificatePostReq certificatePostReq){
        return ResponseEntity.ok(certificateService.createCertificate(authentication.getName(), certificatePostReq));
    }

    @Operation(summary = "Update Certificate", description = "자격증/어학 수정")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = CertificateUpdateRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PutMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<CertificateUpdateRes> updateCertificate(Authentication authentication, @Valid @RequestBody CertificateDto certificateDto){
        return ResponseEntity.ok(certificateService.updateCertificate(authentication.getName(), certificateDto));
    }

    @Operation(summary = "Delete Certificate", description = "자격증/어학 삭제")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = CertificateDeleteRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<CertificateDeleteRes> deleteCertificate(Authentication authentication, @Valid @RequestBody CertificateDeleteReq certificateDeleteReq){
        return ResponseEntity.ok(certificateService.deleteCertificate(authentication.getName(), certificateDeleteReq));
    }
}
