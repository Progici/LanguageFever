package com.progici.languagefever.model.dto;

import com.progici.languagefever.model.enums.Kvalifikacija;
import com.progici.languagefever.model.enums.Stil;

public class UciteljDTO {
    private Long idKorisnik;
    private String[] jezici;
    private Integer godineIskustva;
    private Kvalifikacija kvalifikacija;
    private Stil stilPoducavanja;
    private Float satnica;

    public Long getIdKorisnik() {
        return idKorisnik;
    }

    public void setIdKorisnik(Long idKorisnik) {
        this.idKorisnik = idKorisnik;
    }
    public String[] getJezici() {
        return jezici;
    }

    public void setJezici(String[] jezici) {
        this.jezici = jezici;
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

    @Override
    public String toString() {
        return "UciteljDTO{" +
                "idKorisnika=" + idKorisnik +
                ", jezik=" + String.join(", ", jezici) +
                ", godineIskustva=" + godineIskustva +
                ", kvalifikacija=" + kvalifikacija +
                ", stilPoducavanja=" + stilPoducavanja +
                ", satnica=" + satnica +
                '}';
    }
}