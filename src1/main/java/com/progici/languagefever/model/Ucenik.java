package com.progici.languagefever.model;

import com.progici.languagefever.model.enums.Razina;
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
public class Ucenik {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  @JoinColumn(name = "id_korisnik")
  private Korisnik korisnik;

  @Enumerated(EnumType.STRING)
  private Razina razina;

  @Enumerated(EnumType.STRING)
  private Stil stilUcenja;

  private String ciljevi;

  public Ucenik() {}

  public Ucenik(
    Korisnik korisnik,
    Razina razina,
    Stil stilUcenja,
    String ciljevi
  ) {
    this.korisnik = korisnik;
    this.razina = razina;
    this.stilUcenja = stilUcenja;
    this.ciljevi = ciljevi;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Korisnik getKorisnik() {
    return korisnik;
  }

  public void setKorisnik(Korisnik korisnik) {
    this.korisnik = korisnik;
  }

  public Razina getRazina() {
    return razina;
  }

  public void setRazina(Razina razina) {
    this.razina = razina;
  }

  public String getCiljevi() {
    return ciljevi;
  }

  public void setCiljevi(String ciljevi) {
    this.ciljevi = ciljevi;
  }

  public Stil getStilUcenja() {
    return stilUcenja;
  }

  public void setStilUcenja(Stil stilUcenja) {
    this.stilUcenja = stilUcenja;
  }

  @Override
  public String toString() {
    return (
      "Ucenik [id=" +
      id +
      ", korisnik=" +
      korisnik +
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
