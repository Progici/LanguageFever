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
  @JoinColumn(name = "ucitelj_id")
  private Ucitelj ucitelj;

  @ManyToOne
  @JoinColumn(name = "jezik_id")
  private Jezik jezik;

  public UciteljJezici() {}

  public Long getId() {
    return id;
  }

  public Ucitelj getUcitelj() {
    return ucitelj;
  }

  public void setUcitelj(Ucitelj Ucitelj) {
    this.ucitelj = Ucitelj;
  }

  public Jezik getJezik() {
    return jezik;
  }

  public void setJezik(Jezik jezik) {
    this.jezik = jezik;
  }
}
