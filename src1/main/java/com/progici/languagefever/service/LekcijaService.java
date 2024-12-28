package com.progici.languagefever.service;

import com.progici.languagefever.model.Lekcija;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.model.enums.Status;
import com.progici.languagefever.repository.LekcijaRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LekcijaService {

  @Autowired
  private LekcijaRepository lekcijaRepository;

  @Autowired
  private UcenikService ucenikService;

  @Autowired
  private UciteljService uciteljService;

  public List<Lekcija> getSveLekcije() {
    List<Lekcija> sveLekcije = new ArrayList<>();
    lekcijaRepository.findAll().forEach(sveLekcije::add);
    return sveLekcije;
  }

  public List<Lekcija> getLekcijeByUciteljId(Long id) {
    List<Lekcija> sveLekcije = new ArrayList<>();
    lekcijaRepository.findByUciteljId(id).forEach(sveLekcije::add);
    return sveLekcije;
  }

  public List<Lekcija> getLekcijeByUciteljIdAndByStatusPending(Long id) {
    List<Lekcija> sveLekcije = new ArrayList<>();
    lekcijaRepository
      .findByUciteljId(id)
      .forEach(e -> {
        if (e.getStatus() == Status.PENDING) {
          sveLekcije.add(e);
        }
      });
    return sveLekcije;
  }

  public List<Lekcija> getLekcijeByUcenikId(Long id) {
    List<Lekcija> sveLekcije = new ArrayList<>();
    lekcijaRepository.findByUcenikId(id).forEach(sveLekcije::add);
    return sveLekcije;
  }

  public Lekcija getLekcijaById(Long id) throws Exception {
    return lekcijaRepository.findById(id).get();
  }

  public void rezervirajLekciju(Long id, Ucenik ucenik) throws Exception {
    Lekcija lekcija = lekcijaRepository.findById(id).get();
    lekcija.setStatus(Status.PENDING);
    lekcija.setUcenik(ucenik);
    lekcijaRepository.save(lekcija);
  }

  public void otkaziRezervacijuLekcije(Long id) throws Exception {
    Lekcija lekcija = lekcijaRepository.findById(id).get();
    lekcija.setStatus(Status.AVAILABLE);
    lekcija.setUcenik(null);
    lekcijaRepository.save(lekcija);
  }

  public void prihvatiRezervacijuLekcije(Long id) throws Exception {
    Lekcija lekcija = lekcijaRepository.findById(id).get();
    lekcija.setStatus(Status.ACCEPTED);
    lekcijaRepository.save(lekcija);
  }

  public void addLekcija(Lekcija lekcija, Ucitelj ucitelj) throws Exception {
    Lekcija newLekcija = new Lekcija();
    newLekcija.setUcitelj(ucitelj);
    newLekcija.setTimestampLekcije(lekcija.getTimestampLekcije());
    newLekcija.setStatus(Status.AVAILABLE);
    lekcijaRepository.save(newLekcija);
  }

  public void addLekcijaExplicit(
    Lekcija lekcija,
    Ucitelj ucitelj,
    Ucenik ucenik
  ) throws Exception {
    Lekcija newLekcija = new Lekcija();
    newLekcija.setUcitelj(ucitelj);
    newLekcija.setUcenik(ucenik);
    newLekcija.setTimestampLekcije(lekcija.getTimestampLekcije());
    newLekcija.setStatus(lekcija.getStatus());
    lekcijaRepository.save(newLekcija);
  }

  public void updateLekcijaById(Long id, Lekcija lekcija) throws Exception {
    Lekcija LekcijaById = getLekcijaById(id);
    LekcijaById.setStatus(lekcija.getStatus());
    LekcijaById.setTimestampLekcije(lekcija.getTimestampLekcije());

    lekcijaRepository.save(LekcijaById);
  }

  public void deleteLekcijaById(Long id) {
    lekcijaRepository.deleteById(id);
  }

  public void deleteLekcijaAll() {
    lekcijaRepository.deleteAll();
  }
}