package com.progici.languagefever.controller;

import com.progici.languagefever.model.Ucitelj;
import com.progici.languagefever.model.enums.Kvalifikacija;
import com.progici.languagefever.model.enums.Stil;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Collections;

public class Sortiranje {

    // sortiranje ucitelja po iskustvu

    //sortiranje po iskustvu od najmanjeg do najveceg

    public static void sortByGodineIskustva(List<Ucitelj> ucitelji) {
        Collections.sort(ucitelji, new Comparator<Ucitelj>() {
            @Override
            public int compare(Ucitelj u1, Ucitelj u2) {
                return u1.getGodineIskustva().compareTo(u2.getGodineIskustva());
            }
        });
    }
     //sortiranje po iskustvu od najveceg do najmanjeg
    public static void sortByGodineIskustva2(List<Ucitelj> ucitelji) {
        Collections.sort(ucitelji, new Comparator<Ucitelj>() {
            @Override
            public int compare(Ucitelj u1, Ucitelj u2) {
                return u2.getGodineIskustva().compareTo(u1.getGodineIskustva());
            }
        });
    }
    //filtriranje svi ucitelji sa iskustvom vecim od x
     public static List<Ucitelj> filterByGodineIskustva(List<Ucitelj> ucitelji, int threshold) {
        return ucitelji.stream()
                       .filter(ucitelj -> ucitelj.getGodineIskustva() > threshold)
                       .collect(Collectors.toList());
    }
    //filtriranje svi ucitelji sa iskustvom manjim od x
    public static List<Ucitelj> filterByGodineIskustvaManje(List<Ucitelj> ucitelji, int threshold) {
        return ucitelji.stream()
                       .filter(ucitelj -> ucitelj.getGodineIskustva() < threshold)
                       .collect(Collectors.toList());



    }

     // Sortiranje ucitelja po satnici 

     public static void sortBySatnica(List<Ucitelj> ucitelji) {
        Collections.sort(ucitelji, new Comparator<Ucitelj>() {
            @Override
            public int compare(Ucitelj u1, Ucitelj u2) {
                return u1.getSatnica().compareTo(u2.getSatnica());
            }
        });
    }
     // Sortiranje ucitelja po satnici od najveceg do najmanjeg
    public static void sortBySatnica2(List<Ucitelj> ucitelji) {
        Collections.sort(ucitelji, new Comparator<Ucitelj>() {
            @Override
            public int compare(Ucitelj u1, Ucitelj u2) {
                return u2.getSatnica().compareTo(u1.getSatnica());
            }
        });
    }
    // Filtriranje svi ucitelji sa satnicom vecom od x
    public static List<Ucitelj> filterBySatnica(List<Ucitelj> ucitelji, float threshold) {
        return ucitelji.stream()
                       .filter(ucitelj -> ucitelj.getSatnica() > threshold)
                       .collect(Collectors.toList());
    }

    // Filtriranje svi ucitelji sa satnicom manjom od x
    public static List<Ucitelj> filterBySatnicaManje(List<Ucitelj> ucitelji, float threshold) {
        return ucitelji.stream()
                       .filter(ucitelj -> ucitelj.getSatnica() < threshold)
                       .collect(Collectors.toList());
    }
      // Filtriranje svi ucitelji sa satnicom izmedju min i max
      public static List<Ucitelj> filterBySatnicaRange(List<Ucitelj> ucitelji, float minSatnica, float maxSatnica) {
        return ucitelji.stream()
                       .filter(ucitelj -> ucitelj.getSatnica() >= minSatnica && ucitelj.getSatnica() <= maxSatnica)
                       .collect(Collectors.toList());
    }

      // Filtriranje svi ucitelji po kvalifikaciji
    public static List<Ucitelj> filterByKvalifikacija(List<Ucitelj> ucitelji, Kvalifikacija kvalifikacija) {
        return ucitelji.stream()
                       .filter(ucitelj -> ucitelj.getKvalifikacija() == kvalifikacija)
                       .collect(Collectors.toList());
    }
      // Filtriranje svi ucitelji po stilu
    public static List<Ucitelj> filterByStil(List<Ucitelj> ucitelji, Stil stil) {
        return ucitelji.stream()
                       .filter(ucitelj -> ucitelj.getStilPoducavanja() == stil)
                       .collect(Collectors.toList());
    }
    


}