package com.progici.languagefever.model;

import com.progici.languagefever.model.enums.Jezici;
import com.progici.languagefever.model.enums.Kvalifikacija;
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
import java.util.List;

@Entity
@Table
public class Ucenik {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  @JoinColumn(name = "id_korisnik")
  private Korisnik korisnik;//provjera

  @Enumerated(EnumType.STRING)
  private List<Jezici> jezici;

  @Enumerated(EnumType.STRING)
  private Razina razina;

  @Enumerated(EnumType.STRING)
  private Stil stilUcenja;

  private String ciljevi;

  public Ucenik() {}

  public Ucenik(
    Korisnik korisnik,
    List<Jezici> jezici,
    Razina razina,
    Stil stilUcenja,
    String ciljevi
  ) {
    this.korisnik = korisnik;
    this.jezici = jezici;
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

  public List<Jezici> getJezici() {
    return jezici;
  }

  public void setJezici(List<Jezici> jezici) {
    this.jezici = jezici;
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
}
