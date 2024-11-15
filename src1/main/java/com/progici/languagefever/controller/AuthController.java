// package com.progici.languagefever.controller;

// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
// import javax.servlet.http.HttpServletResponse;
// import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
// import org.springframework.security.core.Authentication;
// import javax.servlet.http.Cookie;
// import java.util.Map;
// import java.io.IOException;

// @RestController
// @RequestMapping("/auth")
// public class AuthController {

//     @GetMapping("/login")
//     public void login(HttpServletResponse response) throws IOException {
//         // Redirect user to Spring Boot OAuth2 endpoint
//         response.sendRedirect("/oauth2/authorization/google");
//     }

//     @GetMapping("/login/oauth2/code/google")
//     public void oauthCallback(HttpServletResponse response, Authentication authentication) throws IOException {
//         // Extract user information from the authentication object
//         OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
//         Map<String, Object> userDetails = authToken.getPrincipal().getAttributes();

//         // Generate a session token or store user data (e.g., in a database)
//         String sessionToken = generateSessionToken(userDetails);

//         // Set the session token as a secure cookie
//         Cookie sessionCookie = new Cookie("session", sessionToken);
//         sessionCookie.setHttpOnly(true);
//         sessionCookie.setSecure(true); // Use HTTPS in production
//         sessionCookie.setPath("/");
//         sessionCookie.setMaxAge(24 * 60 * 60); // 1 day
//         response.addCookie(sessionCookie);

//         // Redirect to the frontend application
//         response.sendRedirect("http://localhost:3000/dashboard");
//     }

//     private String generateSessionToken(Map<String, Object> userDetails) {
//         // Generate a token (e.g., JWT or custom session token)
//         return "example-session-token";
//     }
// }