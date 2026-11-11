# TaskBoard

## Opis

TaskBoard to aplikacja do zarządzania zadaniami.
Umożliwia tworzenie, edytowanie i organizowanie zadań.
Pomaga użytkownikom planować codzienną pracę.

## Technologie

- HTML
- CSS
- JavaScript
- MyPHP
- MySQL

## Wymagane środowisko

- Visual Studio Code
- Git
- Przeglądarka internetowa
- XAMPP

## Uruchomienie

Projekt jest obecnie w fazie przygotowania.
Instrukcja uruchomienia zostanie uzupełniona w kolejnych etapach.

## Struktura projektu

| Folder | Za co odpowiada |
| --- | --- |
| `frontend/` | Interfejs użytkownika |
| `backend/` | Logika aplikacji |
| `database/` | Baza danych |
| `docs/` | Dokumentacja projektu |
| `docs/zadania/` | dokumentacja i opis zadan |

## Materiały

Pliki potrzebne podczas praktyk są w folderze [materialy](materialy/README.md).

## Autor

Yevhenii Vernyhora, 3TP.

## Baza danych

Projekt korzysta z bazy danych MySQL o nazwie `taskboard`.

Baza zawiera trzy tabele: `users`, `boards` i `tasks`.
Struktura bazy oraz przykładowe dane znajdują się w pliku
`database/taskboard.sql`.

Zadania można dodawać, edytować i usuwać logicznie (soft delete).
Usunięte zadania pozostają w bazie, ale nie są wyświetlane przez API.

Kopia zapasowa została przywrócona do bazy `taskboard_test`.
Porównano liczbę rekordów w obu bazach i wyniki były zgodne.

## API zadań

Backend działa na Node.js i Express, na porcie 3000.

Dostępne endpointy:

- `GET /api/boards/:boardId/tasks` – lista zadań tablicy.
- `GET /api/tasks/:id` – szczegóły zadania.
- `POST /api/tasks` – dodawanie zadania.
- `PUT /api/tasks/:id` – edycja zadania.
- `DELETE /api/tasks/:id` – usuwanie logiczne zadania.
- `GET /api/users` – lista użytkowników bez haseł.

API sprawdza poprawność danych i zwraca odpowiednie kody HTTP:
200, 201, 204, 400 i 404.

## Testowanie API

Endpointy zostały przetestowane w programie Postman.
Sprawdzono dodawanie, edycję, usuwanie oraz pobieranie danych.
Przetestowano również błędy walidacji (400)
i nieistniejące zadania (404).

Kolekcja Postman znajduje się w folderze `docs/postman/`.
