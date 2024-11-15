package com.progici.languagefever.config;

import com.progici.languagefever.model.CustomOAuth2User;
import com.progici.languagefever.service.KorisnikService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final KorisnikService korisnikService;
  @Value("${frontend.url}")
    private String frontendUrl;
    @Autowired
    public OAuth2LoginSuccessHandler(KorisnikService korisnikService) {
        this.korisnikService = korisnikService;
    }

    @Override
    public void onAuthenticationSuccess(
        HttpServletRequest request,
        HttpServletResponse response,
        Authentication authentication
    ) throws ServletException, IOException {
        this.setAlwaysUseDefaultTargetUrl(true);
        this.setDefaultTargetUrl(frontendUrl);
        super.onAuthenticationSuccess(request, response, authentication);

        // Process user information
        CustomOAuth2User oauthUser = (CustomOAuth2User) authentication.getPrincipal();

        String pictureLink = oauthUser.getAttribute("picture");
        if (pictureLink != null) pictureLink = pictureLink.toString();

        korisnikService.processOAuthPostLogin(
            oauthUser.getName(),
            oauthUser.getEmail(),
            pictureLink
        );

        // Generate session token
        String sessionToken = generateSessionToken(oauthUser);

        // Set the session token as a secure cookie
        Cookie sessionCookie = new Cookie("session", sessionToken);
        sessionCookie.setHttpOnly(true);
        sessionCookie.setSecure(true); // Use HTTPS in production
        sessionCookie.setPath("/");
        sessionCookie.setMaxAge(24 * 60 * 60); // 1 day
        sessionCookie.setAttribute("SameSite", "None"); // Add SameSite attribute
        response.addCookie(sessionCookie);
    }

    private String generateSessionToken(CustomOAuth2User oauthUser) {
        // Generate a token (e.g., JWT or custom session token)
        return "example-session-token";
    }
}
