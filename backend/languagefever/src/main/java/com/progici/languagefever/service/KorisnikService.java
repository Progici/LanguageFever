package com.progici.languagefever.service;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.repository.KorisniciRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KorisnikService {

  @Autowired
  private KorisniciRepository korisniciRepository;

  List<Korisnik> korisnici = new ArrayList<>(
    Arrays.asList(
      new Korisnik("1", "marko", "horvat", "marko.horvat@gmail.com"),
      new Korisnik("2", "filip", "marovic", "filip.marovic@gmail.com"),
      new Korisnik("3", "josip", "pazan", "josip.pazan@gmail.com")
    )
  );

  public List<Korisnik> getKorisnici() {
    List<Korisnik> sviKorisnici = new ArrayList<>();
    korisniciRepository.findAll().forEach(sviKorisnici::add);
    return sviKorisnici;
  }

  public Korisnik getKorisnik(String id) {
    return korisnici
      .stream()
      .filter(t -> t.getIdKorisnik().equals(id))
      .findFirst()
      .get();
  }

  public void addKorisnik(Korisnik korisnik) {
    korisniciRepository.save(korisnik);
  }

  public void updateKorisnik(String id, Korisnik korisnik) {
    for (int i = 0; i < korisnici.size(); i++) {
      Korisnik k = korisnici.get(i);
      if (k.getIdKorisnik().equals(id)) {
        korisnici.set(i, korisnik);
        return;
      }
    }
  }

  public void deleteKorisnik(String id) {
    korisnici.removeIf(k -> k.getIdKorisnik().equals(id));
  }
}
