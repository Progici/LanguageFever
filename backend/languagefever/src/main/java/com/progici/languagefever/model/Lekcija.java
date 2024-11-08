package com.progici.languagefever.model;

import com.progici.languagefever.service.UcenikService;
import com.progici.languagefever.service.UciteljService;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import org.springframework.beans.factory.annotation.Autowired;

@Entity
public class Lekcija {

  @Autowired
  private UciteljService uciteljService;

  @Autowired
  private UcenikService ucenikService;

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
    Long idLekcija,
    Long idUcenik,
    Long idUcitelj,
    String vrijemeLekcije,
    StatusEnum status
  ) {
    this.id = idLekcija;
    this.ucenik = ucenikService.getUcenikById(idUcenik);
    this.ucitelj = uciteljService.getUciteljById(idUcitelj);
    this.vrijemeLekcije = vrijemeLekcije;
    this.status = status;
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
