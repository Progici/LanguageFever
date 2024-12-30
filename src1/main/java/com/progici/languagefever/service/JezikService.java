package com.progici.languagefever.service;

import com.progici.languagefever.model.Jezik;
import com.progici.languagefever.repository.JeziciRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JezikService {

  @Autowired
  private JeziciRepository jeziciRepository;

  public List<Jezik> getSviJezici() {
    List<Jezik> sviJezici = new ArrayList<>();
    jeziciRepository.findAll().forEach(sviJezici::add);
    return sviJezici;
  }

  public Jezik getJezikById(Long id) {
    return jeziciRepository.findById(id).get();
  }

  public Jezik getJezikByName(String name) {
    return jeziciRepository.findByName(name);
  }

  public void addJezik(String jezikName) {
    Jezik jezik = new Jezik();
    jezik.setName(jezikName);
    jeziciRepository.save(jezik);
  }

  public void updateJezikById(Long id, Jezik jezik) {
    Jezik newJezik = jeziciRepository.findById(id).get();
    newJezik.setName(jezik.getName());
    jeziciRepository.save(newJezik);
  }

  public void deleteJezikById(Long id) {
    jeziciRepository.deleteById(id);
  }
}
