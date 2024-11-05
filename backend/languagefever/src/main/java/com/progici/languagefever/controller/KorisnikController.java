package com.progici.languagefever.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KorisnikController {

  @RequestMapping("/hello")
  public String hello() {
    return "Hello World";
  }
}
