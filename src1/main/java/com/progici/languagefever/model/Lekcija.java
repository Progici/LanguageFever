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
  @JoinColumn(name = "id_ucenik")
  private Ucenik ucenik;

  @ManyToOne
  @JoinColumn(name = "id_ucitelj")
  private Ucitelj ucitelj;

  private Timestamp timestampLekcije;

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

  public Timestamp getTimestampLekcije() {
    return timestampLekcije;
  }

  public void setTimestampLekcije(Timestamp timestampLekcije) {
    this.timestampLekcije = timestampLekcije;
  }

  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }
}
