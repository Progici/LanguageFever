package com.progici.languagefever.model;

import com.progici.languagefever.model.enums.Jezici;
import com.progici.languagefever.model.enums.Kvalifikacija;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.List;

@Entity
@Table
public class Ucitelj {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Korisnik korisnik;

  private List<Ucenik> ucenici;

  @Enumerated(EnumType.STRING)
  private List<Jezici> jezici;

  private Integer godineIskustva;

  @Enumerated(EnumType.STRING)
  private Kvalifikacija kvalifikacija;

  private String stilPoducavanja;
  private Float satnica;
  private String slikaProfila;

  public Ucitelj() {}

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

  public List<Jezici> getJezici() {
    return jezici;
  }

  public void setJezici(List<Jezici> jezici) {
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

  public String getStilPoducavanja() {
    return stilPoducavanja;
  }

  public void setStilPoducavanja(String stilPoducavanja) {
    this.stilPoducavanja = stilPoducavanja;
  }

  public Float getSatnica() {
    return satnica;
  }

  public void setSatnica(Float satnica) {
    this.satnica = satnica;
  }

  public String getSlikaProfila() {
    return slikaProfila;
  }

  public void setSlikaProfila(String slikaProfila) {
    this.slikaProfila = slikaProfila;
  }

  public List<Ucenik> getUcenici() {
    return ucenici;
  }

  public void setUcenici(List<Ucenik> ucenici) {
    this.ucenici = ucenici;
  }
}
