package com.progici.languagefever.model;

public class Lekcija {

  private String idLekcija;
  private String vrijemeLekcije;
  private String status;

  public Lekcija() {}

  public Lekcija(String idLekcija, String vrijemeLekcije, String status) {
    this.idLekcija = idLekcija;
    this.vrijemeLekcije = vrijemeLekcije;
    this.status = status;
  }

  public String getIdLekcija() {
    return idLekcija;
  }

  public void setIdLekcija(String idLekcija) {
    this.idLekcija = idLekcija;
  }

  public String getVrijemeLekcije() {
    return vrijemeLekcije;
  }

  public void setVrijemeLekcije(String vrijemeLekcije) {
    this.vrijemeLekcije = vrijemeLekcije;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
}
