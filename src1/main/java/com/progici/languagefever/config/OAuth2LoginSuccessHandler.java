package com.progici.languagefever.config;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.enums.Role;
import com.progici.languagefever.service.KorisnikService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Map;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;



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
    Authentication authentication
  ) throws ServletException, IOException {
    OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;

    DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
    Map<String, Object> attributes = principal.getAttributes();
    String email = attributes.getOrDefault("email", "").toString();
    String name = attributes.getOrDefault("name", "").toString();
    String picture;
    String id;
    if (
      "github".equals(
          oAuth2AuthenticationToken.getAuthorizedClientRegistrationId()
        )
    ) {
      picture = attributes.getOrDefault("avatar_url", "").toString();
      id = "id";
    } else if (
      "google".equals(
          oAuth2AuthenticationToken.getAuthorizedClientRegistrationId()
        )
    ) {
      picture = attributes.getOrDefault("picture", "").toString();
      id = "sub";
    } else {
      throw new IllegalAccessError("Not supported AuthorizedClient");
    }
    Korisnik user = korisnikService.getKorisnikByEmail(email);

    if (user == null) {
      Korisnik newUser = new Korisnik();
      newUser.setName(name);
      newUser.setEmail(email);
      newUser.setPicture(picture);
      newUser.setRole(Role.ROLE_USER);
      korisnikService.addKorisnik(newUser);
      user = korisnikService.getKorisnikByEmail(email);
    }
    DefaultOAuth2User newUser = new DefaultOAuth2User(
      List.of(new SimpleGrantedAuthority(user.getRole().name())),
      attributes,
      id
      );
          Authentication securityAuth = new OAuth2AuthenticationToken(
      newUser,
      List.of(new SimpleGrantedAuthority(user.getRole().name())),
      oAuth2AuthenticationToken.getAuthorizedClientRegistrationId()
    );
    SecurityContextHolder.getContext().setAuthentication(securityAuth);
    addSameSiteCookieAttribute(response);
    this.setAlwaysUseDefaultTargetUrl(true);
    this.setDefaultTargetUrl(frontendUrl);
    super.onAuthenticationSuccess(request, response, authentication);
  }
  
  private void addSameSiteCookieAttribute(HttpServletResponse response) {
    Collection<String> headers = response.getHeaders(HttpHeaders.SET_COOKIE);
    boolean firstHeader = true;
    // there can be multiple Set-Cookie attributes
    for (String header : headers) {
      if (firstHeader) {
        response.setHeader(
          HttpHeaders.SET_COOKIE,
          String.format("%s; %s", header, "SameSite=Lax")
        );
        firstHeader = false;
        continue;
      }
      response.addHeader(
        HttpHeaders.SET_COOKIE,
        String.format("%s; %s", header, "SameSite=Lax")
      );
    }
  }
}
