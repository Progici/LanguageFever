package com.progici.languagefever.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table
public class UciteljJezici {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "Ucitelj_id")
  private Ucitelj Ucitelj;

  @ManyToOne
  @JoinColumn(name = "jezik_id")
  private Jezik jezik;

  public UciteljJezici() {}

  public UciteljJezici(Ucitelj Ucitelj, Jezik jezik) {
    this.Ucitelj = Ucitelj;
    this.jezik = jezik;
  }

  public Long getId() {
    return id;
  }

  public Ucitelj getUcitelj() {
    return Ucitelj;
  }

  public void setUcitelj(Ucitelj Ucitelj) {
    this.Ucitelj = Ucitelj;
  }

  public Jezik getJezik() {
    return jezik;
  }

  public void setJezik(Jezik jezik) {
    this.jezik = jezik;
  }
}
