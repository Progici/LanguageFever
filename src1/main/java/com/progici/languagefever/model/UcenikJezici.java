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
@Table(name = "ucenik_jezici")
public class UcenikJezici {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "ucenik_id")
  @Column(nullable = false)
  private Ucenik ucenik;

  @ManyToOne
  @JoinColumn(name = "jezik_id")
  @Column(nullable = false)
  private Jezik jezik;

  public UcenikJezici() {}

  public Long getId() {
    return id;
  }

  public Ucenik getUcenik() {
    return ucenik;
  }

  public void setUcenik(Ucenik ucenik) {
    this.ucenik = ucenik;
  }

  public Jezik getJezik() {
    return jezik;
  }

  public void setJezik(Jezik jezik) {
    this.jezik = jezik;
  }
}
