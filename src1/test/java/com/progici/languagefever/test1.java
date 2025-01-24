package com.progici.languagefever;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.repository.KorisniciRepository;
import com.progici.languagefever.service.KorisnikService;

@ExtendWith(MockitoExtension.class)
public class test1 {

    @Mock
    private KorisniciRepository korisniciRepository;

    @InjectMocks
    private KorisnikService korisnikService;

    @Test
    public void testAddKorisnik_success() {
        Korisnik korisnik = new Korisnik();
        korisnik.setName("John Doe");
        korisnik.setEmail("john@example.com");

        when(korisniciRepository.save(korisnik)).thenReturn(korisnik); // Mock repository

        Korisnik savedKorisnik = korisnikService.addKorisnik1(korisnik);

        assertEquals("John Doe", savedKorisnik.getName());
        assertEquals("john@example.com", savedKorisnik.getEmail());
        verify(korisniciRepository, times(1)).save(korisnik);
    }
       @Test
    public void testAddKorisnik_failure() {
        Korisnik korisnik = new Korisnik();
        korisnik.setName("Jane Doe");
        korisnik.setEmail("jane@example.com");

        when(korisniciRepository.save(korisnik)).thenThrow(new DataIntegrityViolationException("User already exists"));

        assertThrows(DataIntegrityViolationException.class, () -> {
            korisnikService.addKorisnik1(korisnik);
        });

        verify(korisniciRepository, times(1)).save(korisnik);
    }
    @Test
    public void testAddKorisnik_failure_expected() {
        Korisnik korisnik = new Korisnik();
        korisnik.setName("John Doe");
        korisnik.setEmail("john@example.com");

        when(korisniciRepository.save(korisnik)).thenReturn(korisnik); // Mock repository

        Korisnik savedKorisnik = korisnikService.addKorisnik1(korisnik);

        assertEquals("Jane Doe", savedKorisnik.getName());
    }
    
}