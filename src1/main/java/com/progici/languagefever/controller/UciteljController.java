package com.progici.languagefever.controller;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.service.UciteljService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UciteljController {

  @Autowired
  private UciteljService uciteljService;

  @Autowired
  private KorisnikController korisnikController;

  @PostMapping("/azurirajucitelja")
  public ResponseEntity<Void> updateCurrentUcitelj(
    OAuth2AuthenticationToken authentication,
    @RequestBody Ucitelj uciteljBody
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return ResponseEntity.badRequest().build();

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());

    try {
      if (ucitelj == null) {
        uciteljService.addUciteljByKorisnikId(uciteljBody, korisnik.getId());
        return ResponseEntity.ok().build();
      }
      uciteljService.updateUciteljById(ucitelj.getId(), uciteljBody);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/izbrisiucitelja")
  public ResponseEntity<Void> deleteCurrentUcitelj(
    OAuth2AuthenticationToken authentication
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return ResponseEntity.badRequest().build();

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());

    if (ucitelj == null) return ResponseEntity.ok().build();

    uciteljService.deleteUciteljById(ucitelj.getId());

    return ResponseEntity.ok().build();
  }

  @RequestMapping("/ucitelji")
  public List<Ucitelj> getSviUcitelji() {
    return uciteljService.getSviUcitelji();
  }

  @RequestMapping("/ucitelji/{id}")
  public Ucitelj getUciteljById(@PathVariable Long id) {
    try {
      return uciteljService.getUciteljById(id);
    } catch (Exception e) {
      return null;
    }
  }

  @RequestMapping(
    value = "/ucitelji/{idKorisnika}",
    method = RequestMethod.POST
  )
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Void> addUciteljByKorisnikId(
    @RequestBody Ucitelj ucitelj,
    @PathVariable Long idKorisnika
  ) {
    try {
      uciteljService.addUciteljByKorisnikId(ucitelj, idKorisnika);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }

    return ResponseEntity.ok().build();
  }

  @RequestMapping(value = "/ucitelji/{id}", method = RequestMethod.PUT)
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Void> updateUciteljById(
    @RequestBody Ucitelj ucitelj,
    @PathVariable Long id
  ) {
    try {
      uciteljService.updateUciteljById(id, ucitelj);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }

    return ResponseEntity.ok().build();
  }

  @RequestMapping(value = "/ucitelji/{id}", method = RequestMethod.DELETE)
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteUciteljById(@PathVariable Long id) {
    uciteljService.deleteUciteljById(id);
  }

  @RequestMapping(value = "/ucitelji/deleteall", method = RequestMethod.DELETE)
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteUciteljAll() {
    uciteljService.deleteUciteljAll();
  }
}
