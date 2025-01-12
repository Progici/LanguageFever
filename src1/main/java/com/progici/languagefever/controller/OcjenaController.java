package com.progici.languagefever.controller;

import com.progici.languagefever.model.Ocjena;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.model.dto.OcjenaDTO;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OcjenaController {

  @Autowired
  private OcjenaService ocjenaService;

  @Autowired
  private UciteljService uciteljService;

  @Autowired
  private UcenikService ucenikService;

  @Autowired
  private LekcijaService lekcijaService;

  @Autowired
  private UcenikController ucenikController;

  //
  //  USER ENDPOINTS
  //

  @GetMapping("/mojeocjene")
  public List<Ocjena> getSveMojeOcjene(
    OAuth2AuthenticationToken authentication
  ) {
    Ucenik ucenik = ucenikController.getCurrentUcenik(authentication);
    return ocjenaService.getOcjeneByUcenikId(ucenik.getId());
  }

  @GetMapping("/mojeocjene/{idUcitelja}")
  public List<Ocjena> getSveMojeOcjeneByCertainUciteljId(
    OAuth2AuthenticationToken authentication,
    @PathVariable Long idUcitelja
  ) {
    Ucenik ucenik = ucenikController.getCurrentUcenik(authentication);
    return ocjenaService
      .getOcjeneByUcenikId(ucenik.getId())
      .stream()
      .filter(ocjena -> ocjena.getUcitelj().getId().equals(idUcitelja))
      .collect(Collectors.toList());
  }

  @GetMapping("/ucitelji/{idKorisnika}/ocjenebroj")
  public Long getOcjeneBrojByUciteljKorisnikId(@PathVariable Long idKorisnika) {
    return (long) ocjenaService
      .getOcjeneByUciteljId(
        uciteljService.getUciteljByKorisnikId(idKorisnika).getId()
      )
      .size();
  }

  // @GetMapping("/ucitelji/{idKorisnika}/ocjenebroj")

  // @GetMapping("/ucitelji/{idKorisnika}/ocjeneaverage")

  public Double getProsjecnaOcjenaByUciteljId(@PathVariable Long id) {
    List<Ocjena> ocjene = ocjenaService.getOcjeneByUciteljId(id);

    return ocjene.stream().mapToInt(Ocjena::getOcjena).average().orElse(0.0);
  }

  // @SuppressWarnings("unlikely-arg-type")
  // @PostMapping("/ucitelji/{idKorisnika}/ocjene")
  // public ResponseEntity<Void> addMojaOcjena(
  //   OAuth2AuthenticationToken authentication,
  //   @RequestBody Ocjena ocjena,
  //   @PathVariable Long idKorisnika
  // ) {
  //   Ucenik ucenik = ucenikController.getCurrentUcenik(authentication);
  //   Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(idKorisnika);
  //   try {
  //     if (
  //       lekcijaService
  //         .getLekcijeByUcenikId(ucenik.getId())
  //         .contains(lekcijaService.getLekcijeByUciteljId(ucitelj.getId()))
  //     ) {
  //       ocjena.setUcenik(ucenik);
  //       ocjena.setUcitelj(ucitelj);
  //       ocjenaService.addOcjena(ocjena);
  //     } else return ResponseEntity.badRequest().build();
  //   } catch (Exception e) {
  //     return ResponseEntity.badRequest().build();
  //   }

  //   return ResponseEntity.ok().build();
  // }

  @GetMapping("/ucitelji/{idKorisnika}/ocjene")
  public List<OcjenaDTO> getOcjeneByKorisnikId(@PathVariable Long idKorisnika) {
    List<Ocjena> ocjene = ocjenaService.getOcjeneByUciteljId(
      uciteljService.getUciteljByKorisnikId(idKorisnika).getId()
    );

    return ocjene
      .stream()
      .map(ocjena -> {
        return new OcjenaDTO(
          ocjena.getOcjena(),
          ocjena.getKomentar(),
          ocjena.getUcenik().getKorisnik().getName(),
          ocjena.getUcitelj().getKorisnik().getName()
        );
      })
      .collect(Collectors.toList()); // Collect the list of mapped DTOs
  }

  public List<OcjenaDTO> getOcjeneByUciteljId(@PathVariable Long id) {
    List<Ocjena> ocjene = ocjenaService.getOcjeneByUciteljId(id);

    return ocjene
      .stream()
      .map(ocjena -> {
        return new OcjenaDTO(
          ocjena.getOcjena(),
          ocjena.getKomentar(),
          ocjena.getUcenik().getKorisnik().getName(),
          ocjena.getUcitelj().getKorisnik().getName()
        );
      })
      .collect(Collectors.toList()); // Collect the list of mapped DTOs
  }

  @PostMapping("/ucitelji/{idKorisnika}/ocjene")
  public ResponseEntity<Void> addMojaOcjena(
    OAuth2AuthenticationToken authentication,
    @RequestBody Ocjena ocjena,
    @PathVariable Long idKorisnika
  ) {
    Ucenik ucenik = ucenikController.getCurrentUcenik(authentication);
    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(idKorisnika);
    try {
      ocjena.setUcenik(ucenik);
      ocjena.setUcitelj(ucitelj);
      ocjenaService.addOcjena(ocjena);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }

    return ResponseEntity.ok().build();
  }

  @PutMapping("/mojeocjene/{id}")
  public ResponseEntity<Void> updateMojaOcjenaById(
    OAuth2AuthenticationToken authentication,
    @RequestBody Ocjena ocjena,
    @PathVariable Long id
  ) {
    Ucenik ucenik = ucenikController.getCurrentUcenik(authentication);

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

  @DeleteMapping("/mojeocjene/{id}")
  public ResponseEntity<Void> DeleteMojaOcjenaById(
    OAuth2AuthenticationToken authentication,
    @PathVariable Long id
  ) {
    Ucenik ucenik = ucenikController.getCurrentUcenik(authentication);

    try {
      if (
        ocjenaService
          .getOcjeneByUcenikId(ucenik.getId())
          .contains(ocjenaService.getOcjenaById(id))
      ) ocjenaService.deleteOcjenaById(id); else return ResponseEntity
        .badRequest()
        .build();
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  //
  //  ADMIN ENDPOINTS
  //

  @GetMapping("/ocjene")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Ocjena> getSveOcjene() {
    return ocjenaService.getSveOcjene();
  }

  @GetMapping("/ocjene/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public Ocjena getOcjenaById(@PathVariable Long id) {
    try {
      return ocjenaService.getOcjenaById(id);
    } catch (Exception e) {
      return null;
    }
  }

  @GetMapping("/ucenici/{id}/ocjene")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Ocjena> getOcjeneByUcenikId(@PathVariable Long id) {
    return ocjenaService.getOcjeneByUcenikId(id);
  }

  @PostMapping("/ocjene/{idUcitelja}/{idUcenika}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Void> addOcjena(
    @RequestBody Ocjena ocjena,
    @PathVariable Long idUcitelja,
    @PathVariable Long idUcenika
  ) {
    try {
      ocjena.setUcitelj(uciteljService.getUciteljById(idUcitelja));
      ocjena.setUcenik(ucenikService.getUcenikById(idUcenika));
      ocjenaService.addOcjena(ocjena);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @PutMapping("/ocjene/{id}")
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

  @DeleteMapping("/ocjene/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteOcjenaById(@PathVariable Long id) {
    ocjenaService.deleteOcjenaById(id);
  }

  @DeleteMapping("/ocjene/deleteall")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteOcjenaAll() {
    ocjenaService.deleteOcjenaAll();
  }
}
