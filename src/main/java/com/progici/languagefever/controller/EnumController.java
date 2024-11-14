package main.java.com.progici.languagefever.controller;
import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.progici.languagefever.model.enums.Jezici;
import com.progici.languagefever.model.enums.Kvalifikacija;
import com.progici.languagefever.model.enums.Razina;
import com.progici.languagefever.model.enums.Status;
import com.progici.languagefever.model.enums.Stil;


@RestController
public class EnumController {

  // Endpoint to get a list of all enum values
  @GetMapping("/jezici")
  public List<Jezici> getAllJezici() {
    return Arrays.asList(Jezici.values());  // Returns a list of enum values
  }

  // Endpoint to get a list of all enum values
  @GetMapping("/kvalifikacije")
  public List<Kvalifikacija> getAllKvalifikacije() {
    return Arrays.asList(Kvalifikacija.values());  // Returns a list of enum values
  }

  // Endpoint to get a list of all enum values
  @GetMapping("/razine")
  public List<Razina> getAllRazina() {
    return Arrays.asList(Razina.values());  // Returns a list of enum values
  }

  // Endpoint to get a list of all enum values
  @GetMapping("/stilovi")
  public List<Stil> getAllStil() {
    return Arrays.asList(Stil.values());  // Returns a list of enum values
  }

  // Endpoint to get a list of all enum values
  @GetMapping("/statusi")
  public List<Status> getAllStatus() {
    return Arrays.asList(Status.values());  // Returns a list of enum values
  }

}

