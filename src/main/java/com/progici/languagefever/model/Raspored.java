package com.progici.languagefever.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.sql.Timestamp;

public class Raspored {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "id_ucitelj")
  private Ucitelj ucitelj;
  private Timestamp timestampPocetka;
  private Timestamp timestampZavrsetka;

  public Raspored() {}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Ucitelj getUcitelj() {
    return ucitelj;
  }

  public void setUcitelj(Ucitelj ucitelj) {
    this.ucitelj = ucitelj;
  }

  public Timestamp getTimestampPocetka() {
    return timestampPocetka;
  }

  public void setTimestampPocetka(Timestamp timestampPocetka) {
    this.timestampPocetka = timestampPocetka;
  }

  public Timestamp getTimestampZavrsetka() {
    return timestampZavrsetka;
  }

  public void setTimestampZavrsetka(Timestamp timestampZavrsetka) {
    this.timestampZavrsetka = timestampZavrsetka;
  }
}
