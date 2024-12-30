package com.progici.languagefever.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.progici.languagefever.model.Jezik;
import com.progici.languagefever.model.Korisnik;
import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.service.LekcijaService;
import com.progici.languagefever.service.JezikService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

@RestController
public class JeziciController {

    @Autowired
    private JezikService jezikService;

    @RequestMapping("/jezici")
    public List<Jezik> getSviJezici() {
        return jezikService.getSviJezici();
    }

    @RequestMapping(value = "/jezici",method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> addJByKorisnikId(
        @RequestBody String jezikName
    ) {
        try {
        jezikService.addJezik(jezikName);
        } catch (Exception e) {
        return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
  
    @RequestMapping(value = "/jezici/{id}", method = RequestMethod.DELETE)
    public void deleteJezikById(@PathVariable Long id) {
        jezikService.deleteJezikById(id);
    }

}