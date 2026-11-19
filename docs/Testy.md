# Testy aplikacji TaskBoard

## Cel

Sprawdzenie poprawności działania aplikacji TaskBoard, w tym logowania, rejestracji, zarządzania tablicami i zadaniami oraz filtrowania.

## Przypadki testowe

| ID | Scenariusz | Kroki | Oczekiwany wynik | Wynik |
| --- | --- | --- | --- | --- |
| T-01 | Poprawne logowanie | Zalogować się poprawnymi danymi | Przekierowanie do strony tablic | Do sprawdzenia |
| T-02 | Błędne logowanie | Wpisać niepoprawne hasło | Komunikat o błędnym loginie lub haśle | Do sprawdzenia |
| T-03 | Rejestracja | Wypełnić formularz poprawnymi danymi | Utworzenie konta użytkownika | Do sprawdzenia |
| T-04 | Zbyt krótkie hasło | Wpisać hasło krótsze niż 8 znaków | Wyświetlenie komunikatu walidacji | Do sprawdzenia |
| T-05 | Różne hasła | Wpisać różne hasła w formularzu rejestracji | Komunikat o niezgodności haseł | Do sprawdzenia |
| T-06 | Dodawanie tablicy | Utworzyć nową tablicę | Nowa tablica pojawia się na liście | Do sprawdzenia |
| T-07 | Edycja tablicy | Zmienić nazwę istniejącej tablicy | Zapisanie zmienionej nazwy | Do sprawdzenia |
| T-08 | Usuwanie tablicy | Usunąć wybraną tablicę | Tablica znika z listy | Do sprawdzenia |
| T-09 | Dodawanie zadania | Utworzyć zadanie z poprawnym tytułem | Zadanie pojawia się w kolumnie | Do sprawdzenia |
| T-10 | Edycja zadania | Zmienić tytuł i priorytet zadania | Zapisanie nowych danych | Do sprawdzenia |
| T-11 | Zmiana statusu | Zmienić status zadania na Gotowe | Zadanie trafia do kolumny Gotowe | Do sprawdzenia |
| T-12 | Filtrowanie zadań | Wybrać priorytet i przypisaną osobę | Wyświetlenie pasujących zadań | Do sprawdzenia |
| T-13 | Wyszukiwanie | Wpisać fragment tytułu zadania | Wyświetlenie pasujących zadań | Do sprawdzenia |
| T-14 | Czyszczenie filtrów | Kliknąć Wyczyść filtry | Ponowne wyświetlenie wszystkich zadań | Do sprawdzenia |
| T-15 | Wylogowanie | Kliknąć Wyloguj | Zakończenie sesji użytkownika | Do sprawdzenia |

## Podsumowanie

Przygotowano 15 przypadków testowych obejmujących podstawowe funkcje aplikacji. Wyniki zostaną uzupełnione po wykonaniu testów.
