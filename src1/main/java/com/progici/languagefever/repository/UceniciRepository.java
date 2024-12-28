package com.progici.languagefever.repository;

import com.progici.languagefever.model.Ucenik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UceniciRepository extends JpaRepository<Ucenik, Long> {
    public Ucenik findByKorisnikId(Long id);
}
