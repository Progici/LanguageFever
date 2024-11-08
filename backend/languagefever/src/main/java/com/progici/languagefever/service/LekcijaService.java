package com.progici.languagefever.service;

import com.progici.languagefever.model.Lekcija;
import com.progici.languagefever.repository.LekcijaRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LekcijaService {

  @Autowired
  private LekcijaRepository lekcijaRepository;

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

  public List<Lekcija> getLekcijeByUcenikId(Long id) {
    List<Lekcija> sveLekcije = new ArrayList<>();
    lekcijaRepository.findByUcenikId(id).forEach(sveLekcije::add);
    return sveLekcije;
  }

  public Lekcija getLekcijaById(Long id) {
    return lekcijaRepository.findById(id).get();
  }

  public void addLekcija(Lekcija lekcija) {
    lekcijaRepository.save(lekcija);
  }

  public void updateLekcija(Long id, Lekcija lekcija) {
    lekcijaRepository.save(lekcija);
  }

  public void deleteLekcija(Long id) {
    lekcijaRepository.deleteById(id);
  }
}
