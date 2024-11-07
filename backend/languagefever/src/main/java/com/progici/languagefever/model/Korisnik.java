package com.progici.languagefever.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Korisnik {

  @Id
  private String idKorisnik;

  private String ime;
  private String prezime;
  private String email;

  public Korisnik() {}

  public Korisnik(String idKorisnik, String ime, String prezime, String email) {
    this.idKorisnik = idKorisnik;
    this.ime = ime;
    this.prezime = prezime;
    this.email = email;
  }

  public String getIdKorisnik() {
    return idKorisnik;
  }

  public void setIdKorisnik(String idKorisnik) {
    this.idKorisnik = idKorisnik;
  }

  public String getIme() {
    return ime;
  }

  public void setIme(String ime) {
    this.ime = ime;
  }

  public String getPrezime() {
    return prezime;
  }

  public void setPrezime(String prezime) {
    this.prezime = prezime;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}
