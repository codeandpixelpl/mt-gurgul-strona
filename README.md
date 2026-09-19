# MT Gurgul Ubezpieczenia i Finansowanie: prototyp strony

Statyczny prototyp nowej strony MT Gurgul z biurami w Brzesku i Szczurowej. To robocza wersja projektu
graficznego po drugiej rundzie uwag klienta (19 września 2026), przygotowana przez PROUP Studio
dla Code&Pixel.

Strona składa się z plików HTML, CSS i JavaScript. Nie wymaga budowania ani instalowania zależności.

## Podgląd lokalny

W katalogu repozytorium uruchom:

```bash
python3 -m http.server 8000
```

Potem otwórz w przeglądarce `http://localhost:8000/`.

## Mapa stron

| Plik | Strona |
|---|---|
| `index.html` | Strona główna |
| `ubezpieczenia.html` | Ubezpieczenia dla osób i firm |
| `samochod.html` | Ubezpieczenie samochodu OC AC Assistance |
| `gap.html` | Ubezpieczenie GAP samochodu |
| `dom-i-mieszkanie.html` | Ubezpieczenie domu i mieszkania |
| `zycie-i-zdrowie.html` | Ubezpieczenia życia i zdrowia |
| `leczenie-za-granica.html` | Ubezpieczenie Leczenie za granicą |
| `turystyczne.html` | Ubezpieczenia turystyczne i NNW |
| `rolnictwo.html` | Rolnictwo |
| `finansowanie.html` | Leasing i finansowanie pojazdów |
| `dla-firm.html` | Ubezpieczenia dla firm |
| `o-nas.html` | O nas |
| `pomoc.html` | Pomoc i dokumenty |
| `kontakt.html` | Kontakt, z sekcjami biur w Brzesku i Szczurowej |
| `aktualnosci.html` | Aktualności i promocje |
| `aktualnosci-*.html` | Osiem wpisów aktualności |

Biura nie mają osobnych podstron. Menu prowadzi do sekcji `kontakt.html#brzesko` i `kontakt.html#szczurowa`.

## Struktura katalogów

```
*.html                    strony (23 pliki)
assets/css/glowna.css     wygląd wspólny: kolory, typografia, nagłówek, stopka, przyciski
assets/css/podstrony.css  komponenty podstron, ładowany na wszystkich stronach poza główną
assets/js/main.js         menu, okno „Zadzwoń”, formularz, mapa, zakładki
assets/img/               zdjęcia i grafiki
assets/img/mail/          logo do stopki mailowej, ładowane z tego adresu, nie usuwać
assets/ikony/             informacje o pochodzeniu i licencji ikon
```

Adresy plików CSS i JS mają dopisek `?v=` ze skrótem zawartości pliku. Przeglądarka pobiera wtedy nową
wersję po każdej zmianie.

## Uwagi do wdrożenia

### Zmiany po drugiej rundzie uwag (19 września 2026)

- Strona główna, „Rozwiązania warte uwagi”: 7 kart w pasie przewijanym w bok (na dotyku palcem, od 900 px
  także strzałkami, `data-przewijane` w `main.js`). Karty „Indywidualne ubezpieczenie grupowe”, „Prywatna
  opieka lekarska”, „Posag” i „Ubezpieczenie na życie” mają zdjęcia poglądowe z innych podstron i czekają
  na opisy z materiałów klienta.
- Strona główna: w kafelku i w karcie „Leasing” zamiast „Finansowanie”, z przejściem do opisu leasingu
  na stronie Finansowanie (`#leasing-operacyjny`).
- Strona główna, hero: drugi przycisk „Kup polisę online”, prowadzi do sekcji sklepu Generali (`#kup-online`).
- Strona główna: nagłówek „Dlaczego Ubezpieczenia Mateusz Gurgul”.

### Zmiany po pierwszej rundzie uwag (18 września 2026)

- Strona główna, pod paskiem zaufania: sekcja zakupu online z produktami sklepu Generali. Każdy kafel
  otwiera kalkulator produktu przypisany do numeru agenta 107813.
- Strona główna, przed Aktualnościami: sekcja „Opinie naszych klientów z Google”. **Ocena, imiona
  i treści opinii są przykładowe**, pokazują tylko wygląd. Przy wdrożeniu całą sekcję zastępuje widżet
  opinii podpięty do wizytówki Google (np. Trustindex albo Elfsight). Link do wizytówki dostarczy klient.
