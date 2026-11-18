const form = document.getElementById('loginForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({ login, password })
        });

        if (response.ok) {
            window.location.href = 'boards.html';
        } else {
            message.textContent = 'Nieprawidłowy login lub hasło';
        }
    } catch (error) {
        message.textContent = 'Błąd połączenia z serwerem';
    }
});

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const login = document.getElementById('registerLogin').value;
    const password = document.getElementById('registerPassword').value;
    const message = document.getElementById('registerMessage'); 
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password, firstName, lastName })
        });

        if (response.ok) {
            message.textContent = 'Rejestracja zakończona sukcesem! Możesz się zalogować.';
            document.getElementById('registerForm').reset();
        } else {
            const data = await response.json();
            message.textContent = data.error || 'Nie udało się zarejestrować.';
        }
    } catch (error) {
        message.textContent = 'Błąd połączenia z serwerem.';
    }
});