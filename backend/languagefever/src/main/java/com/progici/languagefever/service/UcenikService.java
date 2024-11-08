package com.progici.languagefever.service;

import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.repository.UceniciRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UcenikService {

  @Autowired
  private UceniciRepository uceniciRepository;

  public List<Ucenik> getSviUcenici() {
    List<Ucenik> sviUcenici = new ArrayList<>();
    uceniciRepository.findAll().forEach(sviUcenici::add);
    return sviUcenici;
  }

  public Ucenik getUcenikById(Long id) {
    return uceniciRepository.findById(id).get();
  }

  public void addUcenik(Ucenik ucenik) {
    uceniciRepository.save(ucenik);
  }

  public void updateUcenik(String id, Ucenik ucenik) {
    uceniciRepository.save(ucenik);
  }

  public void deleteUcenik(Long id) {
    uceniciRepository.deleteById(id);
  }
}
