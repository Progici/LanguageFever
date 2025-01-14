package com.progici.languagefever.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;


@Entity
@Table
public class Ocjena {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "id_ucenik")
  private Ucenik ucenik;

  @ManyToOne
  @JoinColumn(name = "id_ucitelj")
  private Ucitelj ucitelj;

  @Min(0)
  @Max(5)
  private Integer ocjena;
  private String komentar;

  public Ocjena() {}

  public Ucitelj getUcitelj() {
    return ucitelj;
  }

  public void setUcitelj(Ucitelj ucitelj) {
    this.ucitelj = ucitelj;
  }

  public Ucenik getUcenik() {
    return ucenik;
  }

  public void setUcenik(Ucenik ucenik) {
    this.ucenik = ucenik;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getOcjena() {
    return ocjena;
  }

  public void setOcjena(Integer ocjena) {
    this.ocjena = ocjena;
  }

  public String getKomentar() {
    return komentar;
  }

  public void setKomentar(String komentar) {
    this.komentar = komentar;
  }
}
