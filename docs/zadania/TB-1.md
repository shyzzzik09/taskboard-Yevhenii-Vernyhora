# TB-1 czesc 1.

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
