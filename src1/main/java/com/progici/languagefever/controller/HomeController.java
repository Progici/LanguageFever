package com.progici.languagefever.controller;

import com.progici.languagefever.model.Jezik;
import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.UcenikJezici;
import com.progici.languagefever.model.dto.UcenikDTO;
import com.progici.languagefever.service.JezikService;
import com.progici.languagefever.service.UcenikJeziciService;
import com.progici.languagefever.service.UcenikService;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

  @Autowired
  private KorisnikController korisnikController;

  @Autowired
  private UcenikJeziciService ucenikJeziciService;

  @Autowired
  private JezikService jezikService;

  @Autowired
  private UcenikService ucenikService;

  @GetMapping("/")
  public String home() {
    return "Home Sweet Home!";
  }

  @GetMapping("/secured")
  public String secured() {
    return "Secured!";
  }

  @GetMapping("/active")
  public Boolean active(OAuth2AuthenticationToken authentication) {
    if (authentication == null) return false;
    Korisnik korisnik = korisnikController.getKorisnikFromOAuth2AuthenticationToken(
      authentication
    );
    if (korisnik == null) return false;
    return authentication.isAuthenticated();
  }

  @GetMapping("/test/{id}")
  public List<String> Testing(@PathVariable Long id) {
    return ucenikJeziciService.getJeziciStringByUcenikId(id);
  }

  @RequestMapping(value = "/ucenicipost", method = RequestMethod.POST)
  public void addUciteljByKorisnikEmail(@RequestBody UcenikDTO ucenikDTO) {
    System.out.println(
      "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + ucenikDTO.toString()
    );
    Ucenik ucenik = new Ucenik();
    ucenik.setRazina(ucenikDTO.getRazina());
    ucenik.setCiljevi(ucenikDTO.getciljevi());
    ucenik.setStilUcenja(ucenikDTO.getstilUcenja());
    try {
      ucenikService.addUcenikByKorisnikId(ucenik, (long) 1);
    } catch (Exception e) {
      System.out.println("greskaBBBBBBBBBBBBB" + ucenikDTO.toString());
    }

    ucenik = ucenikService.getUcenikByKorisnikId((long) 1);
    ucenikJeziciService.deleteJeziciByUcenikId(ucenik.getId());
    for (String jezik : ucenikDTO.getJezici()) {
      Jezik newJezik = jezikService.getJezikByName(jezik);
      if (newJezik != null) ucenikJeziciService.addUcenikJezik(
        newJezik,
        ucenik
      );
    }
  }
}
