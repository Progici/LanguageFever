package com.progici.languagefever.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Ucitelj {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  // @ManyToOne(fetch = FetchType.EAGER)
  // @JoinColumn(name = "student_id", referencedColumnName = "id")
  // private User student;

  // @ManyToOne(fetch = FetchType.EAGER)
  // @JoinColumn(name = "course_id", referencedColumnName = "id")
  // private Course course;

  private String jezici;
  private String godIskustva;
  private String kval;
  private String stilPoducavanja;
  private String satnica;
  private String slikaProfila;

  public Ucitelj() {}

  public Ucitelj(
    Long idUcitelj,
    String jezici,
    String godIskustva,
    String kval,
    String stilPoducavanja,
    String satnica,
    String slikaProfila
  ) {
    this.id = idUcitelj;
    this.jezici = jezici;
    this.godIskustva = godIskustva;
    this.kval = kval;
    this.stilPoducavanja = stilPoducavanja;
    this.satnica = satnica;
    this.slikaProfila = slikaProfila;
  }

  public Long getIdUcitelj() {
    return id;
  }

  public void setIdUcitelj(Long idUcitelj) {
    this.id = idUcitelj;
  }

  public String getJezici() {
    return jezici;
  }

  public void setJezici(String jezici) {
    this.jezici = jezici;
  }

  public String getGodIskustva() {
    return godIskustva;
  }

  public void setGodIskustva(String godIskustva) {
    this.godIskustva = godIskustva;
  }

  public String getKval() {
    return kval;
  }

  public void setKval(String kval) {
    this.kval = kval;
  }

  public String getStilPoducavanja() {
    return stilPoducavanja;
  }

  public void setStilPoducavanja(String stilPoducavanja) {
    this.stilPoducavanja = stilPoducavanja;
  }

  public String getSatnica() {
    return satnica;
  }

  public void setSatnica(String satnica) {
    this.satnica = satnica;
  }

  public String getSlikaProfila() {
    return slikaProfila;
  }

  public void setSlikaProfila(String slikaProfila) {
    this.slikaProfila = slikaProfila;
  }
}
