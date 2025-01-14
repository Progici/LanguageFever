package com.progici.languagefever.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.progici.languagefever.model.Jezik;
import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.model.dto.UcenikDTO;
import com.progici.languagefever.service.JezikService;
import com.progici.languagefever.service.UciteljJeziciService;
import com.progici.languagefever.service.UciteljService;

@RestController
public class UciteljJeziciController {

    @Autowired
    private UciteljJeziciService uciteljJeziciService;

    @GetMapping("/uciteljjezici")
    public ResponseEntity<List<List<Jezik>>> getSviUciteljJezici() {
        System.out.println("UciteljJeziciController.getSviUciteljJezici()");
        List<List<Jezik>> sviUciteljJezici = uciteljJeziciService.getSviUciteljJezici();
        return ResponseEntity.ok(sviUciteljJezici);
    }
    
    
}