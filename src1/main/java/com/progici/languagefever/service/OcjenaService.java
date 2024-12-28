package com.progici.languagefever.service;
import com.progici.languagefever.model.Ocjena;
import com.progici.languagefever.repository.OcjenaRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
public class OcjenaService {
  @Autowired
  private OcjenaRepository ocjenaRepository;
  public List<Ocjena> getSveOcjene() {
    List<Ocjena> sveOcjene = new ArrayList<>();
    ocjenaRepository.findAll().forEach(sveOcjene::add);
    return sveOcjene;
  }
  public List<Ocjena> getOcjeneByUciteljId(Long id) {
    List<Ocjena> sveOcjene = new ArrayList<>();
    ocjenaRepository.findByUciteljId(id).forEach(sveOcjene::add);
    return sveOcjene;
  }
  public List<Ocjena> getOcjeneByUcenikId(Long id) {
    List<Ocjena> sveOcjene = new ArrayList<>();
    ocjenaRepository.findByUcenikId(id).forEach(sveOcjene::add);
    return sveOcjene;
  }
  public Ocjena getOcjenaById(Long id) throws Exception {
    return ocjenaRepository.findById(id).get();
  }
  public void addOcjena(Ocjena ocjena) {
    ocjenaRepository.save(ocjena);
  }
  public void updateOcjenaById(Long id, Ocjena ocjena) throws Exception {
    Ocjena OcjenaById = getOcjenaById(id);
    OcjenaById.setOcjena(ocjena.getOcjena());
    OcjenaById.setKomentar(ocjena.getKomentar());
    ocjenaRepository.save(OcjenaById);
  }
  public void deleteOcjenaById(Long id) {
    ocjenaRepository.deleteById(id);
  }
  public void deleteOcjenaAll() {
    ocjenaRepository.deleteAll();
  }
}