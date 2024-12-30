package com.progici.languagefever.controller;

import com.progici.languagefever.model.enums.Kvalifikacija;
import com.progici.languagefever.model.enums.Razina;
import com.progici.languagefever.model.enums.Status;
import com.progici.languagefever.model.enums.Stil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/enums")
public class EnumController {

  @GetMapping("/statusi")
  public Status[] getAllStatuses() {
    return Status.values();
  }

  @GetMapping("/kvalifikacije")
  public Kvalifikacija[] getAllKvalifikacije() {
    return Kvalifikacija.values();
  }

  @GetMapping("/razine")
  public Razina[] getAllRazina() {
    return Razina.values();
  }

  @GetMapping("/stilovi")
  public Stil[] getAllStilovi() {
    return Stil.values();
  }
}
