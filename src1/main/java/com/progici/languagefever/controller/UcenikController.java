package com.progici.languagefever.controller;

import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.service.UcenikService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UcenikController {

  @Autowired
  private UcenikService ucenikService;

  @RequestMapping("/ucenici")
  public List<Ucenik> getSviUcenici() {
    return ucenikService.getSviUcenici();
  }

  @RequestMapping("/ucenici/{id}")
  public Ucenik getUcenikById(@PathVariable Long id) {
    try {
      return ucenikService.getUcenikById(id);
    } catch (Exception e) {
      return null;
    }
  }

  @RequestMapping(value = "/ucenici/{idKorisnika}", method = RequestMethod.POST)
  public ResponseEntity<Void> addUcenikByKorisnikId(
    @RequestBody Ucenik ucenik,
    @PathVariable Long idKorisnika
  ) {
    try {
      ucenikService.addUcenikByKorisnikId(ucenik, idKorisnika);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @RequestMapping(value = "/ucenici/{id}", method = RequestMethod.PUT)
  public ResponseEntity<Void> updateUcenikById(
    @RequestBody Ucenik ucenik,
    @PathVariable Long id
  ) {
    try {
      ucenikService.updateUcenikById(id, ucenik);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }

  @RequestMapping(value = "/ucenici/{id}", method = RequestMethod.DELETE)
  public void deleteUcenikById(@PathVariable Long id) {
    ucenikService.deleteUcenikById(id);
  }
}
