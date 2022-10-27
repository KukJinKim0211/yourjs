package com.project.yourjs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

import de.codecentric.boot.admin.server.config.EnableAdminServer;

@EnableAdminServer
@SpringBootApplication
public class YourjsApplication {

    public static void main(String[] args) {
        SpringApplication.run(YourjsApplication.class, args);
    }

}
