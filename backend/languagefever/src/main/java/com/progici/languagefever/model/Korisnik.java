package com.progici.languagefever.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Korisnik {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String ime;
  private String prezime;
  private String email;

  public Korisnik() {}

  public Korisnik(Long idKorisnik, String ime, String prezime, String email) {
    this.id = idKorisnik;
    this.ime = ime;
    this.prezime = prezime;
    this.email = email;
  }

  public Long getIdKorisnik() {
    return id;
  }

  public void setIdKorisnik(Long idKorisnik) {
    this.id = idKorisnik;
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
