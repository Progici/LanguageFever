package com.progici.languagefever.repository;

import com.progici.languagefever.model.Ucitelj_jezici;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Ucitelj_jeziciRepository extends JpaRepository<Ucitelj_jezici, Long> {
}

