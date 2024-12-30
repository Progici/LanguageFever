package com.progici.languagefever.repository;

import com.progici.languagefever.model.Jezik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JeziciRepository extends JpaRepository<Jezik, Long> {
  public Jezik findByName(String name);
}
