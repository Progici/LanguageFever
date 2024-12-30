package com.progici.languagefever.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table
public class Poruka {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "id_sender")
  private Korisnik sender;

  @ManyToOne
  @JoinColumn(name = "id_receiver")
  private Korisnik receiver;

  private Timestamp timestampPoruke;
  private String sadrzaj;

  public Poruka() {}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Korisnik getSender() {
    return sender;
  }

  public void setSender(Korisnik sender) {
    this.sender = sender;
  }

  public Korisnik getReceiver() {
    return receiver;
  }

  public void setReceiver(Korisnik receiver) {
    this.receiver = receiver;
  }

  public Timestamp getTimestampPoruke() {
    return timestampPoruke;
  }

  public void setTimestampPoruke(Timestamp timestampPoruke) {
    this.timestampPoruke = timestampPoruke;
  }

  public String getSadrzaj() {
    return sadrzaj;
  }

  public void setSadrzaj(String sadrzaj) {
    this.sadrzaj = sadrzaj;
  }
}
