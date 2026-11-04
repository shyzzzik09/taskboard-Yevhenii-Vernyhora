# TB-1 czesc 1

## cel

Przygotowujesz repozytorium projektu tak, jak robi się to w zespole: czytelna struktura, opis projektu,
chroniona gałąźź main i praca przez pull request.

## co zrobic

1. Utwórz publiczne repozytorium z szablonu.
2. Ustaw reguły ochrony gałęzi main.
3. Utwórz branch feature/tb-1-start.
4. Utwórz foldery frontend/, backend/, database/,docs/i docs/zadania/.
5. W każdym folderze dodaj README.md z opisem.
6. Uzupełnij główny README.md.
7. Dodaj plik .gitignore z wpisami node_modules/ i .env.
8. Dodaj treść zadania do docs/zadania/TB-1.md.
9. Zrób minimum 3 commity z opisem.
10. Utwórz pull request do main.
11. Po zielonym workflow wykonaj merge commit.
12. Nie usuwaj brancha.

## wskazowki

git switch -c feature/tb-1-start
git add .
git commit -m "docs: opis folderów"
git push -u origin feature/tb-1-start

-Przed każdym git add . sprawdźź git status , żeby nie wysłaćć niechcianych plikow
-Czerwony workflow: zakładka Actions w repozytorium. Komunikat po polsku mówi, czego brakuje.
-Ściąga z poleceniami Git i Markdownem jest w kodzie z zajęćć ( poniedzialek-1/sciaga.md).

## gotowe,gdy

- Każdy folder ma README.md z opisem.
- Główne README ma wszystkie sekcje z szablonu.
- .gitignore zawiera node_modules/ i .env.
- Gałąź main jest chroniona, scalanie tylko przez merge commit.
- Pull request z branchu feature/tb-1-start ma zielony workflow i jest scalony do piątku 18:00.

## Pomoc i nieobecni

Obowiązuje zasada 15 minut: najpierw szukasz sam, a po 15 minutach piszesz na Teams z konkretem i zrzutem ekranu.

Jeśli nie było Cię w poniedziałek: przejdź prezentację z poniedziałku 1 (PDF na Teams), w tym przygotowanie środowiska i konfigurację Git, potem zrób to zadanie. W środę na Teams pojawi się część 2 (opis danych).

Feedback dostaniesz w weekend w komentarzach do pull requesta, jeśli zmiany będą na main do piątku 18:00.

## TB-1 Część 2. Opis danych i wstępny diagram ERD

## Cel

Celem zadania jest opisanie danych przechowywanych w aplikacji TaskBoard oraz przygotowanie wstępnego diagramu ERD.

## Co zostało zrobione

1. Utworzono branch `feature/tb-1-dane`.
2. Skopiowano plik `materialy/dane-szablon.md` do `docs/dane.md`.
3. Opisano dane użytkownika, tablicy i zadania.
4. Dodano przykładowe informacje do każdej tabeli.
5. Opisano powiązania między użytkownikami, tablicami i zadaniami.
6. Dodano przykładowe zadanie w formacie JSON.
7. Przygotowano wstępny diagram ERD w Mermaid.

## Opis danych

Aplikacja TaskBoard przechowuje informacje o użytkownikach, tablicach i zadaniach.

**Użytkownik** posiada login, imię, nazwisko, adres email i hasło.

**Tablica** posiada nazwę, opis, datę utworzenia i właściciela.

**Zadanie** posiada tytuł, opis, status, priorytet, termin wykonania i przypisanego użytkownika.

Szczegółowy opis danych znajduje się w pliku `docs/dane.md`.

## Wstępny diagram ERD

Diagram ERD został przygotowany w Mermaid i znajduje się w pliku `docs/dane.md`.

Diagram zawiera trzy tabele:

- uzytkownicy
- tablice
- zadania

Każda tabela posiada klucz główny (PK). Tabele są połączone za pomocą kluczy obcych (FK).

## Powiązania

1. Jeden użytkownik może utworzyć wiele tablic.
2. Jedna tablica może zawierać wiele zadań.
3. Jeden użytkownik może mieć przypisanych wiele zadań.

## Podsumowanie

W tej części zadania przygotowano opis danych aplikacji TaskBoard oraz wstępny diagram ERD. Diagram przedstawia podstawowe tabele i relacje między nimi.
