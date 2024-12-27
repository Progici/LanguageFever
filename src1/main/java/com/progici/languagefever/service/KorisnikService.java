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

  public void processOAuthPostLogin(
    String name,
    String email,
    String pictureLink
  ) {
    Korisnik existUser = korisniciRepository.findByEmail(email);

    if (existUser == null) {
      Korisnik newUser = new Korisnik();
      newUser.setName(name);
      System.out.println("name: " + name);
      System.out.println("picture: " + pictureLink);
      System.out.println("email: " + email);
      newUser.setEmail(email);
      newUser.setPicture(pictureLink);
      korisniciRepository.save(newUser);
    }
  }

  public List<Korisnik> getSviKorisnici() {
    List<Korisnik> sviKorisnici = new ArrayList<>();
    korisniciRepository.findAll().forEach(sviKorisnici::add);
    return sviKorisnici;
  }

  public Korisnik getKorisnikById(Long id) {
    return korisniciRepository.findById(id).get();
  }

  public Korisnik getKorisnikByEmail(String email) {
    return korisniciRepository.findByEmail(email);
  }

  public void addKorisnik(Korisnik korisnik) {
    korisniciRepository.save(korisnik);
  }

  public void updateKorisnikById(Long id, Korisnik korisnik) {
    korisnik.setId(id);
    korisniciRepository.save(korisnik);
  }

  public void deleteKorisnikById(Long id) {
    korisniciRepository.deleteById(id);
  }
}
