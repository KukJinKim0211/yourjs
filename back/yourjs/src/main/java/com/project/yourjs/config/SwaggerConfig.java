package com.project.yourjs.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean       
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("v1-definition")
                .pathsToMatch("/api/**")
                .build();
    }
    
    @Bean
    public OpenAPI springShopOpenAPI() {
        Info info = new Info()
                .title("YourJS Swagger")
                .description("YourJS API 문서")
                .version("v0.0.1");
        return new OpenAPI()
                .info(info)
                .components(new Components()
                        .addSecuritySchemes("jwt-token", new SecurityScheme()
                                .type(SecurityScheme.Type.APIKEY)
                                .in(SecurityScheme.In.HEADER)
                                .name("jwt-token")))
                // AddSecurityItem section applies created scheme globally
                .addSecurityItem(new SecurityRequirement().addList("jwt-token"));
    };


}