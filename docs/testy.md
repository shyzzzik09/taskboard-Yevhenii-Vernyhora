# Testy aplikacji TaskBoard

## Cel

Sprawdzenie poprawności działania aplikacji TaskBoard.

## Testy interfejsu

Data wykonania: 2026-11-21.

| ID | Scenariusz | Kroki | Oczekiwany wynik | Wynik |
| --- | --- | --- | --- | --- |
| T-01 | Poprawne logowanie | Wpisać poprawne dane | Przekierowanie do tablic | Zgodny |
| T-02 | Błędne logowanie | Wpisać błędne hasło | Komunikat o błędzie | Zgodny |
| T-03 | Rejestracja | Utworzyć nowe konto | Konto zostaje utworzone | Zgodny |
| T-04 | Krótkie hasło | Wpisać hasło o długości 3 znaków | Komunikat walidacji | Zgodny |
| T-05 | Różne hasła | Wpisać dwa różne hasła | Komunikat o niezgodności | Zgodny |
| T-06 | Dodawanie tablicy | Utworzyć tablicę TEST | Tablica pojawia się na liście | Zgodny |
| T-07 | Edycja tablicy | Zmienić nazwę na TEST 2 | Nazwa zostaje zapisana | Zgodny |
| T-08 | Usuwanie tablicy | Usunąć tablicę TEST 2 | Tablica znika z listy | Zgodny |
| T-09 | Dodawanie zadania | Utworzyć nowe zadanie | Zadanie pojawia się w kolumnie | Zgodny |
| T-10 | Edycja zadania | Zmienić tytuł w oknie szczegółów | Zmiany zostają zapisane | Zgodny |
| T-11 | Zmiana statusu | Zmienić status zadania | Zadanie zmienia kolumnę | Zgodny |
| T-12 | Filtrowanie | Połączyć filtry priorytetu i osoby | Wyświetlenie pasujących zadań | Zgodny |
| T-13 | Wyszukiwanie | Wpisać fragment tytułu | Wyświetlenie pasujących zadań | Zgodny |
| T-14 | Czyszczenie filtrów | Kliknąć Wyczyść filtry | Wyświetlenie wszystkich zadań | Zgodny |
| T-15 | Wylogowanie | Wylogować się i otworzyć tablice | Przekierowanie do logowania | Zgodny |
| T-16 | Usuwanie zadania | Usunąć zadanie testowe | Zadanie znika z listy | Zgodny |
| T-17 | Responsywność | Zmniejszyć szerokość przeglądarki | Interfejs pozostaje czytelny | Zgodny |

## Podsumowanie

Wykonano 17 przypadków testowych interfejsu.

- Liczba testów: 17.
- Wyniki zgodne: 17.
- Wyniki niezgodne: 0.

Wszystkie opisane testy interfejsu zakończyły się pomyślnie.
Testy API w programie Postman zostaną opisane osobno.