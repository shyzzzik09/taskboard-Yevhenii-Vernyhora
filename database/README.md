# database

Baza danych to uporządkowany system przechowywania, zarządzania i szybkiego wyszukiwania informacji niezbędnych do działania aplikacji. Pozwala ona na trwałe zapisywanie danych, takich jak profile użytkowników, zamówienia czy treści, zapewniając do nich bezpieczny i kontrolowany dostęp. Najpopularniejsze jej rodzaje to relacyjne (np. PostgreSQL, MySQL) oraz nierelacyjne, czyli NoSQL (np. MongoDB, Redis).

## Test kopii zapasowej

Data: 2026-11-10

Utworzono kopię zapasową:
`database/backup/taskboard_2026-11-10.sql`

Kopię przywrócono do bazy `taskboard_test`.

Porównanie liczby rekordów:

| Tabela | taskboard | taskboard_test |
| --- | --- | --- |
| users | 5 | 5 |
| boards | 2 | 2 |
| tasks | 10 | 10 |

Wynik: przywracanie kopii zapasowej zakończyło się
pomyślnie. Liczba rekordów jest zgodna.
