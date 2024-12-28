package com.progici.languagefever.controller;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.Ocjena;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.service.LekcijaService;
import com.progici.languagefever.service.OcjenaService;
import com.progici.languagefever.service.UcenikService;
import com.progici.languagefever.service.UciteljService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public class OcjenaController {

  @Autowired
  private KorisnikController korisnikController;

  @Autowired
  private OcjenaService ocjenaService;

  @Autowired
  private UciteljService uciteljService;

  @Autowired
  private UcenikService ucenikService;

  @Autowired
  private LekcijaService lekcijaService;

  @RequestMapping("/mojeocjene")
  public List<Ocjena> getSveMojeOcjene(
    OAuth2AuthenticationToken authentication
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return null;

    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());

    if (ucenik == null) return null;

    return ocjenaService.getOcjeneByUcenikId(ucenik.getId());
  }

  @RequestMapping("/mojeocjene/{idUcitelja}")
  public List<Ocjena> getSveMojeOcjeneByCertainUciteljId(
    OAuth2AuthenticationToken authentication,
    @PathVariable Long idUcitelja
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return null;

    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());

    if (ucenik == null) return null;

    return ocjenaService
      .getOcjeneByUcenikId(ucenik.getId())
      .stream()
      .filter(ocjena -> ocjena.getUcitelj().getId().equals(idUcitelja))
      .collect(Collectors.toList());
  }

  @RequestMapping("/ocjene")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Ocjena> getSveOcjene() {
    return ocjenaService.getSveOcjene();
  }

  @RequestMapping("/ocjene/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public Ocjena getOcjenaById(@PathVariable Long id) {
    try {
      return ocjenaService.getOcjenaById(id);
    } catch (Exception e) {
      return null;
    }
  }

  @RequestMapping("/ucitelji/{id}/ocjene")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Ocjena> getOcjeneByUciteljId(@PathVariable Long id) {
    return ocjenaService.getOcjeneByUciteljId(id);
  }

  @RequestMapping("/ucenici/{id}/ocjene")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Ocjena> getOcjeneByUcenikId(@PathVariable Long id) {
    return ocjenaService.getOcjeneByUcenikId(id);
  }

  @SuppressWarnings("unlikely-arg-type")
  @RequestMapping(
    value = "/mojeocjene/{idUcitelja}",
    method = RequestMethod.POST
  )
  public ResponseEntity<Void> addMojaOcjena(
    OAuth2AuthenticationToken authentication,
    @RequestBody Ocjena ocjena,
    @PathVariable Long idUcitelja
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return ResponseEntity.badRequest().build();

    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());

    if (
      lekcijaService
        .getLekcijeByUcenikId(ucenik.getId())
        .contains(lekcijaService.getLekcijeByUciteljId(idUcitelja))
    ) try {
      ocjena.setUcenik(ucenik);
      ocjena.setUcitelj(uciteljService.getUciteljById(idUcitelja));
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    ocjenaService.addOcjena(ocjena);
    return ResponseEntity.ok().build();
  }

  @RequestMapping(value = "/mojeocjene/{id}", method = RequestMethod.PUT)
  public ResponseEntity<Void> updateMojaOcjenaById(
    OAuth2AuthenticationToken authentication,
    @RequestBody Ocjena ocjena,
    @PathVariable Long id
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return ResponseEntity.badRequest().build();

    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());

    try {
      if (
        ocjenaService
          .getOcjeneByUcenikId(ucenik.getId())
          .contains(ocjenaService.getOcjenaById(id))
      ) ocjenaService.updateOcjenaById(id, ocjena); else return ResponseEntity
        .badRequest()
        .build();
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @RequestMapping(value = "/mojeocjene/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<Void> DeleteMojaOcjenaById(
    OAuth2AuthenticationToken authentication,
    @PathVariable Long id
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return ResponseEntity.badRequest().build();

    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());

    if (ucenik == null) return ResponseEntity.badRequest().build();

    try {
      if (
        ocjenaService
          .getOcjeneByUcenikId(ucenik.getId())
          .contains(ocjenaService.getOcjenaById(id))
      ) ocjenaService.deleteOcjenaById(id);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }

    return ResponseEntity.ok().build();
  }

  @RequestMapping(
    value = "/ocjene/{idUcitelja}/{idUcenika}",
    method = RequestMethod.POST
  )
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Void> addOcjena(
    @RequestBody Ocjena ocjena,
    @PathVariable Long idUcitelja,
    @PathVariable Long idUcenika
  ) {
    try {
      ocjena.setUcitelj(uciteljService.getUciteljById(idUcitelja));
      ocjena.setUcenik(ucenikService.getUcenikById(idUcenika));
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    ocjenaService.addOcjena(ocjena);
    return ResponseEntity.ok().build();
  }

  @RequestMapping(value = "/ocjene/{id}", method = RequestMethod.PUT)
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Void> updateOcjenaById(
    @RequestBody Ocjena ocjena,
    @PathVariable Long id
  ) {
    try {
      ocjenaService.updateOcjenaById(id, ocjena);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @RequestMapping(value = "/ocjene/{id}", method = RequestMethod.DELETE)
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteOcjenaById(@PathVariable Long id) {
    ocjenaService.deleteOcjenaById(id);
  }

  @RequestMapping(value = "/ocjene/deleteall", method = RequestMethod.DELETE)
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteOcjenaAll() {
    ocjenaService.deleteOcjenaAll();
  }
}
