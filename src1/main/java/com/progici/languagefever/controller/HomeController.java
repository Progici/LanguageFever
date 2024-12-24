package com.progici.languagefever.controller;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
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
  public Boolean active(OAuth2AuthenticationToken token, HttpServletResponse response) {
    if (token == null) return false;
    Cookie cookie = new Cookie("accessToken", token.getPrincipal().toString());
    cookie.setHttpOnly(true);
    cookie.setSecure(true); // Use HTTPS in production
    cookie.setPath("/");
    cookie.setMaxAge(3600); // 1 hour
    response.addCookie(cookie);
    return token.isAuthenticated();
  }
}
