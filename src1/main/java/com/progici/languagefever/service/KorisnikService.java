package com.progici.languagefever.service;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.enums.Role;
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

  public Korisnik getKorisnikById(Long id) throws Exception {
    return korisniciRepository.findById(id).get();
  }

  public List<Korisnik> getAllAdminRoles() {
    return korisniciRepository.findByRole(Role.ROLE_ADMIN);
  }

  public List<Korisnik> getAllUserRoles() {
    return korisniciRepository.findByRole(Role.ROLE_USER);
  }

  public Korisnik getKorisnikByEmail(String email) {
    return korisniciRepository.findByEmail(email);
  }

  public void addKorisnik(Korisnik korisnik) {
    korisniciRepository.save(korisnik);
  }

  public void updateKorisnikById(Long id, Korisnik korisnik) throws Exception {
    Korisnik korisnikById = getKorisnikById(id);
    //namjerno stavljeno da je email nepromjenjiv
    //korisnikById.setEmail(korisnik.getEmail());
    korisnikById.setName(korisnik.getName());
    korisnikById.setPicture(korisnik.getPicture());
    korisnikById.setRole(korisnik.getRole());
    korisniciRepository.save(korisnikById);
  }

  public void deleteKorisnikById(Long id) {
    korisniciRepository.deleteById(id);
  }
}
