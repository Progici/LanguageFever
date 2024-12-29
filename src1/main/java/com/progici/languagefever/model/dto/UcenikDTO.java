package com.progici.languagefever.model.dto;

import com.progici.languagefever.model.enums.Razina;
import com.progici.languagefever.model.enums.Stil;

public class UcenikDTO {
    private String[] jezici;
    private Razina razina;
    private Stil stilUcenja;
    private String ciljevi;
    
    public String[] getJezici() {
        return jezici;
    }

    public void setJezici(String[] jezici) {
        this.jezici = jezici;
    }

    public Razina getRazina() {
        return razina;
    }

    public void setRazina(Razina razina) {
        this.razina = razina;
    }

    public Stil getstilUcenja() {
        return stilUcenja;
    }

    public void setstilUcenja(Stil stilUcenja) {
        this.stilUcenja = stilUcenja;
    }

    public String getciljevi() {
        return ciljevi;
    }

    public void setciljevi(String ciljevi) {
        this.ciljevi = ciljevi;
    }


}