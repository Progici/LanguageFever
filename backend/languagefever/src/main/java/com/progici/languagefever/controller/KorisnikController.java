package com.progici.languagefever.controller;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.service.KorisnikService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
// @CrossOrigin(origins = "https://progici2front-62a5e06d95e8.herokuapp.com") 
public class KorisnikController {

  @Autowired
  private KorisnikService korisnikService;


  @RequestMapping("/korisnici")
  public List<Korisnik> getSviKorisnici() {
    return korisnikService.getSviKorisnici();
  }

  @RequestMapping("/korisnici/{id}")
  public Korisnik getKorisnikById(@PathVariable Long id) {
    return korisnikService.getKorisnikById(id);
  }

  @RequestMapping(value = "/korisnici", method = RequestMethod.POST)
  public void addKorisnik(@RequestBody Korisnik korisnik) {
    korisnikService.addKorisnik(korisnik);
  }

  @RequestMapping(value = "/korisnici/{id}", method = RequestMethod.PUT)
  public void updateKorisnikById(
    @RequestBody Korisnik korisnik,
    @PathVariable Long id
  ) {
    korisnikService.updateKorisnikById(id, korisnik);
  }

  @RequestMapping(value = "/korisnici/{id}", method = RequestMethod.DELETE)
  public void deleteKorisnikById(@PathVariable Long id) {
    korisnikService.deleteKorisnikById(id);
  }
}
