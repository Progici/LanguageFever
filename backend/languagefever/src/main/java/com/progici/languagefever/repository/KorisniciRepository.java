package com.progici.languagefever.repository;

import com.progici.languagefever.model.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KorisniciRepository extends JpaRepository<Korisnik, Long> {}
