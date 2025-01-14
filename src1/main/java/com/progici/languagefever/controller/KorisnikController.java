package com.progici.languagefever.controller;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.Lekcija;
import com.progici.languagefever.model.Ocjena;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.model.enums.Role;
import com.progici.languagefever.service.KorisnikService;
import com.progici.languagefever.service.LekcijaService;
import com.progici.languagefever.service.OcjenaService;
import com.progici.languagefever.service.UcenikJeziciService;
import com.progici.languagefever.service.UcenikService;
import com.progici.languagefever.service.UciteljJeziciService;
import com.progici.languagefever.service.UciteljService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class KorisnikController {

  @Autowired
  private KorisnikService korisnikService;

  @Autowired
  private UcenikService ucenikService;

  @Autowired
  private UciteljService uciteljService;

  @Autowired
  private UciteljJeziciService uciteljJeziciService;

  @Autowired
  private UcenikJeziciService ucenikJeziciService;

  @Autowired
  private OcjenaService ocjenaService;

  @Autowired
  private LekcijaService lekcijaService;

  //
  //  USER ENDPOINTS
  //

  @GetMapping("/trenutnikorisnik")
  public Korisnik getCurrentUser(OAuth2AuthenticationToken authentication) {
    Korisnik korisnik = getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );

    if (korisnik == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Korisnik not found"
    );

    return korisnik;
  }

  @PostMapping("/azurirajkorisnika")
  public void updateCurrentUser(
    OAuth2AuthenticationToken authentication,
    @RequestBody Korisnik korisnikBody
  ) {
    korisnikService.updateKorisnikById(
      getCurrentUser(authentication).getId(),
      korisnikBody
    );
  }

  @DeleteMapping("/izbrisikorisnika")
  public void deleteCurrentUser(OAuth2AuthenticationToken authentication) {
    Korisnik korisnik = getCurrentUser(authentication);
    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(korisnik.getId());
    if (ucitelj != null) uciteljService.deleteUciteljById(ucitelj.getId());
    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(korisnik.getId());
    if (ucenik != null) ucenikService.deleteUcenikById(ucenik.getId());
    korisnikService.deleteKorisnikById(korisnik.getId());
  }

  //
  //  ADMIN ENDPOINTS
  //

  @GetMapping("/admins")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Korisnik> getAllAdminRoles() {
    return korisnikService.getAllAdminRoles();
  }

  @GetMapping("/users")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Korisnik> getAllUserRoles() {
    return korisnikService.getAllUserRoles();
  }

  @GetMapping("/korisnici")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Korisnik> getSviKorisnici() {
    return korisnikService.getSviKorisnici();
  }

  @GetMapping("/korisnici/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public Korisnik getKorisnikById(@PathVariable Long id) {
    Korisnik korisnik = korisnikService.getKorisnikById(id);

    if (korisnik == null) throw new ResponseStatusException(
      HttpStatus.NOT_FOUND,
      "Korisnik not found"
    );

    return korisnik;
  }

  @PostMapping("/korisnici")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void addKorisnik(@RequestBody Korisnik korisnikBody) {
    korisnikService.addKorisnik(korisnikBody);
  }

  @PutMapping("/setadmin/{idKorisnika}")
  //komentirati za development build
  //@PreAuthorize("hasRole('ROLE_ADMIN')")
  public void setAdminByKorisnikId(@PathVariable Long idKorisnika) {
    Korisnik korisnik = getKorisnikById(idKorisnika); // checks null
    korisnikService.setRoleToKorisnikById(idKorisnika, Role.ROLE_ADMIN);
  }

  @PutMapping("/korisnici/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void updateKorisnikById(
    @RequestBody Korisnik korisnikBody,
    @PathVariable Long id
  ) {
    Korisnik korisnik = getKorisnikById(id); // checks null
    korisnikService.updateKorisnikById(id, korisnikBody);
  }

  @DeleteMapping("/korisnici/{idKorisnika}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteKorisnikById(@PathVariable Long idKorisnika) {
    Ucitelj ucitelj = uciteljService.getUciteljByKorisnikId(idKorisnika);
    if (ucitelj != null) {
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

    Ucenik ucenik = ucenikService.getUcenikByKorisnikId(idKorisnika);
    if (ucenik != null) {
      ucenikJeziciService.deleteJeziciByUcenikId(ucenik.getId());

      List<Lekcija> lekcije2 = lekcijaService.getLekcijeByUcenikId(
        ucenik.getId()
      );
      for (Lekcija lekcija : lekcije2) {
        lekcijaService.deleteLekcijaById(lekcija.getId());
      }

      List<Ocjena> ocjene2 = ocjenaService.getOcjeneByUcenikId(ucenik.getId());
      for (Ocjena ocjena : ocjene2) {
        ocjenaService.deleteOcjenaById(ocjena.getId());
      }

      ucenikService.deleteUcenikById(ucenik.getId());
    }

    korisnikService.deleteKorisnikById(idKorisnika);
  }

  // HELPER FUNCTIONS

  private Korisnik getKorisnikFromOAuth2AuthenticationToken(
    OAuth2AuthenticationToken authentication
  ) {
    DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
    Map<String, Object> attributes = principal.getAttributes();
    String email = attributes.getOrDefault("email", "").toString();
    return korisnikService.getKorisnikByEmail(email);
  }
}
