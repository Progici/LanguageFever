package com.progici.languagefever.config;

import com.progici.languagefever.model.CustomOAuth2User;
import com.progici.languagefever.service.KorisnikService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

@Component
public class OAuth2LoginSuccessHandler
    extends SavedRequestAwareAuthenticationSuccessHandler {

  @Value("${frontend.url}")
  private String frontendUrl;

  @Autowired
  private KorisnikService korisnikService;

  @Override
  public void onAuthenticationSuccess(
      HttpServletRequest request,
      HttpServletResponse response,
      Authentication authentication) throws ServletException, IOException {
    this.setAlwaysUseDefaultTargetUrl(true);
    this.setDefaultTargetUrl(frontendUrl);
    super.onAuthenticationSuccess(request, response, authentication);

    String token = generateToken(authentication);

    Cookie cookie = new Cookie("access_token", token);
    cookie.setHttpOnly(false); // Kako bi bio nedostupan za JavaScript (sigurnost)
    cookie.setSecure(true); // Postavi ovo samo ako koristiš HTTPS
    cookie.setPath("/"); // Postavi putanju na koju kolačić treba biti dostupan
    cookie.setMaxAge(60 * 60 * 24); // Postavi vreme isteka kolačića (npr. 1 dan)
    response.addCookie(cookie);

    // dio sa spremanjem usera
    CustomOAuth2User oauthUser = (CustomOAuth2User) authentication.getPrincipal();

    String pictureLink = oauthUser.getAttribute("picture");
    if (pictureLink != null)
      pictureLink = pictureLink.toString();

    korisnikService.processOAuthPostLogin(
        oauthUser.getName(),
        oauthUser.getEmail(),
        pictureLink);
  }

  public String generateToken(Authentication authentication) {
    CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();

    return Jwts.builder()
        .setSubject(user.getName())
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // Token važi 1 dan
        .signWith(SignatureAlgorithm.HS256, "secret-key") // Tajni ključ za potpisivanje
        .compact();
  }
}
