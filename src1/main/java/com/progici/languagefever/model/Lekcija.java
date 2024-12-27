package com.progici.languagefever.model;

import com.progici.languagefever.model.enums.Status;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table
public class Lekcija {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "id_ucitelj")
  private Ucitelj ucitelj;

  @ManyToOne
  @JoinColumn(name = "id_ucenik")
  private Ucenik ucenik;

  private Timestamp timestampPocetka;
  private Timestamp timestampZavrsetka;

  @Enumerated(EnumType.STRING)
  private Status status;

  public Lekcija() {}

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

  public Timestamp gettimestampPocetka() {
    return timestampPocetka;
  }

  public void settimestampPocetka(Timestamp timestampPocetka) {
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
}
