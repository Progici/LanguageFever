package com.progici.languagefever.model.dto;

import com.progici.languagefever.model.enums.Kvalifikacija;
import com.progici.languagefever.model.enums.Stil;
import java.util.List;

public class UciteljDTO {

  private Long idKorisnika;
  private String name;
  private String picture;
  private List<String> jezici;
  private Integer godineIskustva;
  private Kvalifikacija kvalifikacija;
  private Stil stilPoducavanja;
  private Float satnica;
  private Double rating;
  private Long poducavaniUceniciBroj;
  private Long dovrseneLekcijeBroj;

  public UciteljDTO(
    Long idKorisnika,
    String name,
    String picture,
    List<String> jezici,
    Integer godineIskustva,
    Kvalifikacija kvalifikacija,
    Stil stilPoducavanja,
    Float satnica,
    Double rating,
    Long poducavaniUceniciBroj,
    Long dovrseneLekcijeBroj
  ) {
    this.idKorisnika = idKorisnika;
    this.name = name;
    this.picture = picture;
    this.jezici = jezici;
    this.godineIskustva = godineIskustva;
    this.kvalifikacija = kvalifikacija;
    this.stilPoducavanja = stilPoducavanja;
    this.satnica = satnica;
    this.rating = rating;
    this.poducavaniUceniciBroj = poducavaniUceniciBroj;
    this.dovrseneLekcijeBroj = dovrseneLekcijeBroj;
  }

  public Long getIdKorisnika() {
    return idKorisnika;
  }

  public void setIdKorisnika(Long idKorisnika) {
    this.idKorisnika = idKorisnika;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPicture() {
    return picture;
  }

  public void setPicture(String picture) {
    this.picture = picture;
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

  public Double getRating() {
    return rating;
  }

  public void setRating(Double rating) {
    this.rating = rating;
  }

  public Long getPoducavaniUceniciBroj() {
    return poducavaniUceniciBroj;
  }

  public void setPoducavaniUceniciBroj(Long poducavaniUceniciBroj) {
    this.poducavaniUceniciBroj = poducavaniUceniciBroj;
  }

  public Long getDovrseneLekcijeBroj() {
    return dovrseneLekcijeBroj;
  }

  public void setDovrseneLekcijeBroj(Long dovrseneLekcijeBroj) {
    this.dovrseneLekcijeBroj = dovrseneLekcijeBroj;
  }

  @Override
  public String toString() {
    return (
      "UciteljDTO [idKorisnika=" +
      idKorisnika +
      ", name=" +
      name +
      ", picture=" +
      picture +
      ", jezici=" +
      jezici +
      ", godineIskustva=" +
      godineIskustva +
      ", kvalifikacija=" +
      kvalifikacija +
      ", stilPoducavanja=" +
      stilPoducavanja +
      ", satnica=" +
      satnica +
      ", rating=" +
      rating +
      ", poducavaniUceniciBroj=" +
      poducavaniUceniciBroj +
      ", dovrseneLekcijeBroj=" +
      dovrseneLekcijeBroj +
      "]"
    );
  }
}
