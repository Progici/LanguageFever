package com.progici.languagefever.service;

import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.repository.UceniciRepository;
import com.progici.languagefever.repository.KorisniciRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UcenikService {

  @Autowired
  private UceniciRepository uceniciRepository;

  @Autowired
  private KorisniciRepository korisniciRepository;

  public List<Ucenik> getSviUcenici() {
    List<Ucenik> sviUcenici = new ArrayList<>();
    uceniciRepository.findAll().forEach(sviUcenici::add);
    return sviUcenici;
  }

  public Ucenik getUcenikById(Long id) {
    return uceniciRepository.findById(id).get();
  }

  public void addUcenik(Ucenik ucenik) {
    Korisnik korisnik = ucenik.getKorisnik(); 
    korisnik = korisniciRepository.findById(korisnik.getId());
    ucenik.setKorisnik(korisnik);
    return uceniciRepository.save(ucenik);
}

  public void updateUcenikById(Long id, Ucenik ucenik) {
    ucenik.setId(id);
    uceniciRepository.save(ucenik);
  }

  public void deleteUcenikById(Long id) {
    uceniciRepository.deleteById(id);
  }
}
