package com.progici.languagefever.repository;

import com.progici.languagefever.model.Lekcija;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LekcijaRepository extends JpaRepository<Lekcija, Long> {
  public List<Lekcija> findByUciteljId(Long id);

  public List<Lekcija> findByUcenikId(Long id);
}
