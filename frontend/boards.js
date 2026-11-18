const boardsList = document.getElementById('boardsList');
const logoutBtn = document.getElementById('logoutBtn');

async function loadBoards() {
    try {
        const response = await fetch('/api/boards');

        if (response.status === 401) {
            window.location.href = 'login.html';
            return;
        }

        if (!response.ok) {
            throw new Error('Błąd pobierania tablic');
        }

        const boards = await response.json();
        boardsList.replaceChildren();

        for (const board of boards) {
            const item = document.createElement('div');
            item.className = 'card p-3 mb-2';

            const link = document.createElement('a');
            link.href = 'board.html?id=' + encodeURIComponent(board.id);
            link.textContent = board.name;

            item.appendChild(link);
            boardsList.appendChild(item);
        }
    } catch (error) {
        boardsList.textContent = 'Nie udało się pobrać tablic';
    }
}

logoutBtn.addEventListener('click', async () => {
    const response = await fetch('/api/auth/logout', {
        method: 'POST'
    });

    if (response.ok) {
        window.location.href = 'login.html';
    }
});

loadBoards();