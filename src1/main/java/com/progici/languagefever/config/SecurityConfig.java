package com.progici.languagefever.config;

import com.progici.languagefever.service.CustomOAuth2UserService;

import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Autowired
  private OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

  @Autowired
  private CustomOAuth2UserService oauthUserService;

  @Value("${frontend.url}")
  private String frontendUrl;

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
      .csrf(AbstractHttpConfigurer::disable)
      .cors(cors -> cors.configurationSource(corsConfigurationSource()))
      .authorizeHttpRequests(auth -> {
        auth.requestMatchers("/", "/ucitelji/**", "/active" ).permitAll();
        auth.anyRequest().authenticated();
      })
      .oauth2Login(oauth2 ->
        oauth2
          .userInfoEndpoint(userInfo -> userInfo.userService(oauthUserService))
          .successHandler(oAuth2LoginSuccessHandler)
      )
      .build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    
    // Set allowed origins to your frontend and localhost for testing
    configuration.setAllowedOrigins(Arrays.asList(frontendUrl, "http://localhost:5173"));
    
    // Specify allowed headers (or leave as "*" for all headers)
    configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
    
    // Allow all HTTP methods (GET, POST, etc.)
    configuration.addAllowedMethod("*");
    
    // Allow credentials (session cookies)
    configuration.setAllowCredentials(true);
    
    // Register CORS configuration for all endpoints
    UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
    urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", configuration);
    
    return urlBasedCorsConfigurationSource;
  }
}
