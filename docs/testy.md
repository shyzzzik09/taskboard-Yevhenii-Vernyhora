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

## Testy API w Postman

Data wykonania: 2026-11-21.

| ID | Metoda | Endpoint | HTTP | Wynik |
| --- | --- | --- | --- | --- |
| A-01 | POST | /api/auth/login | 200 | Zgodny |
| A-02 | GET | /api/auth/me | 200 | Zgodny |
| A-03 | GET | /api/boards | 200 | Zgodny |
| A-04 | POST | /api/boards | 201 | Zgodny |
| A-05 | PUT | /api/boards/6 | 200 | Zgodny |
| A-06 | DELETE | /api/boards/6 | 204 | Zgodny |
| A-07 | POST | /api/auth/logout | 204 | Zgodny |
| A-08 | GET | /api/auth/me | 401 | Zgodny |
| A-09 | POST | /api/tasks | 201 | Zgodny |
| A-10 | PUT | /api/tasks/18 | 200 | Zgodny |
| A-11 | GET | /api/boards/1/tasks | 200 | Zgodny |
| A-12 | GET | /api/tasks/18 | 200 | Zgodny |
| A-13 | GET | /api/users | 200 | Zgodny |
| A-14 | DELETE | /api/tasks/18 | 204 | Zgodny |
| A-15 | POST | /api/tasks (błędne dane) | 400 | Zgodny |
| A-16 | GET | /api/tasks/:id (brak zadania) | 404 | Zgodny |
| A-17 | POST | /api/auth/register | 201 | Zgodny |

## Weryfikacja usuwania logicznego

W bazie danych wykonano zapytanie:

```sql
SELECT id, name, isDeleted, deletedById
FROM boards
WHERE id = 6;
```

Otrzymano wartości `isDeleted = 1` oraz `deletedById = 6`.
Potwierdzono zapis identyfikatora użytkownika usuwającego tablicę.

## Wyniki końcowe

- Testy interfejsu: 17/17.
- Testy API: 17/17.
- Łączna liczba przypadków testowych: 34.
- Wyniki zgodne po ponownym wykonaniu: 34.
- Wyniki niezgodne po ponownym wykonaniu: 0.

Testy A-10, A-12 i A-14 początkowo zakończyły się niepowodzeniem.
Po zmianie identyfikatora zadania wszystkie trzy testy zakończyły się
pomyślnie.

Kolekcję TaskBoard TB-3 wyeksportowano z programu Postman.
