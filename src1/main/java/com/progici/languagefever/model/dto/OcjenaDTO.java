package com.progici.languagefever.model.dto;

public class OcjenaDTO {

  private Integer ocjena;
  private String komentar;
  private String ucenikName;
  private String uciteljName;

  public OcjenaDTO(
    Integer ocjena,
    String komentar,
    String ucenikName,
    String uciteljName
  ) {
    this.ocjena = ocjena;
    this.komentar = komentar;
    this.ucenikName = ucenikName;
    this.uciteljName = uciteljName;
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

  public String getUcenikName() {
    return ucenikName;
  }

  public void setUcenikName(String ucenikName) {
    this.ucenikName = ucenikName;
  }

  public String getUciteljName() {
    return uciteljName;
  }

  public void setUciteljName(String uciteljName) {
    this.uciteljName = uciteljName;
  }
}
