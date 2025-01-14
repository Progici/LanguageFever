package com.progici.languagefever.repository;

import com.progici.languagefever.model.Lekcija;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface LekcijaRepository extends JpaRepository<Lekcija, Long> {
  public List<Lekcija> findByUciteljId(Long id);

  public List<Lekcija> findByUcenikId(Long id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Lekcija l WHERE l.timestampZavrsetka < CURRENT_TIMESTAMP AND (l.status = 'AVAILABLE' OR l.status = 'PENDING')")
    void deleteExpiredLekcija();

    @Modifying
    @Transactional
    @Query("UPDATE Lekcija l SET l.status = 'FINISHED' WHERE l.timestampZavrsetka < CURRENT_TIMESTAMP AND l.status = 'ACCEPTED'")
    void updateAcceptedLekcijaStatus();
}
