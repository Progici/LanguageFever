package com.progici.languagefever.repository;

import com.progici.languagefever.model.Lekcija;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface LekcijaRepository extends CrudRepository<Lekcija, Long> {
  public List<Lekcija> findByUciteljId(Long idUcitelj);

  public List<Lekcija> findByUcenikId(Long idUcenik);
}
