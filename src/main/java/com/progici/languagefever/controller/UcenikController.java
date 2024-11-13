package com.progici.languagefever.controller;

import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.service.UcenikService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "https://progici2front-62a5e06d95e8.herokuapp.com") 
public class UcenikController {

  @Autowired
  private UcenikService ucenikService;

  @RequestMapping("/ucenici")
  public List<Ucenik> getSviUcenici() {
    return ucenikService.getSviUcenici();
  }

  @RequestMapping("/ucenici/{id}")
  public Ucenik getUcenikById(@PathVariable Long id) {
    return ucenikService.getUcenikById(id);
  }

  @RequestMapping(value = "/ucenici", method = RequestMethod.POST)
  public void addUcenik(@RequestBody Ucenik ucenik) {
    ucenikService.addUcenik(ucenik);
  }

  @RequestMapping(value = "/ucenici/{id}", method = RequestMethod.PUT)
  public void updateUcenikById(
    @RequestBody Ucenik ucenik,
    @PathVariable Long id
  ) {
    ucenikService.updateUcenikById(id, ucenik);
  }

  @RequestMapping(value = "/ucenici/{id}", method = RequestMethod.DELETE)
  public void deleteUcenikById(@PathVariable Long id) {
    ucenikService.deleteUcenikById(id);
  }
}
