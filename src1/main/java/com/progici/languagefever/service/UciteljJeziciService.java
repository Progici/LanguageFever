package com.progici.languagefever.service;

import com.progici.languagefever.model.UciteljJezici;
import com.progici.languagefever.repository.UciteljJeziciRepository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.model.Jezik;
import java.util.ArrayList;


@Service
public class UciteljJeziciService {

    @Autowired
    private UciteljJeziciRepository uciteljJeziciRepository;

    public void addUcitelj_jezici(Ucitelj Ucitelj, Jezik jezik) {
        uciteljJeziciRepository.save(new UciteljJezici(Ucitelj, jezik));
    }

    public List<List<Jezik>> getSviUciteljJezici() {
        List<UciteljJezici> allUciteljJezici = uciteljJeziciRepository.findAll();
        return allUciteljJezici.stream()
                .collect(Collectors.groupingBy(UciteljJezici::getUcitelj))
                .values()
                .stream()
                .map(uciteljJeziciList -> uciteljJeziciList.stream()
                        .map(UciteljJezici::getJezik)
                        .collect(Collectors.toList()))
                .collect(Collectors.toList());
    }
}
