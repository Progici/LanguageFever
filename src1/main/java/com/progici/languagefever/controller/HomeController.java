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
            String tokenValue = token.getPrincipal().toString();
            System.out.println("Debug 1");
            logger.info("Token value: " + tokenValue);
            System.out.println("Debug 2");
            Cookie cookie = new Cookie("accessToken", tokenValue);
            System.out.println("Debug 3");
            cookie.setHttpOnly(true);
            System.out.println("Debug 4");
            cookie.setSecure(true); // Use HTTPS in production
            System.out.println("Debug 5");
            cookie.setPath("/");
            System.out.println("Debug 6");
            cookie.setMaxAge(3600); // 1 hour
            System.out.println("Debug 7");
            response.addCookie(cookie);
            System.out.println("Debug 8");
            return token.isAuthenticated();
        } catch (Exception e) {
            logger.error("Error in /active endpoint", e);
            return false;
        }
    }
}
