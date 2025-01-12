package com.progici.languagefever.controller;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.model.dto.UcenikDTO;
import com.progici.languagefever.model.dto.UciteljDTO;
import com.progici.languagefever.model.enums.Role;
import com.progici.languagefever.service.KorisnikService;
import com.progici.languagefever.service.UcenikJeziciService;
import com.progici.languagefever.service.UcenikService;
import com.progici.languagefever.service.UciteljJeziciService;
import com.progici.languagefever.service.UciteljService;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class KorisnikController {

  @Autowired
  private KorisnikService korisnikService;

  @Autowired
  private UcenikService ucenikService;

  @Autowired
  private UciteljService uciteljService;

  //
  //  USER ENDPOINTS
  //

  @GetMapping("/trenutnikorisnik")
  public Korisnik getCurrentUser(OAuth2AuthenticationToken authentication) {
    Korisnik korisnik = getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Korisnik not found"
    );

    return korisnik;
  }

  @PostMapping("/azurirajkorisnika")
  public ResponseEntity<Void> updateCurrentUser(
    OAuth2AuthenticationToken authentication,
    @RequestBody Korisnik korisnikBody
  ) {
    Korisnik korisnik = getCurrentUser(authentication);
    try {
      korisnikService.updateKorisnikById(korisnik.getId(), korisnikBody);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/izbrisikorisnika")
  public void deleteCurrentUser(OAuth2AuthenticationToken authentication) {
    Korisnik korisnik = getCurrentUser(authentication);
    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());
    if (ucitelj != null) uciteljService.deleteUciteljById(ucitelj.getId());
    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());
    if (ucenik != null) ucenikService.deleteUcenikById(ucenik.getId());
    korisnikService.deleteKorisnikById(korisnik.getId());
  }

  //
  //  ADMIN ENDPOINTS
  //

  @GetMapping("/admins")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Korisnik> getAllAdminRoles() {
    return korisnikService.getAllAdminRoles();
  }

  @GetMapping("/users")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Korisnik> getAllUserRoles() {
    return korisnikService.getAllUserRoles();
  }

  @GetMapping("/korisnici")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Korisnik> getSviKorisnici() {
    return korisnikService.getSviKorisnici();
  }

  @GetMapping("/korisnici/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public Korisnik getKorisnikById(@PathVariable Long id) {
    try {
      return korisnikService.getKorisnikById(id);
    } catch (Exception e) {
      return null;
    }
  }

  @PostMapping("/korisnici")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void addKorisnik(@RequestBody Korisnik korisnikBody) {
    korisnikService.addKorisnik(korisnikBody);
  }

  @PutMapping("/setadmin/{idKorisnika}")
  //komentirati za development build
  //@PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Void> setAdminByKorisnikId(
    @PathVariable Long idKorisnika
  ) {
    Korisnik korisnik = getKorisnikById(idKorisnika);

    if (korisnik == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Korisnik not found"
    );

    try {
      korisnikService.setRoleToKorisnikById(idKorisnika, Role.ROLE_ADMIN);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @PutMapping("/korisnici/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Void> updateKorisnikById(
    @RequestBody Korisnik korisnikBody,
    @PathVariable Long id
  ) {
    Korisnik korisnik = getKorisnikById(id);

    if (korisnik == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Korisnik not found"
    );

    try {
      korisnikService.updateKorisnikById(id, korisnikBody);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/korisnici/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteKorisnikById(@PathVariable Long id) {
    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(id);
    if (ucitelj != null) uciteljService.deleteUciteljById(ucitelj.getId());
    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(id);
    if (ucenik != null) ucenikService.deleteUcenikById(ucenik.getId());

    korisnikService.deleteKorisnikById(id);
  }

  private Korisnik getKorisnikFromOAuth2AuthenticationToken(
    OAuth2AuthenticationToken authentication
  ) {
    DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
    Map<String, Object> attributes = principal.getAttributes();
    String email = attributes.getOrDefault("email", "").toString();
    return korisnikService.getKorisnikByEmail(email);
  }
}
