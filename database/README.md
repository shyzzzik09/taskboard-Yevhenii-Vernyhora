# Baza danych TaskBoard

Projekt korzysta z relacyjnej bazy danych MySQL / MariaDB
o nazwie `taskboard`.

## Struktura bazy danych

- `users` – dane użytkowników.
- `boards` – tablice użytkowników.
- `tasks` – zadania przypisane do tablic i użytkowników.

## Pliki

- `taskboard.sql` – struktura bazy i dane testowe.
- `queries.sql` – 10 zapytań SQL.
- `konta.sql` – tworzenie kont i nadawanie uprawnień.
- `backup/` – kopie zapasowe bazy danych.

## Konta i uprawnienia

| Konto | Uprawnienia |
| --- | --- |
| `taskboard_app` | SELECT, INSERT, UPDATE |
| `taskboard_admin` | SELECT, INSERT, UPDATE, DELETE |
| `taskboard_report` | SELECT |

Aplikacja powinna korzystać z konta `taskboard_app`.
Dane połączenia należy skonfigurować w pliku `.env`.

Konta można utworzyć, wykonując skrypt `konta.sql`
z poziomu konta administratora bazy danych.

## Tworzenie kopii zapasowej

W terminalu Windows, w głównym folderze projektu,
należy wykonać polecenie:

```cmd
C:\xampp\mysql\bin\mysqldump.exe -u root -p taskboard > database\backup\taskboard_2026-11-10.sql
```

## Odtwarzanie kopii zapasowej

Utworzenie bazy testowej:

```cmd
C:\xampp\mysql\bin\mysql.exe -u root -p -e "CREATE DATABASE IF NOT EXISTS taskboard_test;"
```

Import kopii zapasowej:

```cmd
C:\xampp\mysql\bin\mysql.exe -u root -p taskboard_test < database\backup\taskboard_2026-11-10.sql
```

Porównanie liczby rekordów w obu bazach:

```sql
SELECT COUNT(*) FROM taskboard.users;
SELECT COUNT(*) FROM taskboard_test.users;

SELECT COUNT(*) FROM taskboard.boards;
SELECT COUNT(*) FROM taskboard_test.boards;

SELECT COUNT(*) FROM taskboard.tasks;
SELECT COUNT(*) FROM taskboard_test.tasks;
```

## Test kopii zapasowej

Data: 2026-11-10

Utworzono kopię zapasową:
`database/backup/taskboard_2026-11-10.sql`.

Kopię przywrócono do bazy `taskboard_test`.

| Tabela | taskboard | taskboard_test |
| --- | --- | --- |
| users | 5 | 5 |
| boards | 2 | 2 |
| tasks | 10 | 10 |

Wynik: przywracanie kopii zapasowej zakończyło się
pomyślnie. Liczba rekordów jest zgodna.
