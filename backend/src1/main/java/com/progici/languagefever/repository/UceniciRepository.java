package com.progici.languagefever.repository;

import com.progici.languagefever.model.Ucenik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.progici.languagefever.repository.KorisniciRepository;

@Repository
public interface UceniciRepository extends JpaRepository<Ucenik, Long> {}
