package com.progici.languagefever.controller;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.dto.UcenikDTO;
import com.progici.languagefever.service.KorisnikService;
import com.progici.languagefever.service.UcenikJeziciService;
import com.progici.languagefever.service.UcenikService;
import java.util.Collections;
import java.util.Map;
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
  private UcenikJeziciService ucenikJeziciService;

  @Autowired
  private KorisnikController korisnikController;

  //
  //  USER ENDPOINTS
  //

  @GetMapping("/trenutniucenik")
  public UcenikDTO getCurrentUcenik(OAuth2AuthenticationToken authentication) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Korisnik not found"
    );

    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());

    if (ucenik == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Ucenik not found"
    );

    return new UcenikDTO(
      ucenikJeziciService.getJeziciStringByUcenikId(ucenik.getId()),
      ucenik.getRazina(),
      ucenik.getStilUcenja(),
      ucenik.getCiljevi()
    );
  }

  @PostMapping("/azurirajucenika")
  public void updateCurrentUcenik(
    OAuth2AuthenticationToken authentication,
    @RequestBody UcenikDTO ucenikDTO
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Korisnik not found"
    );

    Ucenik trenutniUcenik = ucenikService.getUcenikByKorisnikId(
      korisnik.getId()
    );

    if (trenutniUcenik == null) {
      ucenikService.addUcenik(
        new Ucenik(
          korisnik,
          ucenikDTO.getRazina(),
          ucenikDTO.getstilUcenja(),
          ucenikDTO.getciljevi()
        )
      );
    } else {
      ucenikService.updateUcenikByKorisnikId(
        korisnik.getId(),
        new Ucenik(
          korisnik,
          ucenikDTO.getRazina(),
          ucenikDTO.getstilUcenja(),
          ucenikDTO.getciljevi()
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
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Korisnik not found"
    );

    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());

    if (ucenik == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Ucenik not found"
    );

    ucenikJeziciService.deleteJeziciByUcenikId(ucenik.getId());
    ucenikService.deleteUcenikById(ucenik.getId());
  }

  //
  //  ADMIN ENDPOINTS
  //

  @GetMapping("/ucenici")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public Map<Korisnik, UcenikDTO> getSviUcenici() {
    return ucenikService
      .getSviUcenici()
      .stream()
      .collect(
        Collectors.toMap(
          Ucenik::getKorisnik,
          ucenik ->
            new UcenikDTO(
              ucenikJeziciService.getJeziciStringByUcenikId(ucenik.getId()),
              ucenik.getRazina(),
              ucenik.getStilUcenja(),
              ucenik.getCiljevi()
            )
        )
      );
  }

  @GetMapping("/ucenici/{idKorisnika}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public Map<Korisnik, UcenikDTO> getUcenikByKorisnikId(
    @PathVariable Long idKorisnika
  ) {
    Korisnik korisnik;
    try {
      korisnik = korisnikService.getKorisnikById(idKorisnika);
    } catch (Exception e) {
      korisnik = null;
    }
    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(idKorisnika);

    if (korisnik == null || ucenik == null) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Korisnik or Ucenik not found"
      );
    }

    UcenikDTO ucenikDTO = new UcenikDTO(
      ucenikJeziciService.getJeziciStringByUcenikId(ucenik.getId()),
      ucenik.getRazina(),
      ucenik.getStilUcenja(),
      ucenik.getCiljevi()
    );

    return Collections.singletonMap(korisnik, ucenikDTO);
  }

  @PostMapping("/ucenici/{idKorisnika}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void updateUcenikByKorisnikId(
    @PathVariable Long idKorisnika,
    @RequestBody UcenikDTO ucenikDTO
  ) {
    Korisnik korisnik;
    try {
      korisnik = korisnikService.getKorisnikById(idKorisnika);
    } catch (Exception e) {
      korisnik = null;
    }

    if (korisnik == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Korisnik not found"
    );

    Ucenik trenutniUcenik = ucenikService.getUcenikByKorisnikId(
      korisnik.getId()
    );

    if (trenutniUcenik == null) {
      ucenikService.addUcenik(
        new Ucenik(
          korisnik,
          ucenikDTO.getRazina(),
          ucenikDTO.getstilUcenja(),
          ucenikDTO.getciljevi()
        )
      );
    } else {
      ucenikService.updateUcenikByKorisnikId(
        korisnik.getId(),
        new Ucenik(
          korisnik,
          ucenikDTO.getRazina(),
          ucenikDTO.getstilUcenja(),
          ucenikDTO.getciljevi()
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
    Korisnik korisnik;
    try {
      korisnik = korisnikService.getKorisnikById(idKorisnika);
    } catch (Exception e) {
      korisnik = null;
    }

    if (korisnik == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Korisnik not found"
    );

    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());

    if (ucenik == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Ucenik not found"
    );

    ucenikJeziciService.deleteJeziciByUcenikId(ucenik.getId());
    ucenikService.deleteUcenikById(ucenik.getId());
  }
}
