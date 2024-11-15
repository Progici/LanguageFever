package com.progici.languagefever.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cookie")
public class CookieController {

    @GetMapping
    public String getSessionCookie(HttpServletRequest request, HttpServletResponse response) {
        String sessionId = "No session cookie found";
        
        // Retrieve the JSESSIONID from the request
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("JSESSIONID".equals(cookie.getName())) {
                    sessionId = cookie.getValue();

                    // Create a new cookie with the same JSESSIONID value
                    Cookie newCookie = new Cookie("JSESSIONID", sessionId);

                    // Set the desired properties for the cookie
                    newCookie.setHttpOnly(true);    // Make it HttpOnly (not accessible via JavaScript)
                    newCookie.setSecure(true);      // Send only over HTTPS
                    newCookie.setPath("/");         // Make it available to the entire domain
                    newCookie.setMaxAge(24 * 60 * 60); // Optional: set expiry to 1 day

                    // Add the cookie to the response
                    response.addCookie(newCookie);
                    break;
                }
            }
        }

        return "JSESSIONID has been set in the response";
    }
}
