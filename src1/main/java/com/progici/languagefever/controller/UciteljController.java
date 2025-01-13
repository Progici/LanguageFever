package com.progici.languagefever.controller;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.Lekcija;
import com.progici.languagefever.model.Ocjena;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.model.dto.UciteljDTO;
import com.progici.languagefever.model.enums.Kvalifikacija;
import com.progici.languagefever.model.enums.Stil;
import com.progici.languagefever.service.LekcijaService;
import com.progici.languagefever.service.OcjenaService;
import com.progici.languagefever.service.UciteljJeziciService;
import com.progici.languagefever.service.UciteljService;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class UciteljController {

  @Autowired
  private UciteljService uciteljService;

  @Autowired
  private LekcijaService lekcijaService;

  @Autowired
  private OcjenaService ocjenaService;

  @Autowired
  private OcjenaController ocjenaController;

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
    Ucitelj ucitelj = getCurrentUcitelj(authentication);

    return new UciteljDTO(
      ucitelj.getKorisnik().getId(),
      ucitelj.getKorisnik().getName(),
      ucitelj.getKorisnik().getPicture(),
      uciteljJeziciService.getJeziciStringByUciteljId(ucitelj.getId()),
      ucitelj.getGodineIskustva(),
      ucitelj.getKvalifikacija(),
      ucitelj.getStilPoducavanja(),
      ucitelj.getSatnica(),
      ocjenaController.getProsjecnaOcjenaByUciteljId(ucitelj.getId()),
      getPoducavaniUceniciBrojByUciteljId(ucitelj.getId()),
      getDovrseneLekcijeBrojByUciteljId(ucitelj.getId())
    );
  }

  @GetMapping("/ucitelji")
  public List<UciteljDTO> getSviUciteljiDTO() {
    return uciteljService
      .getSviUcitelji()
      .stream()
      .map(ucitelj ->
        new UciteljDTO(
          ucitelj.getKorisnik().getId(),
          ucitelj.getKorisnik().getName(),
          ucitelj.getKorisnik().getPicture(),
          uciteljJeziciService.getJeziciStringByUciteljId(ucitelj.getId()),
          ucitelj.getGodineIskustva(),
          ucitelj.getKvalifikacija(),
          ucitelj.getStilPoducavanja(),
          ucitelj.getSatnica(),
          ocjenaController.getProsjecnaOcjenaByUciteljId(ucitelj.getId()),
          getPoducavaniUceniciBrojByUciteljId(ucitelj.getId()),
          getDovrseneLekcijeBrojByUciteljId(ucitelj.getId())
        )
      )
      .collect(Collectors.toList());
  }

  @GetMapping("/ucitelji/{idKorisnika}")
  public UciteljDTO getUciteljDTOByKorisnikId(@PathVariable Long idKorisnika) {
    Ucitelj ucitelj = getUciteljByKorisnikId(idKorisnika);

    return new UciteljDTO(
      ucitelj.getKorisnik().getId(),
      ucitelj.getKorisnik().getName(),
      ucitelj.getKorisnik().getPicture(),
      uciteljJeziciService.getJeziciStringByUciteljId(ucitelj.getId()),
      ucitelj.getGodineIskustva(),
      ucitelj.getKvalifikacija(),
      ucitelj.getStilPoducavanja(),
      ucitelj.getSatnica(),
      ocjenaController.getProsjecnaOcjenaByUciteljId(ucitelj.getId()),
      getPoducavaniUceniciBrojByUciteljId(ucitelj.getId()),
      getDovrseneLekcijeBrojByUciteljId(ucitelj.getId())
    );
  }

  @PostMapping("/azurirajucitelja")
  public void updateCurrentUciteljDTO(
    OAuth2AuthenticationToken authentication,
    @RequestBody UciteljDTO uciteljDTO
  ) {
    Korisnik korisnik = korisnikController.getCurrentUser(authentication);

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());

    if (ucitelj == null) {
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
    deleteUciteljByKorisnikId(
      korisnikController.getCurrentUser(authentication).getId()
    );
  }

  //
  //  ADMIN ENDPOINTS
  //

  @GetMapping("/ucitelji/{idKorisnika}/poducavaniucenici")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Ucenik> getPoducavaniUceniciByUciteljId(@PathVariable Long id) {
    return lekcijaService.getUceniciByUciteljIdAndByLekcijaStatusFinished(id);
  }

  @GetMapping("/ucitelji/{idKorisnika}/dovrsenelekcije")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Lekcija> getDovrseneLekcijeByUciteljId(@PathVariable Long id) {
    return lekcijaService.getLekcijeByUciteljIdAndByStatusFinished(id);
  }

  @PostMapping("/ucitelji/{idKorisnika}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void updateUciteljByKorisnikId(
    @PathVariable Long idKorisnika,
    @RequestBody UciteljDTO uciteljDTO
  ) {
    Korisnik korisnik = korisnikController.getKorisnikById(idKorisnika);

    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());

    if (ucitelj == null) {
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
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteUciteljByKorisnikId(@PathVariable Long idKorisnika) {
    Ucitelj ucitelj = getUciteljByKorisnikId(idKorisnika);

    uciteljJeziciService.deleteJeziciByUciteljId(ucitelj.getId());

    List<Lekcija> lekcije = lekcijaService.getLekcijeByUciteljId(
      ucitelj.getId()
    );
    for (Lekcija lekcija : lekcije) {
      lekcijaService.deleteLekcijaById(lekcija.getId());
    }

    List<Ocjena> ocjene = ocjenaService.getOcjeneByUciteljId(ucitelj.getId());
    for (Ocjena ocjena : ocjene) {
      ocjenaService.deleteOcjenaById(ocjena.getId());
    }

    uciteljService.deleteUciteljById(ucitelj.getId());
  }

  // filter

  @GetMapping("/ucitelji/filter")
  public Page<UciteljDTO> filterAndSortUcitelji(
    @RequestParam(required = false) Float minPrice,
    @RequestParam(required = false) Float maxPrice,
    @RequestParam(required = false) Integer minExperience,
    @RequestParam(required = false) Kvalifikacija kvalifikacija,
    @RequestParam(required = false) Stil stil,
    @RequestParam(required = false) Double minAverageOcjena,
    @RequestParam(required = false) Integer minCountOcjena,
    @RequestParam(required = false) String sortBy,
    @RequestParam(required = false) String sortOrder,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "12") int size
  ) {
    List<Ucitelj> ucitelji = uciteljService.getSviUcitelji();

    // Filtering
    if (minPrice != null) {
      ucitelji =
        ucitelji
          .stream()
          .filter(ucitelj -> ucitelj.getSatnica() >= minPrice)
          .collect(Collectors.toList());
    }
    if (maxPrice != null) {
      ucitelji =
        ucitelji
          .stream()
          .filter(ucitelj -> ucitelj.getSatnica() <= maxPrice)
          .collect(Collectors.toList());
    }
    if (minExperience != null) {
      ucitelji =
        ucitelji
          .stream()
          .filter(ucitelj -> ucitelj.getGodineIskustva() >= minExperience)
          .collect(Collectors.toList());
    }
    if (kvalifikacija != null) {
      ucitelji =
        ucitelji
          .stream()
          .filter(ucitelj -> ucitelj.getKvalifikacija() == kvalifikacija)
          .collect(Collectors.toList());
    }
    if (stil != null) {
      ucitelji =
        ucitelji
          .stream()
          .filter(ucitelj -> ucitelj.getStilPoducavanja() == stil)
          .collect(Collectors.toList());
    }
    if (minAverageOcjena != null) {
      ucitelji =
        ucitelji
          .stream()
          .filter(ucitelj ->
            ocjenaController.getProsjecnaOcjenaByUciteljId(ucitelj.getId()) >=
            minAverageOcjena
          )
          .collect(Collectors.toList());
    }
    if (minCountOcjena != null) {
      ucitelji =
        ucitelji
          .stream()
          .filter(ucitelj ->
            ocjenaController.getOcjeneByUciteljId(ucitelj.getId()).size() >=
            minCountOcjena
          )
          .collect(Collectors.toList());
    }

    // Sorting
    if (sortBy != null) {
      Comparator<Ucitelj> comparator = null;
      if (sortBy.equals("experience")) {
        comparator = Comparator.comparing(Ucitelj::getGodineIskustva);
      } else if (sortBy.equals("price")) {
        comparator = Comparator.comparing(Ucitelj::getSatnica);
      } else if (sortBy.equals("averageOcjena")) {
        comparator =
          Comparator.comparingDouble(ucitelj ->
            ocjenaController.getProsjecnaOcjenaByUciteljId(ucitelj.getId())
          );
      } else if (sortBy.equals("countOcjena")) {
        comparator =
          Comparator.comparingInt(ucitelj ->
            ocjenaController.getOcjeneByUciteljId(ucitelj.getId()).size()
          );
      }

      if (comparator != null) {
        if (sortOrder != null && sortOrder.equals("desc")) {
          comparator = comparator.reversed();
        }
        ucitelji.sort(comparator);
      }
    }

    // Pagination
    int start = Math.min(page * size, ucitelji.size());
    int end = Math.min((page + 1) * size, ucitelji.size());
    List<Ucitelj> paginatedList = ucitelji.subList(start, end);

    // Convert to DTO
    List<UciteljDTO> uciteljDTOs = paginatedList
      .stream()
      .map(ucitelj ->
        new UciteljDTO(
          ucitelj.getKorisnik().getId(),
          ucitelj.getKorisnik().getName(),
          ucitelj.getKorisnik().getPicture(),
          uciteljJeziciService.getJeziciStringByUciteljId(ucitelj.getId()),
          ucitelj.getGodineIskustva(),
          ucitelj.getKvalifikacija(),
          ucitelj.getStilPoducavanja(),
          ucitelj.getSatnica(),
          ocjenaController.getProsjecnaOcjenaByUciteljId(ucitelj.getId()),
          getPoducavaniUceniciBrojByUciteljId(ucitelj.getId()),
          getDovrseneLekcijeBrojByUciteljId(ucitelj.getId())
        )
      )
      .collect(Collectors.toList());

    return new PageImpl<>(
      uciteljDTOs,
      PageRequest.of(page, size),
      ucitelji.size()
    );
  }

  // HELPER FUNCTIONS

  public Ucitelj getCurrentUcitelj(OAuth2AuthenticationToken authentication) {
    Korisnik korisnik = korisnikController.getCurrentUser(authentication);

    return getUciteljByKorisnikId(korisnik.getId());
  }

  public Ucitelj getUciteljById(Long id) {
    Ucitelj ucitelj;
    try {
      ucitelj = uciteljService.getUciteljById(id);
    } catch (Exception e) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Ucitelj not found"
      );
    }

    return ucitelj;
  }

  public Ucitelj getUciteljByKorisnikId(Long id) {
    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(id);

    if (ucitelj == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Ucitelj not found"
    );

    return ucitelj;
  }

  public Long getPoducavaniUceniciBrojByUciteljId(@PathVariable Long id) {
    return (long) getPoducavaniUceniciByUciteljId(id).size();
  }

  public Long getDovrseneLekcijeBrojByUciteljId(@PathVariable Long id) {
    return (long) getDovrseneLekcijeByUciteljId(id).size();
  }
}
