package com.progici.languagefever.controller;

import com.progici.languagefever.model.Jezik;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.UcenikJezici;
import com.progici.languagefever.service.UcenikService;
import com.progici.languagefever.service.UcenikJeziciService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class UcenikController {

  @Autowired
  private UcenikService ucenikService;

  @Autowired
  private UcenikJeziciService ucenik_jeziciService;

  @Autowired
  private KorisnikController korisnikController;

  @GetMapping("/trenutniucenik")
  public Ucenik getCurrentUser(OAuth2AuthenticationToken authentication) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );
    return ucenikService.getUcenikByKorisnikId(korisnik.getId());
  }

  
  @PostMapping("/azurirajucenika")
  public ResponseEntity<Void> updateCurrentUcenik(
    OAuth2AuthenticationToken authentication,
    @RequestBody Ucenik ucenikBody
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );
    if (korisnik == null) return ResponseEntity.badRequest().build();
    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());
    try {
      if (ucenik == null) {
        ucenikService.addUcenikByKorisnikId(ucenikBody, korisnik.getId());
        return ResponseEntity.ok().build();
      }
      ucenikService.updateUcenikById(ucenik.getId(), ucenikBody);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }
  @DeleteMapping("/izbrisiucenika")
  public ResponseEntity<Void> deleteCurrentUcenik(
    OAuth2AuthenticationToken authentication
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );
    if (korisnik == null) return ResponseEntity.badRequest().build();
    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());
    if (ucenik == null) return ResponseEntity.ok().build();
    ucenikService.deleteUcenikById(ucenik.getId());
    return ResponseEntity.ok().build();
  }


  @RequestMapping("/ucenici")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Ucenik> getSviUcenici() {
    return ucenikService.getSviUcenici();
  }

  @RequestMapping("/ucenici/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public Ucenik getUcenikById(@PathVariable Long id) {
    try {
      return ucenikService.getUcenikById(id);
    } catch (Exception e) {
      return null;
    }
  }

  @RequestMapping(value = "/ucenici/{idKorisnika}", method = RequestMethod.POST)
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Void> addUcenikByKorisnikId(
    @RequestBody Ucenik ucenik,
    @RequestBody Jezik jezik,
    @PathVariable Long idKorisnika
  ) {
    try {
      ucenikService.addUcenikByKorisnikId(ucenik, idKorisnika);
      ucenik_jeziciService.addUcenikJezici(ucenik, jezik);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @RequestMapping(value = "/ucenici/{id}", method = RequestMethod.PUT)
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Void> updateUcenikById(
    @RequestBody Ucenik ucenik,
    @PathVariable Long id
  ) {
    try {
      ucenikService.updateUcenikById(id, ucenik);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @RequestMapping(value = "/ucenici/{id}", method = RequestMethod.DELETE)
  @PreAuthorize("hasRole('ROLE_ADMIN')")

  public void deleteUcenikById(@PathVariable Long id) {
    ucenikService.deleteUcenikById(id);
  }
  @RequestMapping(value = "/ucenici/deleteall", method = RequestMethod.DELETE)
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteUcenikAll() {
    ucenikService.deleteUcenikAll();
  }
}
