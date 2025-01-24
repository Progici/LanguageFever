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

import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.model.enums.Kvalifikacija;
import com.progici.languagefever.model.enums.Stil;
import com.progici.languagefever.repository.UciteljiRepository;
import com.progici.languagefever.service.UciteljService;

@ExtendWith(MockitoExtension.class)
public class test4 {

    @Mock
    private UciteljiRepository uciteljiRepository;

    @InjectMocks
    private UciteljService uciteljService;

    @Test
    public void testAddUcitelj_success() {
        Ucitelj ucitelj = new Ucitelj();
        ucitelj.setGodineIskustva(5);
        ucitelj.setKvalifikacija(Kvalifikacija.Magistarski_studij);
        ucitelj.setStilPoducavanja(Stil.Direktna_metoda);
        ucitelj.setSatnica(30.0f);

        when(uciteljiRepository.save(ucitelj)).thenReturn(ucitelj); // Mock repository

        uciteljService.addUcitelj(ucitelj);

        verify(uciteljiRepository, times(1)).save(ucitelj);
    }

    @Test
    public void testAddUcitelj_failure() {
        Ucitelj ucitelj = new Ucitelj();
        ucitelj.setGodineIskustva(3);
        ucitelj.setKvalifikacija(Kvalifikacija.Diplomski_studij);
        ucitelj.setStilPoducavanja(Stil.Gramatičko_prijevodna_metoda);
        ucitelj.setSatnica(25.0f);

        when(uciteljiRepository.save(ucitelj)).thenThrow(new DataIntegrityViolationException("User already exists"));

        assertThrows(DataIntegrityViolationException.class, () -> {
            uciteljService.addUcitelj(ucitelj);
        });

        verify(uciteljiRepository, times(1)).save(ucitelj);
    }

    @Test
    public void testGetUciteljById() throws Exception {
        Ucitelj ucitelj = new Ucitelj();
        ucitelj.setId(1L);
        ucitelj.setGodineIskustva(10);
        ucitelj.setKvalifikacija(Kvalifikacija.Doktorat);
        ucitelj.setStilPoducavanja(Stil.Totalna_fizička_reakcija);
        ucitelj.setSatnica(50.0f);

        when(uciteljiRepository.findById(1L)).thenReturn(java.util.Optional.of(ucitelj));

        Ucitelj foundUcitelj = uciteljService.getUciteljById(1L);

        assertEquals(10, foundUcitelj.getGodineIskustva());
        assertEquals(Kvalifikacija.Doktorat, foundUcitelj.getKvalifikacija());
        assertEquals(Stil.Totalna_fizička_reakcija, foundUcitelj.getStilPoducavanja());
        assertEquals(50.0f, foundUcitelj.getSatnica());
    }
}