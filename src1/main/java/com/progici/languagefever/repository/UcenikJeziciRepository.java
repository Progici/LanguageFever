package com.progici.languagefever.repository;

import com.progici.languagefever.model.UcenikJezici;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UcenikJeziciRepository
  extends JpaRepository<UcenikJezici, Long> {
  public List<UcenikJezici> findByUcenikId(Long id);

  public List<UcenikJezici> findByJezikId(Long id);
}
