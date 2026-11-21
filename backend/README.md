# Backend TaskBoard

Backend aplikacji został wykonany w Node.js i Express.
Korzysta z bazy danych MySQL / MariaDB.

## Pliki i katalogi

- `server.js` – konfiguracja i uruchomienie serwera.
- `db.js` – połączenie z bazą danych.
- `routes/auth.js` – logowanie, rejestracja i wylogowanie.
- `routes/users.js` – pobieranie listy użytkowników.
- `routes/boards.js` – zarządzanie tablicami.
- `routes/tasks.js` – zarządzanie zadaniami i filtrowanie.
- `middleware/auth.js` – sprawdzanie sesji użytkownika.
- `package.json` – zależności i skrypty projektu.

## Uruchomienie

W terminalu, w głównym katalogu projektu, wykonaj:

```bash
cd backend
npm install
node server.js
```

Polecenie `npm install` jest wymagane przy pierwszym uruchomieniu.

Serwer działa pod adresem http://localhost:3000.

Alternatywnie serwer można uruchomić poleceniem `npm start`.