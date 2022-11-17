package com.project.yourjs.api.controller;

import com.project.yourjs.api.req.Portfolio.PortfolioDeleteReq;
import com.project.yourjs.api.req.Portfolio.PortfolioPostReq;
import com.project.yourjs.api.res.Portfolio.PortfolioRes;
import com.project.yourjs.api.service.PortfolioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@AllArgsConstructor
@RequestMapping("portfolio")
@Tag(name = "Portfolio",description = "개인상세정보 API")
public class PortfolioController {

    private PortfolioService portfolioService;


    @Operation(summary = "개인상세정보 추가", description = "유저가 작성한 [개인상세정보]를 저장한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = PortfolioRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> createPortfolio(Authentication authentication, @Valid @RequestBody PortfolioPostReq portfolioPostReq){
        String userId = authentication.getName();
        return ResponseEntity.ok(portfolioService.createPortfolio(userId, portfolioPostReq));
    }


    @Operation(summary = "개인상세정보 조회 ", description = "유저의 [개인상세정보]를 조회한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = PortfolioRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> getPortfolio(Authentication authentication){
        String userId = authentication.getName();
        return ResponseEntity.ok(portfolioService.getPortfolio(userId));
    }


    @Operation(summary = "개인상세정보 수정 ", description = "유저의 [개인상세정보]를 수정한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = PortfolioRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @PutMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> updatePortfolio(Authentication authentication, @Valid @RequestBody PortfolioRes portfolioRes){
        String userId = authentication.getName();
        return ResponseEntity.ok(portfolioService.updatePortfolio(userId, portfolioRes));
    }


    @Operation(summary = "개인상세정보 삭제 ", description = "유저의 [개인상세정보]를 삭제한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = PortfolioRes.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "404", description = "NOT FOUND", content = @Content(schema = @Schema(hidden = true))),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR", content = @Content(schema = @Schema(hidden = true)))
    })
    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> deletePortfolio(Authentication authentication, @Valid @RequestBody PortfolioDeleteReq portfolioDeleteReq){
        String userId = authentication.getName();
        boolean hasDeleted = portfolioService.deletePortfolio(userId, portfolioDeleteReq.getPortfolioSeq());
        return ResponseEntity.ok(hasDeleted);
    }
}
