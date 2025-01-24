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

import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.enums.Razina;
import com.progici.languagefever.model.enums.Stil;
import com.progici.languagefever.repository.UceniciRepository;
import com.progici.languagefever.service.UcenikService;

@ExtendWith(MockitoExtension.class)
public class test3 {

    @Mock
    private UceniciRepository uceniciRepository;

    @InjectMocks
    private UcenikService ucenikService;

    @Test
    public void testAddUcenik_success() {
        Ucenik ucenik = new Ucenik();
        ucenik.setCiljevi("Learn Spanish");
        ucenik.setRazina(Razina.Početnik);
        ucenik.setStilUcenja(Stil.Direktna_metoda);

        when(uceniciRepository.save(ucenik)).thenReturn(ucenik); // Mock repository

        ucenikService.addUcenik(ucenik);

        verify(uceniciRepository, times(1)).save(ucenik);
    }

    @Test
    public void testAddUcenik_failure() {
        Ucenik ucenik = new Ucenik();
        ucenik.setCiljevi("Learn French");
        ucenik.setRazina(Razina.Napredni);
        ucenik.setStilUcenja(Stil.Gramatičko_prijevodna_metoda);

        when(uceniciRepository.save(ucenik)).thenThrow(new DataIntegrityViolationException("User already exists"));

        assertThrows(DataIntegrityViolationException.class, () -> {
            ucenikService.addUcenik(ucenik);
        });

        verify(uceniciRepository, times(1)).save(ucenik);
    }

    @Test
    public void testGetUcenikById() throws Exception {
        Ucenik ucenik = new Ucenik();
        ucenik.setId(1L);
        ucenik.setCiljevi("Learn German");
        ucenik.setRazina(Razina.Stručnjak);
        ucenik.setStilUcenja(Stil.Totalna_fizička_reakcija);

        when(uceniciRepository.findById(1L)).thenReturn(java.util.Optional.of(ucenik));

        Ucenik foundUcenik = ucenikService.getUcenikById(1L);

        assertEquals("Learn German", foundUcenik.getCiljevi());
        assertEquals(Razina.Stručnjak, foundUcenik.getRazina());
        assertEquals(Stil.Totalna_fizička_reakcija, foundUcenik.getStilUcenja());
    }
}