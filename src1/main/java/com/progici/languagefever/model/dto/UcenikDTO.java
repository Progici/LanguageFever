package com.progici.languagefever.model.dto;

import com.progici.languagefever.model.enums.Razina;
import com.progici.languagefever.model.enums.Stil;
import java.util.List;

public class UcenikDTO {

  private Long id;
  private String name;
  private String picture;
  private List<String> jezici;
  private Razina razina;
  private Stil stilUcenja;

  private String ciljevi;

  public UcenikDTO(
    Long id,
    String name,
    String picture,
    List<String> jezici,
    Razina razina,
    Stil stilUcenja,
    String ciljevi
  ) {
    this.id = id;
    this.name = name;
    this.picture = picture;
    this.jezici = jezici;
    this.razina = razina;
    this.stilUcenja = stilUcenja;
    this.ciljevi = ciljevi;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<String> getJezici() {
    return jezici;
  }

  public void setJezici(List<String> jezici) {
    this.jezici = jezici;
  }

  public Razina getRazina() {
    return razina;
  }

  public void setRazina(Razina razina) {
    this.razina = razina;
  }

  public Stil getStilUcenja() {
    return stilUcenja;
  }

  public void setStilUcenja(Stil stilUcenja) {
    this.stilUcenja = stilUcenja;
  }

  public String getCiljevi() {
    return ciljevi;
  }

  public void setCiljevi(String ciljevi) {
    this.ciljevi = ciljevi;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getPicture() {
    return picture;
  }

  public void setPicture(String picture) {
    this.picture = picture;
  }
}
