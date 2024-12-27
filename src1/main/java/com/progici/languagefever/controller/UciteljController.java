package com.progici.languagefever.controller;

import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.service.UciteljService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UciteljController {

  @Autowired
  private UciteljService uciteljService;

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

  @RequestMapping(value = "/ucitelji/{id}", method = RequestMethod.PUT)
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
  public void deleteUciteljById(@PathVariable Long id) {
    uciteljService.deleteUciteljById(id);
  }
}
