package com.progici.languagefever.model.dto;

import com.progici.languagefever.model.enums.Status;
import java.sql.Timestamp;

public class LekcijaDTO {

  private Long id;
  private Timestamp timestampPocetka;
  private Timestamp timestampZavrsetka;
  private Status status;
  private String ucenikName;
  private String uciteljName;
  private Long ucenikKorisnikId;
  private Long uciteljKorisnikId;

  public LekcijaDTO(
    Long id,
    Timestamp timestampPocetka,
    Timestamp timestampZavrsetka,
    Status status,
    String ucenikName,
    String uciteljName,
    Long ucenikKorisnikId,
    Long uciteljKorisnikId
  ) {
    this.id = id;
    this.timestampPocetka = timestampPocetka;
    this.timestampZavrsetka = timestampZavrsetka;
    this.status = status;
    this.ucenikName = ucenikName;
    this.uciteljName = uciteljName;
    this.ucenikKorisnikId = ucenikKorisnikId;
    this.uciteljKorisnikId = uciteljKorisnikId;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Timestamp getTimestampPocetka() {
    return timestampPocetka;
  }

  public void setTimestampPocetka(Timestamp timestampPocetka) {
    this.timestampPocetka = timestampPocetka;
  }

  public Timestamp getTimestampZavrsetka() {
    return timestampZavrsetka;
  }

  public void setTimestampZavrsetka(Timestamp timestampZavrsetka) {
    this.timestampZavrsetka = timestampZavrsetka;
  }

  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
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

  public Long getUcenikKorisnikId() {
    return ucenikKorisnikId;
  }

  public void setUcenikKorisnikId(Long ucenikKorisnikId) {
    this.ucenikKorisnikId = ucenikKorisnikId;
  }

  public Long getUciteljKorisnikId() {
    return uciteljKorisnikId;
  }

  public void setUciteljKorisnikId(Long uciteljKorisnikId) {
    this.uciteljKorisnikId = uciteljKorisnikId;
  }
}
