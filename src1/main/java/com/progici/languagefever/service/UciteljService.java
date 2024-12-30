package com.progici.languagefever.service;

import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.repository.UciteljiRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UciteljService {

  @Autowired
  private UciteljiRepository uciteljiRepository;

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

  public void addUcitelj(Ucitelj ucitelj) {
    uciteljiRepository.save(ucitelj);
  }

  public void updateUciteljByKorisnikId(Long id, Ucitelj ucitelj) {
    Ucitelj UciteljById = getUciteljByKorisnikId(id);
    UciteljById.setGodineIskustva(ucitelj.getGodineIskustva());
    UciteljById.setKvalifikacija(ucitelj.getKvalifikacija());
    UciteljById.setSatnica(ucitelj.getSatnica());
    UciteljById.setStilPoducavanja(ucitelj.getStilPoducavanja());
    uciteljiRepository.save(UciteljById);
  }

  public void deleteUciteljById(Long id) {
    uciteljiRepository.deleteById(id);
  }
}
