package com.progici.languagefever.controller;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class HomeController {

    private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

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
        if (token == null) {
            logger.error("Token is null");
            return false;
        }
        try {
            String tokenValue = "lol";
            logger.info("Token value: " + tokenValue);
            Cookie cookie = new Cookie("accessToken", tokenValue);
            cookie.setHttpOnly(true);
            cookie.setSecure(true); // Use HTTPS in production
            cookie.setPath("/");
            cookie.setMaxAge(3600); // 1 hour
            response.addCookie(cookie);
            return token.isAuthenticated();
        } catch (Exception e) {
            logger.error("Error in /active endpoint", e);
            return false;
        }
    }
}
