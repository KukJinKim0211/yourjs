package com.project.yourjs.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(("/test"))
public class NoticeController {

  @GetMapping("/get")
  public void test(){
    
    System.out.println("test Apporve");
  }
}
