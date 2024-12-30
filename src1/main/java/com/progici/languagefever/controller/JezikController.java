package com.progici.languagefever.controller;

import com.progici.languagefever.model.Jezik;
import com.progici.languagefever.service.JezikService;
import com.progici.languagefever.service.UcenikJeziciService;
import com.progici.languagefever.service.UciteljJeziciService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JezikController {

  @Autowired
  private JezikService jezikService;

  @Autowired
  private UcenikJeziciService ucenikJeziciService;

  @Autowired
  private UciteljJeziciService uciteljJeziciService;

  //
  //  USER ENDPOINTS
  //

  @GetMapping("/jezici")
  public List<String> getSviJeziciString() {
    return jezikService.getSviJeziciString();
  }

  //
  //  ADMIN ENDPOINTS
  //

  @GetMapping("/jeziciobjekt")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public List<Jezik> getSviJezici() {
    return jezikService.getSviJezici();
  }

  @PostMapping("/jezici")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void addJezik(@RequestBody Jezik jezik) {
    jezikService.addJezik(jezik.getName());
  }

  @DeleteMapping("/jezici/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void deleteJezikById(@PathVariable Long id) {
    ucenikJeziciService.deleteJeziciByJezikId(id);
    uciteljJeziciService.deleteJeziciByJezikId(id);
    jezikService.deleteJezikById(id);
  }
}
