package com.progici.languagefever.config;

import com.progici.languagefever.model.CustomOAuth2User;
import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.service.CustomOAuth2UserService;
import com.progici.languagefever.service.KorisnikService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Autowired
  private CustomOAuth2UserService oauthUserService;

  @Autowired
  private KorisnikService korisnikService;

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity)
    throws Exception {
    return httpSecurity
      .authorizeHttpRequests(auth -> {
        auth.requestMatchers("/").permitAll();
        auth.anyRequest().authenticated();
      })
      .oauth2Login(oauth2 ->
        oauth2
          .userInfoEndpoint(userInfo -> userInfo.userService(oauthUserService))
          .successHandler(
            new AuthenticationSuccessHandler() {
              @Override
              public void onAuthenticationSuccess(
                HttpServletRequest request,
                HttpServletResponse response,
                Authentication authentication
              ) throws IOException, ServletException {
                CustomOAuth2User oauthUser = (CustomOAuth2User) authentication.getPrincipal();

                //Here you call your service to save the user
                korisnikService.addKorisnik(
                  new Korisnik(
                    "20",
                    oauthUser.getName(),
                    null,
                    oauthUser.getEmail()
                  )
                );

                response.sendRedirect("/korisnici");
              }
            }
          )
      )
      .formLogin(Customizer.withDefaults())
      .build();
  }
}
