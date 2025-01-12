package com.progici.languagefever.controller;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.Lekcija;
import com.progici.languagefever.model.Ocjena;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.model.dto.LekcijaDTO;
import com.progici.languagefever.model.dto.OcjenaDTO;
import com.progici.languagefever.model.enums.Status;
import com.progici.languagefever.service.LekcijaService;
import com.progici.languagefever.service.UcenikService;
import com.progici.languagefever.service.UciteljService;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
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
  private UciteljController uciteljController;

  @Autowired
  private UcenikController ucenikController;

  @Autowired
  private UcenikService ucenikService;

  //
  //  USER ENDPOINTS
  //

  @GetMapping("/mojelekcije/ucitelj")
  public List<LekcijaDTO> getLekcijeUcitelj(
    OAuth2AuthenticationToken authentication
  ) {
    Ucitelj ucitelj = uciteljController.getCurrentUcitelj(authentication);

    List<Lekcija> lekcije = lekcijaService.getLekcijeByUciteljId(
      ucitelj.getId()
    );

    return lekcije
      .stream()
      .map(lekcija -> {
        String ucenikName = (
            lekcija.getUcenik() != null &&
            lekcija.getUcenik().getKorisnik() != null
          )
          ? lekcija.getUcenik().getKorisnik().getName()
          : null;

        String uciteljName = (
            lekcija.getUcitelj() != null &&
            lekcija.getUcitelj().getKorisnik() != null
          )
          ? lekcija.getUcitelj().getKorisnik().getName()
          : null;

        return new LekcijaDTO(
          lekcija.getId(),
          lekcija.getTimestampPocetka(),
          lekcija.getTimestampZavrsetka(),
          lekcija.getStatus(),
          ucenikName,
          uciteljName
        );
      })
      .collect(Collectors.toList());
  }

  @GetMapping("/mojelekcije/ucitelj/novizahtjevi")
  public List<LekcijaDTO> getLekcijeUciteljNoviZahtjevi(
    OAuth2AuthenticationToken authentication
  ) {
    Ucitelj ucitelj = uciteljController.getCurrentUcitelj(authentication);

    List<Lekcija> lekcije = lekcijaService.getLekcijeByUciteljIdAndByStatusPending(
      ucitelj.getId()
    );

    return lekcije
      .stream()
      .map(lekcija -> {
        String ucenikName = (
            lekcija.getUcenik() != null &&
            lekcija.getUcenik().getKorisnik() != null
          )
          ? lekcija.getUcenik().getKorisnik().getName()
          : null;

        String uciteljName = (
            lekcija.getUcitelj() != null &&
            lekcija.getUcitelj().getKorisnik() != null
          )
          ? lekcija.getUcitelj().getKorisnik().getName()
          : null;

        return new LekcijaDTO(
          lekcija.getId(),
          lekcija.getTimestampPocetka(),
          lekcija.getTimestampZavrsetka(),
          lekcija.getStatus(),
          ucenikName,
          uciteljName
        );
      })
      .collect(Collectors.toList());
  }

  @GetMapping("/mojelekcije/ucenik")
  public List<LekcijaDTO> getLekcijeUcenik(
    OAuth2AuthenticationToken authentication
  ) {
    Ucenik ucenik = ucenikController.getCurrentUcenik(authentication);

    List<Lekcija> lekcije = lekcijaService.getLekcijeByUcenikId(ucenik.getId());

    return lekcije
      .stream()
      .map(lekcija -> {
        String ucenikName = (
            lekcija.getUcenik() != null &&
            lekcija.getUcenik().getKorisnik() != null
          )
          ? lekcija.getUcenik().getKorisnik().getName()
          : null;

        String uciteljName = (
            lekcija.getUcitelj() != null &&
            lekcija.getUcitelj().getKorisnik() != null
          )
          ? lekcija.getUcitelj().getKorisnik().getName()
          : null;

        return new LekcijaDTO(
          lekcija.getId(),
          lekcija.getTimestampPocetka(),
          lekcija.getTimestampZavrsetka(),
          lekcija.getStatus(),
          ucenikName,
          uciteljName
        );
      })
      .collect(Collectors.toList());
  }

  @GetMapping("/mojelekcije/ucenik/prihvacenizahtjevi")
  public List<Lekcija> getLekcijeUcenikPrihvaceneLekcije(
    OAuth2AuthenticationToken authentication
  ) {
    Ucenik ucenik = ucenikController.getCurrentUcenik(authentication);

    return lekcijaService.getLekcijeByUcenikIdAndByStatusAccepted(
      ucenik.getId()
    );
  }

  @PostMapping("/dodajlekciju")
  public ResponseEntity<Void> addLekcijaUcitelj(
    OAuth2AuthenticationToken authentication,
    @RequestBody Lekcija lekcija
  ) {
    Ucitelj ucitelj = uciteljController.getCurrentUcitelj(authentication);
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
    Ucenik ucenik = ucenikController.getCurrentUcenik(authentication);
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
    Ucitelj ucitelj = uciteljController.getCurrentUcitelj(authentication);
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
    Korisnik korisnik = korisnikController.getCurrentUser(authentication);
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
    Ucitelj ucitelj = uciteljController.getCurrentUcitelj(authentication);
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

  @GetMapping("/ucitelji/{idKorisnika}/lekcije")
  public List<Lekcija> getLekcijeByUciteljId(@PathVariable Long idKorisnika) {
    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(idKorisnika);
    return lekcijaService.getLekcijeByUciteljId(ucitelj.getId());
  }

  //
  //  ADMIN ENDPOINTS
  //

  @GetMapping("/lekcije")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Lekcija> getSveLekcije() {
    return lekcijaService.getSveLekcije();
  }

  @GetMapping("/lekcije/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public Lekcija getLekcijaById(@PathVariable Long id) {
    try {
      return lekcijaService.getLekcijaById(id);
    } catch (Exception e) {
      return null;
    }
  }

  @GetMapping("/ucenici/{id}/lekcije")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Lekcija> getLekcijeByUcenikId(@PathVariable Long id) {
    return lekcijaService.getLekcijeByUcenikId(id);
  }

  @PostMapping("/lekcije/{idUcitelja}/{idUcenika}")
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

  @PutMapping("/lekcije/{id}")
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

  @DeleteMapping("/lekcije/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteLekcijaById(@PathVariable Long id) {
    lekcijaService.deleteLekcijaById(id);
  }

  @DeleteMapping("/lekcije/deleteall")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteLekcijaAll() {
    lekcijaService.deleteLekcijaAll();
  }
}
