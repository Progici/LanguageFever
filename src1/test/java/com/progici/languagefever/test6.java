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

import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.repository.KorisniciRepository;
import com.progici.languagefever.service.KorisnikService;

@ExtendWith(MockitoExtension.class)
public class test6 {

    @Mock
    private KorisniciRepository korisniciRepository;

    @InjectMocks
    private KorisnikService korisnikService;

    @Test
    public void testUpdateKorisnikById() {
        Long korisnikId = 1L;

        Korisnik existingKorisnik = new Korisnik();
        existingKorisnik.setId(korisnikId);
        existingKorisnik.setName("John Doe");
        existingKorisnik.setEmail("john@example.com");
        existingKorisnik.setPicture("old_picture.jpg");

        Korisnik updatedKorisnik = new Korisnik();
        updatedKorisnik.setName("Jane Doe");
        updatedKorisnik.setPicture("new_picture.jpg");

        // Mock the repository method
        when(korisniciRepository.findKorisnikById(korisnikId)).thenReturn(existingKorisnik);

        // Call the service method
        korisnikService.updateKorisnikById(korisnikId, updatedKorisnik);

        // Verify that the repository method was called
        verify(korisniciRepository, times(1)).save(existingKorisnik);

        // Assert that the existingKorisnik was updated correctly
        assertEquals("Jane Doe", existingKorisnik.getName());
        assertEquals("new_picture.jpg", existingKorisnik.getPicture());
    }

    @Test
    public void testUpdateKorisnikById_NotFound() {
        Long invalidId = 99L;

        Korisnik updatedKorisnik = new Korisnik();
        updatedKorisnik.setName("Jane Doe");
        updatedKorisnik.setPicture("new_picture.jpg");

        // Mock the repository method
        when(korisniciRepository.findKorisnikById(invalidId)).thenReturn(null);

        // Call the service method and expect an exception
        assertThrows(Exception.class, () -> {
            korisnikService.updateKorisnikById(invalidId, updatedKorisnik);
        });

        // Verify that the repository method was not called
        verify(korisniciRepository, times(0)).save(updatedKorisnik);
    }
}