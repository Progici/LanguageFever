package com.progici.languagefever.controller;

import com.progici.languagefever.model.enums.Jezici;
import com.progici.languagefever.model.enums.Kvalifikacija;
import com.progici.languagefever.model.enums.Razina;
import com.progici.languagefever.model.enums.Stil;
import java.io.ObjectInputFilter.Status;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EnumController {

  @GetMapping("/liste/jezici")
  public Jezici[] getJezici() {
    return Jezici.values();
  }

  @GetMapping("/liste/kvalifikacija")
  public Kvalifikacija[] getKvalifikacija() {
    return Kvalifikacija.values();
  }

  @GetMapping("/liste/razina")
  public Razina[] geRazina() {
    return Razina.values();
  }

  @GetMapping("/liste/status")
  public Status[] getStatus() {
    return Status.values();
  }

  @GetMapping("/liste/stil")
  public Stil[] getStil() {
    return Stil.values();
  }
}
