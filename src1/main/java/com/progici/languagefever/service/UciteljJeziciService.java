package com.progici.languagefever.service;

import com.progici.languagefever.model.Jezik;
import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.model.UciteljJezici;
import com.progici.languagefever.repository.UciteljJeziciRepository;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UciteljJeziciService {

  @Autowired
  private UciteljJeziciRepository uciteljJeziciRepository;

  @Autowired
  private JezikService jezikService;

  public List<Jezik> getJeziciByUciteljId(Long UciteljId) {
    return uciteljJeziciRepository
      .findByUciteljId(UciteljId)
      .stream()
      .map(UciteljJezici::getJezik)
      .collect(Collectors.toList());
  }

  public List<String> getJeziciStringByUciteljId(Long UciteljId) {
    return uciteljJeziciRepository
      .findByUciteljId(UciteljId)
      .stream()
      .map(uciteljJezici -> uciteljJezici.getJezik().getName())
      .collect(Collectors.toList());
  }

  public void addUciteljJezik(Jezik jezik, Ucitelj ucitelj) {
    UciteljJezici uciteljJezici = new UciteljJezici();
    uciteljJezici.setJezik(jezik);
    uciteljJezici.setUcitelj(ucitelj);
    uciteljJeziciRepository.save(uciteljJezici);
  }

  public void addJeziciToUcitelj(List<String> jeziciString, Ucitelj ucitelj) {
    deleteJeziciByUciteljId(ucitelj.getId());

    jeziciString
      .stream()
      .map(jezikString -> jezikService.getJezikByName(jezikString))
      .filter(Objects::nonNull)
      .forEach(jezik -> addUciteljJezik(jezik, ucitelj));
  }

  public void deleteJeziciByUciteljId(Long UciteljId) {
    uciteljJeziciRepository
      .findByUciteljId(UciteljId)
      .forEach(uciteljJezici ->
        uciteljJeziciRepository.deleteById(uciteljJezici.getId())
      );
  }

  public void deleteJeziciByJezikId(Long JezikId) {
    uciteljJeziciRepository
      .findByJezikId(JezikId)
      .forEach(jezik -> uciteljJeziciRepository.deleteById(jezik.getId()));
  }
}
