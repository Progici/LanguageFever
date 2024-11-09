package com.progici.languagefever.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Lekcija {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  private Ucenik ucenik;

  @ManyToOne
  private Ucitelj ucitelj;

  private String vrijemeLekcije;
  private StatusEnum status;

  public Lekcija() {}

  public Lekcija(
    String idLekcija,
    String idUcenik,
    String idUcitelj,
    String vrijemeLekcije,
    String status
  ) {
    this.id = new Long(0);
    this.ucenik = new Ucenik(new Long(0), "", "", "");
    this.ucitelj = new Ucitelj(new Long(0), "", "", "", "", "", "");
    this.vrijemeLekcije = "vrijemeLekcije;";
    this.status = StatusEnum.ACCEPTED;
  }

  public Lekcija(
    Long idLekcija,
    Long idUcenik,
    Long idUcitelj,
    String vrijemeLekcije,
    String status
  ) {
    this.id = idLekcija;
    this.ucenik = new Ucenik(idUcenik, "", "", "");
    this.ucitelj = new Ucitelj(idUcitelj, "", "", "", "", "", "");
    this.vrijemeLekcije = vrijemeLekcije;
    this.status = StatusEnum.ACCEPTED;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Ucenik getUcenik() {
    return ucenik;
  }

  public void setUcenik(Ucenik ucenik) {
    this.ucenik = ucenik;
  }

  public Ucitelj getUcitelj() {
    return ucitelj;
  }

  public void setUcitelj(Ucitelj ucitelj) {
    this.ucitelj = ucitelj;
  }

  public String getVrijemeLekcije() {
    return vrijemeLekcije;
  }

  public void setVrijemeLekcije(String vrijemeLekcije) {
    this.vrijemeLekcije = vrijemeLekcije;
  }

  public StatusEnum getStatus() {
    return status;
  }

  public void setStatus(StatusEnum status) {
    this.status = status;
  }
}
