package com.progici.languagefever.controller;

import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.service.UciteljService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;  
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RequestMethod;
// import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
// @CrossOrigin(origins = "https://progici2front-62a5e06d95e8.herokuapp.com") 
public class UciteljController {

  @Autowired
  private UciteljService uciteljService;

  // @RequestMapping(value = "/**", method = RequestMethod.OPTIONS)
  // public ResponseEntity<Void> handleOptions() {
  //     return ResponseEntity.ok().build();
  // }

  @RequestMapping("/ucitelji")
  public List<Ucitelj> getSviUcitelji() {
    return uciteljService.getSviUcitelji();
  }

  @RequestMapping("/ucitelji/{id}")
  public Ucitelj getUciteljById(@PathVariable Long id) {
    return uciteljService.getUciteljById(id);
  }

  @RequestMapping(value = "/ucitelji", method = RequestMethod.POST)
  public void addUcitelj(@RequestBody Ucitelj ucitelj) {
    uciteljService.addUcitelj(ucitelj);
  }

  @RequestMapping(value = "/ucitelji/{id}", method = RequestMethod.PUT)
  public void updateUciteljById(
    @RequestBody Ucitelj ucitelj,
    @PathVariable Long id
  ) {
    uciteljService.updateUciteljById(id, ucitelj);
  }

  @RequestMapping(value = "/ucitelji/{id}", method = RequestMethod.DELETE)
  public void deleteUciteljById(@PathVariable Long id) {
    uciteljService.deleteUciteljById(id);
  }
}
