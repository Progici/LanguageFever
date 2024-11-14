package com.progici.languagefever.controller;

import com.progici.languagefever.model.enums.Jezici;
import com.progici.languagefever.model.enums.Kvalifikacija;
import com.progici.languagefever.model.enums.Razina;
import com.progici.languagefever.model.enums.Status;
import com.progici.languagefever.model.enums.Stil;
import java.util.Arrays;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EnumController {

  @GetMapping("/jezici")
  public List<Jezici> getAllJezici() {
    return Arrays.asList(Jezici.values());
  }

  @GetMapping("/kvalifikacije")
  public List<Kvalifikacija> getAllKvalifikacije() {
    return Arrays.asList(Kvalifikacija.values());
  }

  @GetMapping("/razine")
  public List<Razina> getAllRazina() {
    return Arrays.asList(Razina.values());
  }

  @GetMapping("/stilovi")
  public List<Stil> getAllStil() {
    return Arrays.asList(Stil.values());
  }

  @GetMapping("/statusi")
  public List<Status> getAllStatus() {
    return Arrays.asList(Status.values());
  }
}
