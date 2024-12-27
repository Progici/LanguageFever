package com.progici.languagefever.service;

import com.progici.languagefever.model.Lekcija;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.Ucitelj;
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

  public List<Lekcija> getLekcijeByUcenikId(Long id) {
    List<Lekcija> sveLekcije = new ArrayList<>();
    lekcijaRepository.findByUcenikId(id).forEach(sveLekcije::add);
    return sveLekcije;
  }

  public Lekcija getLekcijaById(Long id) {
    return lekcijaRepository.findById(id).get();
  }

  public void addLekcija(Lekcija lekcija, Long idUcitelja, Long idUcenika)
    throws Exception {
    Ucitelj ucitelj = uciteljService.getUciteljById(idUcitelja);
    lekcija.setUcitelj(ucitelj);
    Ucenik ucenik = ucenikService.getUcenikById(idUcenika);
    lekcija.setUcenik(ucenik);

    lekcijaRepository.save(lekcija);
  }

  public void updateLekcijaById(Long id, Lekcija lekcija) throws Exception {
    Lekcija LekcijaById = getLekcijaById(id);
    LekcijaById.setStatus(lekcija.getStatus());
    LekcijaById.settimestampPocetka(lekcija.gettimestampPocetka());

    lekcijaRepository.save(LekcijaById);
  }

  public void deleteLekcijaById(Long id) {
    lekcijaRepository.deleteById(id);
  }
}
