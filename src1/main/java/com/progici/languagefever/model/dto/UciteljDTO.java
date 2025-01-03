package com.progici.languagefever.model.dto;

import com.progici.languagefever.model.enums.Kvalifikacija;
import com.progici.languagefever.model.enums.Stil;
import java.util.List;

public class UciteljDTO {

  private Long id;
  private String name;
  private String picture;
  private List<String> jezici;
  private Integer godineIskustva;
  private Kvalifikacija kvalifikacija;
  private Stil stilPoducavanja;
  private Float satnica;

  public UciteljDTO(
    Long id,
    String name,
    String picture,
    List<String> jezici,
    Integer godineIskustva,
    Kvalifikacija kvalifikacija,
    Stil stilPoducavanja,
    Float satnica
  ) {
    this.id = id;
    this.name = name;
    this.picture = picture;
    this.jezici = jezici;
    this.godineIskustva = godineIskustva;
    this.kvalifikacija = kvalifikacija;
    this.stilPoducavanja = stilPoducavanja;
    this.satnica = satnica;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
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

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getPicture() {
    return picture;
  }

  public void setPicture(String picture) {
    this.picture = picture;
  }
}
