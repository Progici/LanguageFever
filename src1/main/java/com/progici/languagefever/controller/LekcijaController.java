package com.progici.languagefever.controller;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.Lekcija;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.model.enums.Status;
import com.progici.languagefever.service.LekcijaService;
import com.progici.languagefever.service.UcenikService;
import com.progici.languagefever.service.UciteljService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
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
public class LekcijaController {

  @Autowired
  private LekcijaService lekcijaService;

  @Autowired
  private KorisnikController korisnikController;

  @Autowired
  private UciteljService uciteljService;

  @Autowired
  private UcenikService ucenikService;

  @GetMapping("/mojelekcije")
  public List<Lekcija> getLekcije(OAuth2AuthenticationToken authentication) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return null;

    List<Lekcija> lista = new ArrayList<>();

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());
    if (ucitelj != null) lista.addAll(
      lekcijaService.getLekcijeByUciteljId(ucitelj.getId())
    );

    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());
    if (ucenik != null) lista.addAll(
      lekcijaService.getLekcijeByUcenikId(ucenik.getId())
    );

    return lista;
  }

  @GetMapping("/mojelekcije/ucitelj")
  public List<Lekcija> getLekcijeUcitelj(
    OAuth2AuthenticationToken authentication
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return null;

    List<Lekcija> lista = new ArrayList<>();

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());
    if (ucitelj != null) lista.addAll(
      lekcijaService.getLekcijeByUciteljId(ucitelj.getId())
    );

    return lista;
  }

  @GetMapping("/mojelekcije/ucitelj/novizahtjevi")
  public List<Lekcija> getLekcijeUciteljNoviZahtjevi(
    OAuth2AuthenticationToken authentication
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return null;

    List<Lekcija> lista = new ArrayList<>();

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());
    if (ucitelj != null) lista.addAll(
      lekcijaService.getLekcijeByUciteljIdAndByStatusPending(ucitelj.getId())
    );

    return lista;
  }

  @GetMapping("/mojelekcije/ucenik")
  public List<Lekcija> getLekcijeUcenik(
    OAuth2AuthenticationToken authentication
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return null;

    List<Lekcija> lista = new ArrayList<>();

    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());
    if (ucenik != null) lista.addAll(
      lekcijaService.getLekcijeByUcenikId(ucenik.getId())
    );

    return lista;
  }

  @PostMapping("/dodajlekciju")
  public ResponseEntity<Void> addLekcijaUcitelj(
    OAuth2AuthenticationToken authentication,
    @RequestBody Lekcija lekcija
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return ResponseEntity.badRequest().build();

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());

    if (ucitelj == null) return ResponseEntity.badRequest().build();

    try {
      lekcijaService.addLekcija(lekcija, ucitelj);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }

    return ResponseEntity.ok().build();
  }

  @PutMapping("/rezervirajlekciju/{idLekcije}")
  public ResponseEntity<Void> reservationLekcija(
    OAuth2AuthenticationToken authentication,
    @PathVariable Long idLekcije
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return ResponseEntity.badRequest().build();

    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());

    if (ucenik == null) return ResponseEntity.badRequest().build();

    try {
      lekcijaService.rezervirajLekciju(idLekcije, ucenik);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }

    return ResponseEntity.ok().build();
  }

  @PutMapping("/prihvatirezervacijulekcije/{idLekcije}")
  public ResponseEntity<Void> acceptReservationLekcijaUcitelj(
    OAuth2AuthenticationToken authentication,
    @PathVariable Long idLekcije
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return ResponseEntity.badRequest().build();

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());

    if (ucitelj == null) return ResponseEntity.badRequest().build();

    Lekcija lekcija;
    try {
      lekcija = lekcijaService.getLekcijaById(idLekcije);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }

    if (lekcija.getStatus() != Status.PENDING) return ResponseEntity
      .badRequest()
      .build();

    if (
      lekcijaService.getLekcijeByUciteljId(ucitelj.getId()).contains(lekcija)
    ) try {
      lekcijaService.prihvatiRezervacijuLekcije(idLekcije);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @PutMapping("/otkazirezervacijulekcije/{idLekcije}")
  public ResponseEntity<Void> cancelReservationLekcije(
    OAuth2AuthenticationToken authentication,
    @PathVariable Long idLekcije
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return ResponseEntity.badRequest().build();

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());
    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());

    try {
      if (ucitelj != null) {
        if (
          lekcijaService
            .getLekcijeByUciteljId(ucitelj.getId())
            .contains(lekcijaService.getLekcijaById(idLekcije))
        ) lekcijaService.otkaziRezervacijuLekcije(idLekcije);
      } else if (ucenik != null) {
        if (
          lekcijaService
            .getLekcijeByUcenikId(ucenik.getId())
            .contains(lekcijaService.getLekcijaById(idLekcije))
        ) lekcijaService.otkaziRezervacijuLekcije(idLekcije);
      } else return ResponseEntity.badRequest().build();
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }

    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/izbrisimojulekciju/{idLekcije}")
  public ResponseEntity<Void> deleteLekcijaUcitelj(
    OAuth2AuthenticationToken authentication,
    @PathVariable Long idLekcije
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) return ResponseEntity.badRequest().build();

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());

    if (ucitelj == null) return ResponseEntity.badRequest().build();

    try {
      if (
        lekcijaService
          .getLekcijeByUciteljId(ucitelj.getId())
          .contains(lekcijaService.getLekcijaById(idLekcije))
      ) lekcijaService.deleteLekcijaById(idLekcije);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }

    return ResponseEntity.ok().build();
  }

  @RequestMapping("/lekcije")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Lekcija> getSveLekcije() {
    return lekcijaService.getSveLekcije();
  }

  @RequestMapping("/lekcije/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public Lekcija getLekcijaById(@PathVariable Long id) {
    try {
      return lekcijaService.getLekcijaById(id);
    } catch (Exception e) {
      return null;
    }
  }

  @RequestMapping("/ucitelji/{id}/lekcije")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Lekcija> getLekcijeByUciteljId(@PathVariable Long id) {
    return lekcijaService.getLekcijeByUciteljId(id);
  }

  @RequestMapping("/ucenici/{id}/lekcije")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Lekcija> getLekcijeByUcenikId(@PathVariable Long id) {
    return lekcijaService.getLekcijeByUcenikId(id);
  }

  @RequestMapping(
    value = "/lekcije/{idUcitelja}/{idUcenika}",
    method = RequestMethod.POST
  )
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Void> addLekcija(
    @RequestBody Lekcija lekcija,
    @PathVariable Long idUcitelja,
    @PathVariable Long idUcenika
  ) {
    try {
      lekcijaService.addLekcijaExplicit(
        lekcija,
        uciteljService.getUciteljById(idUcitelja),
        ucenikService.getUcenikById(idUcenika)
      );
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @RequestMapping(value = "/lekcije/{id}", method = RequestMethod.PUT)
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Void> updateLekcijaById(
    @RequestBody Lekcija lekcija,
    @PathVariable Long id
  ) {
    try {
      lekcijaService.updateLekcijaById(id, lekcija);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @RequestMapping(value = "/lekcije/{id}", method = RequestMethod.DELETE)
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteLekcijaById(@PathVariable Long id) {
    lekcijaService.deleteLekcijaById(id);
  }

  @RequestMapping(value = "/lekcije/deleteall", method = RequestMethod.DELETE)
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteLekcijaAll() {
    lekcijaService.deleteLekcijaAll();
  }
}
