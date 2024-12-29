package com.progici.languagefever.service;

import com.progici.languagefever.model.Jezik;
import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.repository.KorisniciRepository;
import com.progici.languagefever.repository.UciteljiRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

  public Ucitelj getUciteljById(Long id) throws Exception {
    return uciteljiRepository.findById(id).get();
  }

  public Ucitelj getUciteljByKorisnikId(Long id) {
    return uciteljiRepository.findByKorisnikId(id);
  }

  public void addUciteljByKorisnikId(Ucitelj ucitelj, Long idKorisnika)
    throws Exception {
    Korisnik korisnik = korisniciRepository
      .findById(idKorisnika)
      .orElseThrow(() -> new RuntimeException("Korisnik not found"));
    ucitelj.setKorisnik(korisnik);
    uciteljiRepository.save(ucitelj);
  }

  public void updateUciteljById(Long id, Ucitelj ucitelj) throws Exception {
    Ucitelj UciteljById = getUciteljById(id);
    UciteljById.setGodineIskustva(ucitelj.getGodineIskustva());
    UciteljById.setKorisnik(ucitelj.getKorisnik());
    UciteljById.setKvalifikacija(ucitelj.getKvalifikacija());
    UciteljById.setSatnica(ucitelj.getSatnica());
    UciteljById.setStilPoducavanja(ucitelj.getStilPoducavanja());
    uciteljiRepository.save(UciteljById);
  }

  public void deleteUciteljById(Long id) {
    uciteljiRepository.deleteById(id);
  }

  public void deleteUciteljAll() {
    uciteljiRepository.deleteAll();
  }

public void addUciteljByKorisnikEmail(Ucitelj ucitelj, String email) {
    Korisnik korisnik = korisniciRepository
      .findByEmail(email);
    ucitelj.setKorisnik(korisnik);
    uciteljiRepository.save(ucitelj);
  }
}
