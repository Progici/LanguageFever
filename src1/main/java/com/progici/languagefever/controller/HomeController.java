package com.progici.languagefever.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

  @Autowired
  private KorisnikController korisnikController;

  //
  //  USER ENDPOINTS
  //

  @GetMapping("/")
  public String home() {
    return "Home Sweet Home!";
  }

  @GetMapping("/secured")
  public String secured() {
    return "Secured!";
  }

  @GetMapping("/active")
  public Boolean active(OAuth2AuthenticationToken authentication) {
    if (authentication == null) return false;
    korisnikController.getCurrentUser(authentication); //baci error ako je korisnik null
    return authentication.isAuthenticated();
  }
  //
  //  ADMIN ENDPOINTS
  //
}
