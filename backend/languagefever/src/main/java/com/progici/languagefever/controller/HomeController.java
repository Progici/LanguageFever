package com.progici.languagefever.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

  @GetMapping("/")
  public String home() {
    return "Home Sweet home!";
  }

  @GetMapping("/secured")
  public String secured() {
    return "Secured!";
  }
}
