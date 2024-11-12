package com.progici.languagefever.service;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.repository.UciteljiRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.progici.languagefever.repository.KorisniciRepository;

@Service
public class UciteljService {

  @Autowired
  private UciteljiRepository uciteljiRepository;

  @Autowired
  private KorisniciRepository korisniciRepository;

  public List<Ucitelj> getSviUcitelji() {
    List<Ucitelj> sviUcitelji = new ArrayList<>();
    uciteljiRepository.findAll().forEach(sviUcitelji::add);
    return sviUcitelji;
  }

  public Ucitelj getUciteljById(Long id) {
    return uciteljiRepository.findById(id).get();
  }

  public void addUcitelj(Long id_korisnik,Ucitelj ucitelj) {
      
      Korisnik korisnik = korisniciRepository.findById(id_korisnik)
      .orElseThrow(() -> new IllegalArgumentException("Invalid korisnik ID: " + id_korisnik));;
      ucitelj.setKorisnik(korisnik);
      uciteljiRepository.save(ucitelj);
  }

  public void updateUciteljById(Long id, Ucitelj ucitelj) {
    ucitelj.setId(id);
    uciteljiRepository.save(ucitelj);
  }

  public void deleteUciteljById(Long id) {
    uciteljiRepository.deleteById(id);
  }
}