- Strona główna, pas kontaktu: miejsce na portret Mateusza Gurgula (`.kontakt-portret`), czeka
  na zdjęcie od klienta.
- Logo: od 19 września 2026 znak „MG Mateusz Gurgul Ubezpieczenia” (`assets/img/logo-mg.svg`, w stopce
  `logo-mg-negatyw.svg`). Wektory odtworzone z grafiki od klienta. Nazwa firmy jest w samym logu, więc stopka
  nie powtarza jej pod spodem.

### Formularz i interakcje

- Formularz na stronie Kontakt nie wysyła danych. Sprawdza pola w przeglądarce i pokazuje potwierdzenie.
  Wysyłkę trzeba podpiąć po stronie serwera.
- Parametry `?biuro=` i `?sprawa=` w adresie strony Kontakt zaznaczają biuro i rodzaj sprawy.
  Przyciski kontaktowe na podstronach korzystają z tych parametrów.
- Przycisk „Zadzwoń” otwiera okno z wyborem biura (element `<dialog>`, obecny na każdej stronie).
- Mapa na stronie Kontakt wczytuje ramkę Google Maps dopiero po kliknięciu.
- Czcionki Inter i Inter Tight są ładowane z Google Fonts.

### Zdjęcia

Każde miejsce na zdjęcie ma w kodzie ukrytą etykietę `.ph__label` z kodem ujęcia i opisem pochodzenia.
Stan etykiet:

- zdjęcia i grafiki wygenerowane w ImageGen, do akceptacji klienta: 50 miejsc,
- zdjęcia klienta ze starej strony w rozdzielczości 512 px, do podmiany na większe: 12 miejsc,
- zdjęcia poglądowe do podmiany na zdjęcia klienta: 9 miejsc,
- puste pola na zdjęcia od klienta (zespół, doradcy, wnętrza i wejścia biur, działalność lokalna): 9 miejsc.

Liczby dotyczą miejsc na stronach. Ten sam plik bywa użyty w kilku miejscach.

### Treści, których brakuje

Pola z przerywaną ramką i opisem „czeka na” oznaczają treść, której klient jeszcze nie dostarczył.
Stan na 11 września 2026:

- Wszystkie strony: dane formalne firmy i wymagane informacje pośrednika ubezpieczeniowego w stopce.
- Kontakt: adres e-mail i godziny pracy obu placówek, lista obsługiwanych miejscowości, opinie
  i wskazówki dojazdu, treść zgody pod formularzem ustalona po analizie prawnej.
- O nas: imiona, role i specjalizacje doradców, liczba osób w zespole, lista partnerów.
- Pomoc: pliki dokumentów z opisami, formatami i datami weryfikacji.
- Rolnictwo: treść podstrony. W projekcie treści jest tylko opis kafelka i pozycja w menu.
- Samochód, Dom i mieszkanie, Życie i zdrowie: opis procesu.
- GAP, Życie i zdrowie: sekcja „Na co zwrócić uwagę”.
- Dla firm, Dom i mieszkanie, Turystyczne i NNW, Życie i zdrowie: najczęstsze pytania (FAQ).
- Leczenie za granicą: świadczenie za dzień w szpitalu i zwrot kosztów leków, do potwierdzenia w OWU.
- Finansowanie: logotypy instytucji finansujących, po potwierdzeniu współpracy i zasad używania znaków.
- Ubezpieczenia: wybór produktów Generali ze sklepu partnerskiego do pokazania na stronie.
- Aktualności: wpisy od klienta. Sześć wpisów to przykłady napisane przez nas, do zatwierdzenia albo
  podmiany. Wpis o biurach czeka na datę i aktualne zdjęcia wnętrz, wpis o NNW Szkolne na link
  do regulaminu promocji Uniqa.

### Linki zewnętrzne

- Zakup online prowadzi do sklepów Uniqa i Generali przez linki partnerskie MT Gurgul. Przy wdrożeniu
  trzeba je przenieść bez zmian.
- Promocja z kodem SZKOLNE10 trwa do 30 września 2026 r. Po tej dacie kartę promocji trzeba zdjąć
  albo podmienić na aktualną.

### Licencje

Ikony interfejsu pochodzą z zestawu Lucide (licencja ISC). Informacja o źródle leży
w `assets/ikony/ZRODLO.txt`, o ikonach MT Gurgul w `assets/ikony/mt/ZRODLO.txt`.
