package com.progici.languagefever.repository;

import com.progici.languagefever.model.UciteljJezici;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UciteljJeziciRepository
  extends JpaRepository<UciteljJezici, Long> {
  public List<UciteljJezici> findByUciteljId(Long id);
}
