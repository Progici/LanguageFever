package com.progici.languagefever.model.dto;

import com.progici.languagefever.model.enums.Kvalifikacija;
import com.progici.languagefever.model.enums.Stil;
import java.util.List;

public class UciteljDTO {

  private List<String> jezici;
  private Integer godineIskustva;
  private Kvalifikacija kvalifikacija;
  private Stil stilPoducavanja;
  private Float satnica;

  public UciteljDTO(
    List<String> jezici,
    Integer godineIskustva,
    Kvalifikacija kvalifikacija,
    Stil stilPoducavanja,
    Float satnica
  ) {
    this.jezici = jezici;
    this.godineIskustva = godineIskustva;
    this.kvalifikacija = kvalifikacija;
    this.stilPoducavanja = stilPoducavanja;
    this.satnica = satnica;
  }

  public List<String> getJezici() {
    return jezici;
  }

  public void setJezici(List<String> jezici) {
    this.jezici = jezici;
  }

  public Integer getGodineIskustva() {
    return godineIskustva;
  }

  public void setGodineIskustva(Integer godineIskustva) {
    this.godineIskustva = godineIskustva;
  }

  public Kvalifikacija getKvalifikacija() {
    return kvalifikacija;
  }

  public void setKvalifikacija(Kvalifikacija kvalifikacija) {
    this.kvalifikacija = kvalifikacija;
  }

  public Stil getStilPoducavanja() {
    return stilPoducavanja;
  }

  public void setStilPoducavanja(Stil stilPoducavanja) {
    this.stilPoducavanja = stilPoducavanja;
  }

  public Float getSatnica() {
    return satnica;
  }

  public void setSatnica(Float satnica) {
    this.satnica = satnica;
  }

  @Override
  public String toString() {
    return (
      "UciteljDTO [jezici=" +
      jezici +
      ", godineIskustva=" +
      godineIskustva +
      ", kvalifikacija=" +
      kvalifikacija +
      ", stilPoducavanja=" +
      stilPoducavanja +
      ", satnica=" +
      satnica +
      "]"
    );
  }
}
