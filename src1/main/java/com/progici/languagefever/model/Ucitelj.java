package com.progici.languagefever.model;

import com.progici.languagefever.model.enums.Kvalifikacija;
import com.progici.languagefever.model.enums.Stil;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table
public class Ucitelj {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  @JoinColumn(name = "id_korisnik")
  private Korisnik korisnik;

  private Integer godineIskustva;

  @Enumerated(EnumType.STRING)
  private Kvalifikacija kvalifikacija;

  @Enumerated(EnumType.STRING)
  private Stil stilPoducavanja;

  private Float satnica;

  public Ucitelj() {}

  public Ucitelj(
    Korisnik korisnik,
    Integer godineIskustva,
    Kvalifikacija kvalifikacija,
    Stil stilPoducavanja,
    Float satnica
  ) {
    this.korisnik = korisnik;
    this.godineIskustva = godineIskustva;
    this.kvalifikacija = kvalifikacija;
    this.stilPoducavanja = stilPoducavanja;
    this.satnica = satnica;
  }

  public Long getId() {
    return id;
  }

  public Korisnik getKorisnik() {
    return korisnik;
  }

  public void setKorisnik(Korisnik korisnik) {
    this.korisnik = korisnik;
  }

  public void setId(Long id) {
    this.id = id;
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
      "Ucitelj [id=" +
      id +
      ", korisnik=" +
      korisnik +
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
