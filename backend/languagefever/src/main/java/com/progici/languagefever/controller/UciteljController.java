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
    return uciteljService.getUciteljById(id);
  }

  @RequestMapping(value = "/ucitelji", method = RequestMethod.POST)
  public void addUcitelj(@RequestBody Ucitelj ucitelj) {
    uciteljService.addUcitelj(ucitelj);
  }

  @RequestMapping(value = "/ucitelji", method = RequestMethod.PUT)
  public void updateUcitelj(@RequestBody Ucitelj ucitelj) {
    uciteljService.updateUcitelj(ucitelj);
  }

  @RequestMapping(value = "/ucitelji/{id}", method = RequestMethod.DELETE)
  public void deleteUcitelj(@PathVariable Long id) {
    uciteljService.deleteUcitelj(id);
  }
}
