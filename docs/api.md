# Dokumentacja API – TaskBoard

## Cel

Dokumentacja przedstawia dostępne endpointy API aplikacji TaskBoard, służące do obsługi użytkowników, tablic i zadań.

## 1. Autoryzacja i użytkownicy

| Metoda | Endpoint | Opis |
| --- | --- | --- |
| POST | `/api/auth/register` | Rejestracja nowego użytkownika |
| POST | `/api/auth/login` | Logowanie użytkownika |
| POST | `/api/auth/logout` | Wylogowanie użytkownika |
| GET | `/api/auth/me` | Pobranie danych zalogowanego użytkownika |
| GET | `/api/users` | Pobranie listy użytkowników |

## 2. Tablice

| Metoda | Endpoint | Opis |
| --- | --- | --- |
| GET | `/api/boards` | Pobranie listy aktywnych tablic |
| POST | `/api/boards` | Dodanie nowej tablicy |
| PUT | `/api/boards/:id` | Edytowanie nazwy i opisu tablicy |
| DELETE | `/api/boards/:id` | Usunięcie tablicy (soft delete) |

## 3. Zadania

| Metoda | Endpoint | Opis |
| --- | --- | --- |
| GET | `/api/boards/:boardId/tasks` | Pobranie zadań wybranej tablicy |
| GET | `/api/tasks/:id` | Pobranie szczegółów zadania |
| POST | `/api/tasks` | Dodanie nowego zadania |
| PUT | `/api/tasks/:id` | Edytowanie zadania |
| DELETE | `/api/tasks/:id` | Usunięcie zadania (soft delete) |

## 4. Filtrowanie zadań

Endpoint `GET /api/boards/:boardId/tasks` obsługuje następujące parametry:

| Parametr | Opis | Przykład |
| --- | --- | --- |
| `priority` | Filtrowanie według priorytetu | `high` |
| `assigneeId` | Filtrowanie według przypisanego użytkownika | `2` |
| `q` | Wyszukiwanie zadań po fragmencie tytułu | `strona` |

Filtry można łączyć w jednym zapytaniu.

Przykład:

`GET /api/boards/1/tasks?priority=high&assigneeId=2&q=strona`

## 5. Dane zadania

Podczas tworzenia i edytowania zadania wykorzystywane są następujące pola:

| Pole | Opis |
| --- | --- |
| `title` | Tytuł zadania, od 3 do 100 znaków |
| `description` | Opis zadania |
| `status` | `todo`, `in_progress`, `done` |
| `priority` | `low`, `medium`, `high` |
| `deadline` | Termin wykonania w formacie `YYYY-MM-DD` |
| `boardId` | Identyfikator tablicy |
| `assigneeId` | Identyfikator przypisanego użytkownika lub `null` |

## 6. Kody odpowiedzi HTTP

| Kod | Znaczenie |
| --- | --- |
| 200 | Operacja zakończona poprawnie |
| 201 | Utworzono nowy zasób |
| 204 | Operacja zakończona bez treści odpowiedzi |
| 400 | Nieprawidłowe dane |
| 401 | Użytkownik nie jest zalogowany |
| 404 | Nie znaleziono zasobu |
| 409 | Login jest już zajęty |

## 7. Usuwanie danych

Aplikacja wykorzystuje mechanizm *soft delete* dla tablic i zadań. Usunięte rekordy nie są fizycznie kasowane z bazy danych, lecz oznaczane jako usunięte za pomocą pola `isDeleted`.
