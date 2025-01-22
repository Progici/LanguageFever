# LanguageFever

Web aplikacija za za spajanje učitelja stranih jezika s pojedincima koji žele naučiti novi jezik.

Ova aplikacija je razvijena u sklopu kolegija "Programsko inženjerstvo" na Fakultetu elektrotehnike i računarstva, grupa TG17.3, akademska godina 2024/2025.

# Deploy
Link za aplikaciju: https://progici2front-62a5e06d95e8.herokuapp.com

# Opis projekta
Ovaj projekt je rezultat timskog rada u sklopu projektnog zadatka kolegija [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz) na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu. 

Cilj je	stvoriti funkcionalnu	platformu	za spajanje	učitelja stranih	jezika	s	pojedincima	koji	žele	naučiti	novi	jezik. 
Aplikacija omogućuje učiteljima	i	učenicima alat	za	pretraživanje,	komunikaciju i	raspored lekcija.

Kao tim motivirani smo za stjecanje novih iskustava kao što su rad u timu i međusobna organizacija, ali isto tako za učenje novih vještina i unaprjeđenje postojećeg znanja.


# Funkcijski zahtjevi

Registracija korisnika, te ovisno o vrsti profila (učenik ili učitelj), uređivanje osobnih podataka.

Učenik može filtrirati učitelja po jezicima, kvalifikacijama, dostupnosti i stilu. Učenik šalje zahtjev za lekcijom, i ukoliko je ona prihvaćena od strane učitelja, uspostavlja se kontakt.

Učenik i učitelj imaju mogućnost pregleda aktivnosti i povijest lekcija, a nakon odrađene  lekcije učenik može komentirati i ocijeniti učitelja. 

Administrator održava platformu te upravlja korisnicima.

# Tehnologije

Frontend je izrađen pomoću JavaScript ReactJS-a, a backend pomoću Spring Boot-a.
Baze napravljene u PostgreSQL-u.
Puštanje u pogon putem Heroku.

### Pokretanje frontend-a
Kako biste pokrenuli frontend, prvo morate imati instaliran [Node.js](https://nodejs.org/en) i npm.
Zatim je potrebno pozicionirati se u željeni frontend direktorij gdje izvršavate sljedeću naredbu:
```bash
   npm install
```
Time ste instalirali potrebne ovisnosti za rad aplikacije.

Kako biste pokrenuli frontend server, izvršite sljedeću naredbu:
```bash
   npm run dev
```
### Pokretanje backend-a
Kako biste pokrenuli backend potrebno je instalirati [JDK 17](https://www.oracle.com/java/) i [Apache Maven](https://maven.apache.org/). 
Zatim se treba pozicionirati u backend direktorij i u terminalu pokrenuti sljedeću naredbu:

```bash
  $ mvn clean spring-boot:run
```

# Članovi tima 

> |     Član      |     Git   |     Zadatak   |
> | ------------- | ------------- | ------------- |
> | Lucija Bajza  | @LucijaBajza | frontend/voditeljica |
> | Tomislav Kragujević | @tk54015| backend|
> | Mislav Kukina   | @mk55225 | frontend|
> | Matej Marić   |  @mm55104 | frontend |
> | Josip Pavić  | @jp549576 | baze/backend/deploy |
> | Dario Sučevac   | @Dario776 | full-stack |
> | Patrik Vranješ | @patrik433 | dokumentacija |
> 

# Kontribucije
Pogledati [CONTRIBUTING.md](https://github.com/Progici/LanguageFever/blob/master/CONTRIBUTING.md)



# 📝 Kodeks ponašanja [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
Kao studenti sigurno ste upoznati s minimumom prihvatljivog ponašanja definiran u [KODEKS PONAŠANJA STUDENATA FAKULTETA ELEKTROTEHNIKE I RAČUNARSTVA SVEUČILIŠTA U ZAGREBU](https://www.fer.hr/_download/repository/Kodeks_ponasanja_studenata_FER-a_procisceni_tekst_2016%5B1%5D.pdf), te dodatnim naputcima za timski rad na predmetu [Programsko inženjerstvo](https://wwww.fer.hr).
Očekujemo da ćete poštovati [etički kodeks IEEE-a](https://www.ieee.org/about/corporate/governance/p7-8.html) koji ima važnu obrazovnu funkciju sa svrhom postavljanja najviših standarda integriteta, odgovornog ponašanja i etičkog ponašanja u profesionalnim aktivnosti. Time profesionalna zajednica programskih inženjera definira opća načela koja definiranju  moralni karakter, donošenje važnih poslovnih odluka i uspostavljanje jasnih moralnih očekivanja za sve pripadnike zajenice.

Kodeks ponašanja skup je provedivih pravila koja služe za jasnu komunikaciju očekivanja i zahtjeva za rad zajednice/tima. Njime se jasno definiraju obaveze, prava, neprihvatljiva ponašanja te  odgovarajuće posljedice (za razliku od etičkog kodeksa). U ovom repozitoriju dan je jedan od široko prihvačenih kodeks ponašanja za rad u zajednici otvorenog koda.
>### Poboljšajte funkcioniranje tima:
>* definirajte načina na koji će rad biti podijeljen među članovima grupe
>* dogovorite kako će grupa međusobno komunicirati.
>* ne gubite vrijeme na dogovore na koji će grupa rješavati sporove primjenite standarde!
>* implicitno podrazmijevamo da će svi članovi grupe slijediti kodeks ponašanja.
 
>###  Prijava problema
>Najgore što se može dogoditi je da netko šuti kad postoje problemi. Postoji nekoliko stvari koje možete učiniti kako biste najbolje riješili sukobe i probleme:
>* Obratite mi se izravno [e-pošta](mailto:vlado.sruk@fer.hr) i  učinit ćemo sve što je u našoj moći da u punom povjerenju saznamo koje korake trebamo poduzeti kako bismo riješili problem.
>* Razgovarajte s vašim asistentom jer ima najbolji uvid u dinamiku tima. Zajedno ćete saznati kako riješiti sukob i kako izbjeći daljnje utjecanje u vašem radu.
>* Ako se osjećate ugodno neposredno razgovarajte o problemu. Manje incidente trebalo bi rješavati izravno. Odvojite vrijeme i privatno razgovarajte s pogođenim članom tima te vjerujte u iskrenost.

# 📝 Licenca
Ovaj projekt je objavljen pod [MIT licencom](https://github.com/Progici/ucenje-stranih-jezika/blob/master/LICENSE).
