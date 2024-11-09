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
  private Long idUcenik;
  private Long idUcitelj;
 

  @ManyToOne
  private Ucenik ucenik;

  @ManyToOne
  private Ucitelj ucitelj;

  private String vrijemeLekcije;
  private StatusEnum status;


  public Long getIdUcenik() {
    return idUcenik;
  }


  public void setIdUcenik(Long idUcenik) {
    this.idUcenik = idUcenik;
  }


  public Long getIdUcitelj() {
    return idUcitelj;
  }


  public void setIdUcitelj(Long idUcitelj) {
    this.idUcitelj = idUcitelj;
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


  public Lekcija() {
    System.out.printf("Deafault");
  }

   /*  public Lekcija(Long id, Long idUcenik, Long idUcitelj, String vrijemeLekcije,  StatusEnum status) {
        this.id = id;
        this.idUcenik = idUcenik;
        this.idUcitelj = idUcitelj;
        this.status = status;
        this.vrijemeLekcije = vrijemeLekcije;
    }
*/
    
 

  


}
