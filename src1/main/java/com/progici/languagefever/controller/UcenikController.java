package com.progici.languagefever.controller;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.Lekcija;
import com.progici.languagefever.model.Ocjena;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.dto.UcenikDTO;
import com.progici.languagefever.service.KorisnikService;
import com.progici.languagefever.service.LekcijaService;
import com.progici.languagefever.service.OcjenaService;
import com.progici.languagefever.service.UcenikJeziciService;
import com.progici.languagefever.service.UcenikService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class UcenikController {

  @Autowired
  private UcenikService ucenikService;

  @Autowired
  private KorisnikService korisnikService;

  @Autowired
  private OcjenaService ocjenaService;

  @Autowired
  private LekcijaService lekcijaService;

  @Autowired
  private UcenikJeziciService ucenikJeziciService;

  @Autowired
  private KorisnikController korisnikController;

  //
  //  USER ENDPOINTS
  //

  @GetMapping("/trenutniucenik")
  public UcenikDTO getCurrentUcenikDTO(
    OAuth2AuthenticationToken authentication
  ) {
    Ucenik ucenik = getCurrentUcenik(authentication);

    return new UcenikDTO(
      ucenik.getId(),
      ucenik.getKorisnik().getName(),
      ucenik.getKorisnik().getPicture(),
      ucenikJeziciService.getJeziciStringByUcenikId(ucenik.getId()),
      ucenik.getRazina(),
      ucenik.getStilUcenja(),
      ucenik.getCiljevi()
    );
  }

  @PostMapping("/azurirajucenika")
  public void updateCurrentUcenikDTO(
    OAuth2AuthenticationToken authentication,
    @RequestBody UcenikDTO ucenikDTO
  ) {
    Korisnik korisnik = korisnikController.getCurrentUser(authentication);

    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());

    if (ucenik == null) {
      ucenikService.addUcenik(
        new Ucenik(
          korisnik,
          ucenikDTO.getRazina(),
          ucenikDTO.getStilUcenja(),
          ucenikDTO.getCiljevi()
        )
      );
    } else {
      ucenikService.updateUcenikByKorisnikId(
        korisnik.getId(),
        new Ucenik(
          korisnik,
          ucenikDTO.getRazina(),
          ucenikDTO.getStilUcenja(),
          ucenikDTO.getCiljevi()
        )
      );
    }

    //update jezika ucenika
    ucenikJeziciService.addJeziciToUcenik(
      ucenikDTO.getJezici(),
      ucenikService.getUcenikByKorisnikId(korisnik.getId())
    );
  }

  @DeleteMapping("/izbrisiucenika")
  public void deleteCurrentUcenik(OAuth2AuthenticationToken authentication) {
    deleteUcenikByKorisnikId(
      korisnikController.getCurrentUser(authentication).getId()
    );
  }

  //
  //  ADMIN ENDPOINTS
  //

  @GetMapping("/ucenici")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<UcenikDTO> getSviUcenici() {
    return ucenikService
      .getSviUcenici()
      .stream()
      .map(ucenik ->
        new UcenikDTO(
          ucenik.getKorisnik().getId(),
          ucenik.getKorisnik().getName(),
          ucenik.getKorisnik().getPicture(),
          ucenikJeziciService.getJeziciStringByUcenikId(ucenik.getId()),
          ucenik.getRazina(),
          ucenik.getStilUcenja(),
          ucenik.getCiljevi()
        )
      )
      .collect(Collectors.toList());
  }

  @GetMapping("/ucenici/{idKorisnika}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public UcenikDTO getUcenikDTOByKorisnikId(@PathVariable Long idKorisnika) {
    Ucenik ucenik = getUcenikByKorisnikId(idKorisnika);

    return new UcenikDTO(
      ucenik.getId(),
      ucenik.getKorisnik().getName(),
      ucenik.getKorisnik().getPicture(),
      ucenikJeziciService.getJeziciStringByUcenikId(ucenik.getId()),
      ucenik.getRazina(),
      ucenik.getStilUcenja(),
      ucenik.getCiljevi()
    );
  }

  @PostMapping("/ucenici/{idKorisnika}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void updateUcenikByKorisnikId(
    @PathVariable Long idKorisnika,
    @RequestBody UcenikDTO ucenikDTO
  ) {
    Korisnik korisnik = korisnikService.getKorisnikById(idKorisnika);

    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());

    if (ucenik == null) {
      ucenikService.addUcenik(
        new Ucenik(
          korisnik,
          ucenikDTO.getRazina(),
          ucenikDTO.getStilUcenja(),
          ucenikDTO.getCiljevi()
        )
      );
    } else {
      ucenikService.updateUcenikByKorisnikId(
        korisnik.getId(),
        new Ucenik(
          korisnik,
          ucenikDTO.getRazina(),
          ucenikDTO.getStilUcenja(),
          ucenikDTO.getCiljevi()
        )
      );
    }

    //update jezika ucenika
    ucenikJeziciService.addJeziciToUcenik(
      ucenikDTO.getJezici(),
      ucenikService.getUcenikByKorisnikId(korisnik.getId())
    );
  }

  @DeleteMapping("/ucenici/{idKorisnika}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteUcenikByKorisnikId(@PathVariable Long idKorisnika) {
    Ucenik ucenik = getUcenikByKorisnikId(idKorisnika);

    ucenikJeziciService.deleteJeziciByUcenikId(ucenik.getId());

    List<Lekcija> lekcije = lekcijaService.getLekcijeByUcenikId(ucenik.getId());
    for (Lekcija lekcija : lekcije) {
      lekcijaService.deleteLekcijaById(lekcija.getId());
    }

    List<Ocjena> ocjene = ocjenaService.getOcjeneByUcenikId(ucenik.getId());
    for (Ocjena ocjena : ocjene) {
      ocjenaService.deleteOcjenaById(ocjena.getId());
    }

    ucenikService.deleteUcenikById(ucenik.getId());
  }

  // HELPER FUNCTIONS

  public Ucenik getCurrentUcenik(OAuth2AuthenticationToken authentication) {
    Korisnik korisnik = korisnikController.getCurrentUser(authentication);

    return getUcenikByKorisnikId(korisnik.getId());
  }

  public Ucenik getUcenikById(Long id) {
    Ucenik ucenik;
    try {
      ucenik = ucenikService.getUcenikById(id);
    } catch (Exception e) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Ucenik not found"
      );
    }

    return ucenik;
  }

  public Ucenik getUcenikByKorisnikId(Long id) {
    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(id);

    if (ucenik == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Ucitelj not found"
    );

    return ucenik;
  }
}
