package com.progici.languagefever.service;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.repository.KorisniciRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KorisnikService {

  @Autowired
  private KorisniciRepository korisniciRepository;

  public List<Korisnik> getSviKorisnici() {
    List<Korisnik> sviKorisnici = new ArrayList<>();
    korisniciRepository.findAll().forEach(sviKorisnici::add);
    return sviKorisnici;
  }

  public Korisnik getKorisnikById(Long id) {
    return korisniciRepository.findById(id).get();
  }

  public void addKorisnik(Korisnik korisnik) {
    korisniciRepository.save(korisnik);
  }

  public void updateKorisnik(Long id, Korisnik korisnik) {
    korisniciRepository.save(korisnik);
  }

  public void deleteKorisnik(Long id) {
    korisniciRepository.deleteById(id);
  }
}
