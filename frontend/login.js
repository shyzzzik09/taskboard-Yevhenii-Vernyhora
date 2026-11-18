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