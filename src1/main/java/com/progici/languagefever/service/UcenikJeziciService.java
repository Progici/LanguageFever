package com.progici.languagefever.service;

import com.progici.languagefever.model.UcenikJezici;
import com.progici.languagefever.repository.UcenikJeziciRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.progici.languagefever.model.Ucenik;
import com.progici.languagefever.model.Jezik;


@Service
public class UcenikJeziciService {

    @Autowired
    private UcenikJeziciRepository ucenikJeziciRepository;

    public void addUcenikJezici(Ucenik ucenik, Jezik jezik) {
        ucenikJeziciRepository.save(new UcenikJezici(ucenik, jezik));
    }

}
