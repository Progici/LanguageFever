package com.progici.languagefever.service;

import com.progici.languagefever.model.Jezik;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.UcenikJezici;
import com.progici.languagefever.repository.JeziciRepository;
import com.progici.languagefever.repository.UcenikJeziciRepository;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UcenikJeziciService {

  @Autowired
  private UcenikJeziciRepository ucenikJeziciRepository;

  @Autowired
  private JezikService jezikService;

  public List<Jezik> getJeziciByUcenikId(Long UcenikId) {
    return ucenikJeziciRepository
      .findByUcenikId(UcenikId)
      .stream()
      .map(UcenikJezici::getJezik)
      .collect(Collectors.toList());
  }

  public List<String> getJeziciStringByUcenikId(Long UcenikId) {
    return ucenikJeziciRepository
      .findByUcenikId(UcenikId)
      .stream()
      .map(ucenikJezici -> ucenikJezici.getJezik().getName())
      .collect(Collectors.toList());
  }

  public void addUcenikJezik(Jezik jezik, Ucenik ucenik) {
    UcenikJezici ucenikJezici = new UcenikJezici();
    ucenikJezici.setJezik(jezik);
    ucenikJezici.setUcenik(ucenik);
    ucenikJeziciRepository.save(ucenikJezici);
  }

  public void addJeziciToUcenik(List<String> jeziciString, Ucenik ucenik) {
    deleteJeziciByUcenikId(ucenik.getId());

    jeziciString
      .stream()
      .map(jezikString -> jezikService.getJezikByName(jezikString))
      .filter(Objects::nonNull)
      .forEach(jezik -> addUcenikJezik(jezik, ucenik));
  }

  public void deleteJeziciByUcenikId(Long UcenikId) {
    ucenikJeziciRepository
      .findByUcenikId(UcenikId)
      .forEach(ucenikJezici ->
        ucenikJeziciRepository.deleteById(ucenikJezici.getId())
      );
  }

  public void deleteJeziciByJezikId(Long JezikId) {
    ucenikJeziciRepository
      .findByJezikId(JezikId)
      .forEach(jezik -> ucenikJeziciRepository.deleteById(jezik.getId()));
  }
}
