package com.progici.languagefever.model.dto;

import com.progici.languagefever.model.Jezik;
import com.progici.languagefever.model.enums.Kvalifikacija;
import com.progici.languagefever.model.enums.Stil;

public class UciteljDTO {
    private Long idKorisnika;
    private Jezik jezik;
    private Integer godineIskustva;
    private Kvalifikacija kvalifikacija;
    private Stil stilPoducavanja;
    private Float satnica;

    public Long getIdKorisnika() {
        return idKorisnika;
    }

    public void setIdKorisnika(Long idKorisnika) {
        this.idKorisnika = idKorisnika;
    }
    public Jezik getJezik() {
        return jezik;
    }

    public void setJezik(Jezik jezik) {
        this.jezik = jezik;
    }

    public Integer getGodineIskustva() {
        return godineIskustva;
    }

    public void setGodineIskustva(Integer godineIskustva) {
        this.godineIskustva = godineIskustva;
    }

    public Kvalifikacija getKvalifikacija() {
        return kvalifikacija;
    }

    public void setKvalifikacija(Kvalifikacija kvalifikacija) {
        this.kvalifikacija = kvalifikacija;
    }

    public Stil getStilPoducavanja() {
        return stilPoducavanja;
    }

    public void setStilPoducavanja(Stil stilPoducavanja) {
        this.stilPoducavanja = stilPoducavanja;
    }

    public Float getSatnica() {
        return satnica;
    }

    public void setSatnica(Float satnica) {
        this.satnica = satnica;
    }
}