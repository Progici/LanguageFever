package com.progici.languagefever.model;

import com.progici.languagefever.model.enums.Jezici;
import com.progici.languagefever.model.enums.Razina;
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
public class Ucenik {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Korisnik korisnik;

  @Enumerated(EnumType.STRING)
  private List<Jezici> jezici;

  @Enumerated(EnumType.STRING)
  private Razina razina;

  private String ciljevi;

  public Ucenik() {}

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
}
