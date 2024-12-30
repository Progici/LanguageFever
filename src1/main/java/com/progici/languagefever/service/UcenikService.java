package com.progici.languagefever.service;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.repository.KorisniciRepository;
import com.progici.languagefever.repository.UceniciRepository;
import com.progici.languagefever.repository.UcenikJeziciRepository;
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

  public Ucenik getUcenikById(Long id) throws Exception {
    return uceniciRepository.findById(id).get();
  }

  public Ucenik getUcenikByKorisnikId(Long id) {
    return uceniciRepository.findByKorisnikId(id);
  }

  public void addUcenikByKorisnikId(Ucenik ucenik, Long idKorisnika)
    throws Exception {
    Korisnik korisnik = korisniciRepository
      .findById(idKorisnika)
      .orElseThrow(() -> new RuntimeException("Korisnik not found"));
    ucenik.setKorisnik(korisnik);
    uceniciRepository.save(ucenik);
  }

  public void addUcenik(Ucenik ucenik) {
    uceniciRepository.save(ucenik);
  }

  public void updateUcenikByKorisnikId(Long id, Ucenik ucenik) {
    Ucenik UcenikById = getUcenikByKorisnikId(id);
    UcenikById.setCiljevi(ucenik.getCiljevi());
    UcenikById.setRazina(ucenik.getRazina());
    UcenikById.setStilUcenja(ucenik.getStilUcenja());
    uceniciRepository.save(UcenikById);
  }

  public void addUcenikByKorisnikEmail(Ucenik ucenik, String email) {
    Korisnik korisnik = korisniciRepository.findByEmail(email);
    ucenik.setKorisnik(korisnik);
    uceniciRepository.save(ucenik);
  }

  public void updateUcenikById(Long id, Ucenik ucenik) throws Exception {
    Ucenik UcenikById = getUcenikById(id);
    UcenikById.setCiljevi(ucenik.getCiljevi());
    UcenikById.setKorisnik(ucenik.getKorisnik());
    UcenikById.setRazina(ucenik.getRazina());
    UcenikById.setStilUcenja(ucenik.getStilUcenja());
    uceniciRepository.save(UcenikById);
  }

  public void deleteUcenikById(Long id) {
    uceniciRepository.deleteById(id);
  }

  public void deleteUcenikAll() {
    uceniciRepository.deleteAll();
  }
}
