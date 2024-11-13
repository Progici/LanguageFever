package com.progici.languagefever.controller;

import com.progici.languagefever.model.Lekcija;
import com.progici.languagefever.service.LekcijaService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "https://progici2front-62a5e06d95e8.herokuapp.com") 
public class LekcijaController {

  @Autowired
  private LekcijaService lekcijaService;

  @RequestMapping("/lekcije")
  public List<Lekcija> getSveLekcije() {
    return lekcijaService.getSveLekcije();
  }

  @RequestMapping("/lekcije/{id}")
  public Lekcija getLekcijaById(@PathVariable Long id) {
    return lekcijaService.getLekcijaById(id);
  }

  @RequestMapping("/ucitelji/{id}/lekcije")
  public List<Lekcija> getLekcijeByUciteljId(@PathVariable Long id) {
    return lekcijaService.getLekcijeByUciteljId(id);
  }

  @RequestMapping("/ucenici/{id}/lekcije")
  public List<Lekcija> getLekcijeByUcenikId(@PathVariable Long id) {
    return lekcijaService.getLekcijeByUcenikId(id);
  }

  @RequestMapping(value = "/lekcije", method = RequestMethod.POST)
  public void addLekcija(@RequestBody Lekcija lekcija) {
    lekcijaService.addLekcija(lekcija);
  }

  @RequestMapping(value = "/lekcije/{id}", method = RequestMethod.PUT)
  public void updateLekcijaById(
    @RequestBody Lekcija lekcija,
    @PathVariable Long id
  ) {
    lekcijaService.updateLekcijaById(id, lekcija);
  }

  @RequestMapping(value = "/lekcije/{id}", method = RequestMethod.DELETE)
  public void deleteLekcijaById(@PathVariable Long id) {
    lekcijaService.deleteLekcijaById(id);
  }
}
