package com.progici.languagefever.controller;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.Lekcija;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.model.dto.UciteljDTO;
import com.progici.languagefever.service.KorisnikService;
import com.progici.languagefever.service.LekcijaService;
import com.progici.languagefever.service.UciteljJeziciService;
import com.progici.languagefever.service.UciteljService;
import java.util.Collections;
import java.util.List;
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
public class UciteljController {

  @Autowired
  private UciteljService uciteljService;

  @Autowired
  private KorisnikService korisnikService;

  @Autowired
  private LekcijaService lekcijaService;

  @Autowired
  private UciteljJeziciService uciteljJeziciService;

  @Autowired
  private KorisnikController korisnikController;

  //
  //  USER ENDPOINTS
  //

  @GetMapping("/trenutniucitelj")
  public UciteljDTO getCurrentUciteljDTO(
    OAuth2AuthenticationToken authentication
  ) {
    Korisnik korisnik = korisnikController.getCurrentUser(authentication);

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());

    if (ucitelj == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Ucitelj not found"
    );

    return new UciteljDTO(
      ucitelj.getId(),
      korisnik.getName(),
      korisnik.getPicture(),
      uciteljJeziciService.getJeziciStringByUciteljId(ucitelj.getId()),
      ucitelj.getGodineIskustva(),
      ucitelj.getKvalifikacija(),
      ucitelj.getStilPoducavanja(),
      ucitelj.getSatnica()
    );
  }

  @GetMapping("/ucitelji/{idKorisnika}/poducavaniucenicibroj")
  public Long getPoducavaniUceniciBrojUcitelj(@PathVariable Long idKorisnika) {
    return (long) getPoducavaniUceniciUcitelj(idKorisnika).size();
  }

  @GetMapping("/ucitelji/{idKorisnika}/dovrsenelekcijebroj")
  public Long getDovrseneLekcijeBrojUcitelj(@PathVariable Long idKorisnika) {
    return (long) getDovrseneLekcijeUcitelj(idKorisnika).size();
  }

  @GetMapping("/ucitelji")
  public List<UciteljDTO> getSviUcitelji() {
    return uciteljService
      .getSviUcitelji()
      .stream()
      .map(ucitelj ->
        new UciteljDTO(
          ucitelj.getId(),
          ucitelj.getKorisnik().getName(),
          ucitelj.getKorisnik().getPicture(),
          uciteljJeziciService.getJeziciStringByUciteljId(ucitelj.getId()),
          ucitelj.getGodineIskustva(),
          ucitelj.getKvalifikacija(),
          ucitelj.getStilPoducavanja(),
          ucitelj.getSatnica()
        )
      )
      .collect(Collectors.toList());
  }

  @GetMapping("/ucitelji/{idKorisnika}")
  public Map<Korisnik, UciteljDTO> getUcenikByKorisnikId(
    @PathVariable Long idKorisnika
  ) {
    Korisnik korisnik;
    try {
      korisnik = korisnikService.getKorisnikById(idKorisnika);
    } catch (Exception e) {
      korisnik = null;
    }
    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(idKorisnika);

    if (korisnik == null || ucitelj == null) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Korisnik or Ucitelj not found"
      );
    }

    UciteljDTO uciteljDTO = new UciteljDTO(
      ucitelj.getId(),
      korisnik.getName(),
      korisnik.getPicture(),
      uciteljJeziciService.getJeziciStringByUciteljId(ucitelj.getId()),
      ucitelj.getGodineIskustva(),
      ucitelj.getKvalifikacija(),
      ucitelj.getStilPoducavanja(),
      ucitelj.getSatnica()
    );

    return Collections.singletonMap(korisnik, uciteljDTO);
  }

  @PostMapping("/azurirajucitelja")
  public void updateCurrentUciteljDTO(
    OAuth2AuthenticationToken authentication,
    @RequestBody UciteljDTO uciteljDTO
  ) {
    Korisnik korisnik = korisnikController.getCurrentUser(authentication);

    Ucitelj trenutniUcitelj = uciteljService.getUciteljByKorisnikId(
      korisnik.getId()
    );

    if (trenutniUcitelj == null) {
      uciteljService.addUcitelj(
        new Ucitelj(
          korisnik,
          uciteljDTO.getGodineIskustva(),
          uciteljDTO.getKvalifikacija(),
          uciteljDTO.getStilPoducavanja(),
          uciteljDTO.getSatnica()
        )
      );
    } else {
      uciteljService.updateUciteljByKorisnikId(
        korisnik.getId(),
        new Ucitelj(
          korisnik,
          uciteljDTO.getGodineIskustva(),
          uciteljDTO.getKvalifikacija(),
          uciteljDTO.getStilPoducavanja(),
          uciteljDTO.getSatnica()
        )
      );
    }

    //update jezika ucitelja
    uciteljJeziciService.addJeziciToUcitelj(
      uciteljDTO.getJezici(),
      uciteljService.getUciteljByKorisnikId(korisnik.getId())
    );
  }

  @DeleteMapping("/izbrisiucitelja")
  public void deleteCurrentUcitelj(OAuth2AuthenticationToken authentication) {
    Korisnik korisnik = korisnikController.getCurrentUser(authentication);

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());

    if (ucitelj == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Ucitelj not found"
    );

    uciteljJeziciService.deleteJeziciByUciteljId(ucitelj.getId());
    uciteljService.deleteUciteljById(ucitelj.getId());
  }

  //
  //  ADMIN ENDPOINTS
  //

  @GetMapping("/ucitelji/{idKorisnika}/poducavaniucenici")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Ucenik> getPoducavaniUceniciUcitelj(
    @PathVariable Long idKorisnika
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

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());

    if (ucitelj == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Ucitelj not found"
    );

    List<Ucenik> listaPoducavanihUcenika = lekcijaService.getUceniciByUciteljIdAndByLekcijaStatusFinished(
      ucitelj.getId()
    );
    return listaPoducavanihUcenika;
  }

  @GetMapping("/ucitelji/{idKorisnika}/dovrsenelekcije")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Lekcija> getDovrseneLekcijeUcitelj(
    @PathVariable Long idKorisnika
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

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());

    if (ucitelj == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Ucitelj not found"
    );

    List<Lekcija> listaDovrsenihLekcija = lekcijaService.getLekcijeByUciteljIdAndByStatusFinished(
      ucitelj.getId()
    );
    return listaDovrsenihLekcija;
  }

  @PostMapping("/ucitelji/{idKorisnika}")
  public void updateUciteljByKorisnikId(
    @PathVariable Long idKorisnika,
    @RequestBody UciteljDTO uciteljDTO
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

    Ucitelj trenutniUcitelj = uciteljService.getUciteljByKorisnikId(
      korisnik.getId()
    );

    if (trenutniUcitelj == null) {
      uciteljService.addUcitelj(
        new Ucitelj(
          korisnik,
          uciteljDTO.getGodineIskustva(),
          uciteljDTO.getKvalifikacija(),
          uciteljDTO.getStilPoducavanja(),
          uciteljDTO.getSatnica()
        )
      );
    } else {
      uciteljService.updateUciteljByKorisnikId(
        korisnik.getId(),
        new Ucitelj(
          korisnik,
          uciteljDTO.getGodineIskustva(),
          uciteljDTO.getKvalifikacija(),
          uciteljDTO.getStilPoducavanja(),
          uciteljDTO.getSatnica()
        )
      );
    }

    //update jezika ucitelja
    uciteljJeziciService.addJeziciToUcitelj(
      uciteljDTO.getJezici(),
      uciteljService.getUciteljByKorisnikId(korisnik.getId())
    );
  }

  @DeleteMapping("/ucitelji/{idKorisnika}")
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

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());

    if (ucitelj == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Ucitelj not found"
    );

    uciteljJeziciService.deleteJeziciByUciteljId(ucitelj.getId());
    uciteljService.deleteUciteljById(ucitelj.getId());
  }

  public Ucitelj getCurrentUcitelj(OAuth2AuthenticationToken authentication) {
    Korisnik korisnik = korisnikController.getCurrentUser(authentication);

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());

    if (ucitelj == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Ucitelj not found"
    );

    return ucitelj;
  }
}
