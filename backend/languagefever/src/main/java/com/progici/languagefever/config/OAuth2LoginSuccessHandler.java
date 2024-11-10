package com.progici.languagefever.config;

import com.progici.languagefever.model.CustomOAuth2User;
import com.progici.languagefever.service.KorisnikService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

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
    this.setAlwaysUseDefaultTargetUrl(true);
    this.setDefaultTargetUrl(frontendUrl);
    super.onAuthenticationSuccess(request, response, authentication);

    //dio sa spremanjem usera
    CustomOAuth2User oauthUser = (CustomOAuth2User) authentication.getPrincipal();

    String pictureLink = oauthUser.getAttribute("picture");
    if (pictureLink != null) pictureLink = pictureLink.toString();

    korisnikService.processOAuthPostLogin(
      oauthUser.getName(),
      oauthUser.getEmail(),
      pictureLink
    );
  }
}
