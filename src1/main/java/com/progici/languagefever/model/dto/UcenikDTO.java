package com.progici.languagefever.model.dto;

import com.progici.languagefever.model.enums.Razina;
import com.progici.languagefever.model.enums.Stil;
import java.util.List;

public class UcenikDTO {

  private List<String> jezici;
  private Razina razina;
  private Stil stilUcenja;

  private String ciljevi;

  public UcenikDTO(
    List<String> jezici,
    Razina razina,
    Stil stilUcenja,
    String ciljevi
  ) {
    this.jezici = jezici;
    this.razina = razina;
    this.stilUcenja = stilUcenja;
    this.ciljevi = ciljevi;
  }

  public List<String> getJezici() {
    return jezici;
  }

  public void setJezici(List<String> jezici) {
    this.jezici = jezici;
  }

  public Razina getRazina() {
    return razina;
  }

  public void setRazina(Razina razina) {
    this.razina = razina;
  }

  public Stil getstilUcenja() {
    return stilUcenja;
  }

  public void setstilUcenja(Stil stilUcenja) {
    this.stilUcenja = stilUcenja;
  }

  public String getciljevi() {
    return ciljevi;
  }

  public void setciljevi(String ciljevi) {
    this.ciljevi = ciljevi;
  }

  @Override
  public String toString() {
    return (
      "UcenikDTO [jezici=" +
      jezici +
      ", razina=" +
      razina +
      ", stilUcenja=" +
      stilUcenja +
      ", ciljevi=" +
      ciljevi +
      "]"
    );
  }
}
