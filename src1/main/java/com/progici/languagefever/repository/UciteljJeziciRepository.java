package com.progici.languagefever.repository;

import com.progici.languagefever.model.UciteljJezici;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UciteljJeziciRepository extends JpaRepository<UciteljJezici, Long> {
}

