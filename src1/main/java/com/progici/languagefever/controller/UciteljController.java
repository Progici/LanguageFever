package com.progici.languagefever.controller;

import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.model.dto.UciteljDTO;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.service.LekcijaService;
import com.progici.languagefever.service.UciteljService;
import com.progici.languagefever.service.Ucitelj_jeziciService;
import com.progici.languagefever.model.Jezik;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import com.progici.languagefever.model.Korisnik;


@RestController
public class UciteljController {

  @Autowired
  private UciteljService uciteljService;

  @Autowired
  private Ucitelj_jeziciService ucitelj_jeziciService;

  @Autowired
  private KorisnikController korisnikController;

  @Autowired
  private LekcijaService lekcijaService;

  @GetMapping("/trenutniucitelj")
  public Ucitelj getCurrentUser(OAuth2AuthenticationToken authentication) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );
    return uciteljService.getUciteljByKorisnikId(korisnik.getId());
  }

  
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

  @GetMapping("/poducavaniucenici")
  public List<Ucenik> getPoducavaniUceniciUcitelj(
    OAuth2AuthenticationToken authentication
  ) {
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );
    if (korisnik == null) return null;
    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());
    if (ucitelj == null) return null;
    List<Ucenik> lista = lekcijaService.getUceniciByUciteljIdAndByLekcijaStatusFinished(
      ucitelj.getId()
    );
    return lista;
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

  @RequestMapping(value = "/ucitelji", method = RequestMethod.POST)
  public ResponseEntity<Void> addUciteljByKorisnikId(@RequestBody UciteljDTO uciteljDTO) {
    try {
      Ucitelj ucitelj = new Ucitelj();
      ucitelj.setGodineIskustva(uciteljDTO.getGodineIskustva());
      ucitelj.setKvalifikacija(uciteljDTO.getKvalifikacija());
      ucitelj.setStilPoducavanja(uciteljDTO.getStilPoducavanja());
      ucitelj.setSatnica(uciteljDTO.getSatnica());
      uciteljService.addUciteljByKorisnikId(ucitelj, uciteljDTO.getIdKorisnika());
      ucitelj_jeziciService.addUcitelj_jezici(ucitelj, uciteljDTO.getJezik());
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
