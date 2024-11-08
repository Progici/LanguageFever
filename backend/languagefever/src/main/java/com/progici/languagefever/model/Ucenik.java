package com.progici.languagefever.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Ucenik {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String jezici;
  private String trenRazina;
  private String ciljevi;

  public Ucenik() {}

  public Ucenik(
    Long idUcenik,
    String jezici,
    String trenRazina,
    String ciljevi
  ) {
    this.id = idUcenik;
    this.jezici = jezici;
    this.trenRazina = trenRazina;
    this.ciljevi = ciljevi;
  }

  public Long getIdUcenik() {
    return id;
  }

  public void setIdUcenik(Long idUcenik) {
    this.id = idUcenik;
  }

  public String getJezici() {
    return jezici;
  }

  public void setJezici(String jezici) {
    this.jezici = jezici;
  }

  public String getTrenRazina() {
    return trenRazina;
  }

  public void setTrenRazina(String trenRazina) {
    this.trenRazina = trenRazina;
  }

  public String getCiljevi() {
    return ciljevi;
  }

  public void setCiljevi(String ciljevi) {
    this.ciljevi = ciljevi;
  }
}
