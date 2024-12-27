package com.progici.languagefever.repository;

import com.progici.languagefever.model.UcenikJezici;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UcenikJeziciRepository extends JpaRepository<UcenikJezici, Long> {
}
