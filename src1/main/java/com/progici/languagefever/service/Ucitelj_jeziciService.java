package com.progici.languagefever.service;

import com.progici.languagefever.model.Ucitelj_jezici;
import com.progici.languagefever.repository.Ucitelj_jeziciRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.model.Jezik;


@Service
public class Ucitelj_jeziciService {

    @Autowired
    private Ucitelj_jeziciRepository Ucitelj_jeziciRepository;

    public void addUcitelj_jezici(Ucitelj Ucitelj, Jezik jezik) {
        Ucitelj_jeziciRepository.save(new Ucitelj_jezici(Ucitelj, jezik));
    }

}
