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

import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.enums.Razina;
import com.progici.languagefever.model.enums.Stil;
import com.progici.languagefever.repository.UceniciRepository;
import com.progici.languagefever.service.UcenikService;

@ExtendWith(MockitoExtension.class)
public class test5 {

    @Mock
    private UceniciRepository uceniciRepository;

    @InjectMocks
    private UcenikService ucenikService;

    @Test
    public void testUpdateUcenikByKorisnikId() throws Exception {
        Ucenik existingUcenik = new Ucenik();
        existingUcenik.setId(1L);
        existingUcenik.setCiljevi("Learn Spanish");
        existingUcenik.setRazina(Razina.Početnik);
        existingUcenik.setStilUcenja(Stil.Direktna_metoda);

        Ucenik updatedUcenik = new Ucenik();
        updatedUcenik.setCiljevi("Learn French");
        updatedUcenik.setRazina(Razina.Napredni);
        updatedUcenik.setStilUcenja(Stil.Gramatičko_prijevodna_metoda);

        when(uceniciRepository.findByKorisnikId(1L)).thenReturn(existingUcenik);

        ucenikService.updateUcenikByKorisnikId(1L, updatedUcenik);

        verify(uceniciRepository, times(1)).save(existingUcenik);
        assertEquals("Learn French", existingUcenik.getCiljevi());
        assertEquals(Razina.Napredni, existingUcenik.getRazina());
        assertEquals(Stil.Gramatičko_prijevodna_metoda, existingUcenik.getStilUcenja());
    }

    @Test
    public void testUpdateUcenikByKorisnikId_NotFound() {
        Long invalidId = 99L;

        Ucenik updatedUcenik = new Ucenik();
        updatedUcenik.setCiljevi("Learn French");
        updatedUcenik.setRazina(Razina.Napredni);
        updatedUcenik.setStilUcenja(Stil.Gramatičko_prijevodna_metoda);

        when(uceniciRepository.findByKorisnikId(invalidId)).thenReturn(null);

        assertThrows(Exception.class, () -> {
            ucenikService.updateUcenikByKorisnikId(invalidId, updatedUcenik);
        });

        verify(uceniciRepository, times(0)).save(updatedUcenik);
    }
}