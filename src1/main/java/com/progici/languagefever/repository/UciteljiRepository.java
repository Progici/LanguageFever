package com.progici.languagefever.repository;

import com.progici.languagefever.model.Ucitelj;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UciteljiRepository extends JpaRepository<Ucitelj, Long> {
  public Ucitelj findByKorisnikId(Long id);
}
