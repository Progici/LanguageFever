package com.progici.languagefever.repository;

import com.progici.languagefever.model.Ocjena;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OcjenaRepository extends JpaRepository<Ocjena, Long> {
  public List<Ocjena> findByUciteljId(Long id);

  public List<Ocjena> findByUcenikId(Long id);
}
