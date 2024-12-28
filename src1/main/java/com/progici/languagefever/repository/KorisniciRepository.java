package com.progici.languagefever.repository;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.enums.Role;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KorisniciRepository extends JpaRepository<Korisnik, Long> {
  public Korisnik findByEmail(String email);

  public List<Korisnik> findByName(String name);

  public List<Korisnik> findByRole(Role role);
}
