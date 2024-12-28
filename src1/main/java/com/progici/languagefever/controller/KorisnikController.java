package com.progici.languagefever.controller;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.model.enums.Role;
import com.progici.languagefever.service.KorisnikService;
import com.progici.languagefever.service.UcenikService;
import com.progici.languagefever.service.UciteljService;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KorisnikController {

  @Autowired
  private KorisnikService korisnikService;

  @Autowired
  private UcenikService ucenikService;

  @Autowired
  private UciteljService uciteljService;

  @GetMapping("/admins")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Korisnik> getAllAdminRoles() {
    return korisnikService.getAllAdminRoles();
  }

  @PutMapping("/setadmin/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Void> setAdminByKorisnikId(@PathVariable Long id) {
    Korisnik korisnik;
    try {
      korisnik = korisnikService.getKorisnikById(id);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }

    korisnik.setRole(Role.ROLE_ADMIN);
    try {
      korisnikService.updateKorisnikById(id, korisnik);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }

    return ResponseEntity.ok().build();
  }

  @GetMapping("/users")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Korisnik> getAllUserRoles() {
    return korisnikService.getAllUserRoles();
  }

  @GetMapping("/trenutnoprijavljen")
  public List<Object> getCurrentUserObjects(
    OAuth2AuthenticationToken authentication
  ) {
    Korisnik korisnik = getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return new ArrayList<>();

    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());
    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());

    List<Object> lista = new ArrayList<>();
    lista.add(korisnik);
    lista.add(ucitelj);
    lista.add(ucenik);
    return lista;
  }

  @PostMapping("/azurirajkorisnika")
  public ResponseEntity<Void> updateCurrentUser(
    OAuth2AuthenticationToken authentication,
    @RequestBody Korisnik korisnikBody
  ) {
    Korisnik korisnik = getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return ResponseEntity.badRequest().build();

    try {
      korisnikService.updateKorisnikById(korisnik.getId(), korisnikBody);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/izbrisikorisnika")
  public ResponseEntity<Void> deleteCurrentUser(
    OAuth2AuthenticationToken authentication
  ) {
    Korisnik korisnik = getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return ResponseEntity.badRequest().build();

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());
    if (ucitelj != null) uciteljService.deleteUciteljById(ucitelj.getId());

    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());
    if (ucenik != null) ucenikService.deleteUcenikById(ucenik.getId());

    korisnikService.deleteKorisnikById(korisnik.getId());

    return ResponseEntity.ok().build();
  }

  @RequestMapping("/korisnici")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Korisnik> getSviKorisnici() {
    return korisnikService.getSviKorisnici();
  }

  @RequestMapping("/korisnici/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public Korisnik getKorisnikById(@PathVariable Long id) {
    try {
      return korisnikService.getKorisnikById(id);
    } catch (Exception e) {
      return null;
    }
  }

  @RequestMapping(value = "/korisnici", method = RequestMethod.POST)
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Void> addKorisnik(@RequestBody Korisnik korisnik) {
    try {
      korisnikService.addKorisnik(korisnik);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @RequestMapping(value = "/korisnici/{id}", method = RequestMethod.PUT)
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Void> updateKorisnikById(
    @RequestBody Korisnik korisnik,
    @PathVariable Long id
  ) {
    try {
      korisnikService.updateKorisnikById(id, korisnik);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @RequestMapping(value = "/korisnici/{id}", method = RequestMethod.DELETE)
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteKorisnikById(@PathVariable Long id) {
    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(id);
    if (ucitelj != null) uciteljService.deleteUciteljById(ucitelj.getId());

    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(id);
    if (ucenik != null) ucenikService.deleteUcenikById(ucenik.getId());

    korisnikService.deleteKorisnikById(id);
  }

  public Korisnik getKorisnikFromOAuth2AuthenticationToken(
    OAuth2AuthenticationToken authentication
  ) {
    DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
    Map<String, Object> attributes = principal.getAttributes();
    String email = attributes.getOrDefault("email", "").toString();

    return korisnikService.getKorisnikByEmail(email);
  }
}
