package com.progici.languagefever.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ucitelj_jezici")
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

  public Jezik getJezik() {
    return jezik;
  }

  public void setJezik(Jezik jezik) {
    this.jezik = jezik;
  }
}
