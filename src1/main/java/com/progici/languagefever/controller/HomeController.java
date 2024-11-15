package com.progici.languagefever.controller;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {


  @GetMapping("/")
  public String home() {
    return "Home Sweet Home!";
  }

  @GetMapping("/secured")
  public String secured() {
    return "Secured!";
  }

  @GetMapping("/active")
  public Boolean active(OAuth2AuthenticationToken token) {
    if (token == null) return false;
    return token.isAuthenticated();
  }
}
