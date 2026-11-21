let editingBoardId = null;
const boardsList = document.getElementById('boardsList');
const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');

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
        const usersResponse = await fetch('/api/users');
        const users = await usersResponse.json();
        console.log(boards);
        boardsList.replaceChildren();
        if (boards.length === 0) {
          boardsList.innerHTML = `
            <div class="col-12 text-center py-5">
              <h4>Brak tablic</h4>
              <p class="text-muted">
                Nie masz jeszcze żadnych tablic.
              </p>
            </div>
          `;
          return;
        }

        for (const board of boards) {
            const item = document.createElement('div');
            item.className = 'card shadow-sm p-3 h-100';

            const link = document.createElement('a');
            link.href = 'board.html?id=' + encodeURIComponent(board.id);
            link.className = 'fs-5 fw-semibold text-decoration-none text-dark mb-2 d-block';
            link.textContent = board.name;

            item.appendChild(link);

            const description = document.createElement('p');
            description.className = 'text-secondary mb-3';
            description.textContent = board.description || 'Brak opisu';

            item.appendChild(description);
            const owner = users.find(user => user.id === board.ownerId);

            const ownerText = document.createElement('p');
            ownerText.className = 'text-muted small mb-2';

            ownerText.textContent = owner
              ? `Utworzona przez: ${owner.firstName} ${owner.lastName}`
              : 'Utworzona przez: Nieznany użytkownik';

            item.appendChild(ownerText);
            const tasksResponse = await fetch(`/api/boards/${board.id}/tasks`);

            if (tasksResponse.ok) {
                const tasks = await tasksResponse.json();

                const activeTasks = tasks.filter(task =>
                  task.status === 'todo' || task.status === 'in_progress'
                ).length;

                const tasksText = document.createElement('p');
                tasksText.className = 'text-muted small mb-2';
                tasksText.textContent = `Aktywne zadania: ${activeTasks}`;

                item.appendChild(tasksText);
              }
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edytuj';
            editBtn.className = 'btn btn-outline-primary btn-sm';

            editBtn.addEventListener('click', () => {
                editingBoardId = board.id;
                document.getElementById('boardName').value = board.name;
                document.getElementById('boardDescription').value = board.description || '';
                document.getElementById('boardModalTitle').textContent = 'Edytuj tablicę';

                bootstrap.Modal.getOrCreateInstance(
                    document.getElementById('boardModal')
                ).show();
            });

item.appendChild(editBtn);

const deleteBtn = document.createElement('button');
deleteBtn.textContent = 'Usuń';
deleteBtn.className = 'btn btn-outline-danger btn-sm';

deleteBtn.addEventListener('click', async () => {
  if (!confirm('Czy na pewno usunąć tablicę?')) return;

  const response = await fetch(`/api/boards/${board.id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    loadBoards();
  } else {
    alert('Nie udało się usunąć tablicy');
  }
});

item.appendChild(deleteBtn);
const buttons = document.createElement('div');
buttons.className = 'd-flex gap-2 mt-auto pt-3';

buttons.append(editBtn, deleteBtn);
item.appendChild(buttons);

            const column = document.createElement('div');
            column.className = 'col-12 col-md-6 col-lg-4';
            column.appendChild(item);
            boardsList.appendChild(column);
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

editingBoardId = null;
loadBoards();

document.getElementById('boardForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const nameInput = document.getElementById('boardName');
  const description = document.getElementById('boardDescription').value;
  const error = document.getElementById('boardError');
  const name = nameInput.value.trim();

  nameInput.classList.remove('is-invalid');
  error.textContent = '';

  if (!name) {
    nameInput.classList.add('is-invalid');
    return;
  }

  try {
    const response = await fetch(
        editingBoardId ? `/api/boards/${editingBoardId}` : '/api/boards',
        {
            method: editingBoardId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    });

    if (!response.ok) {
      const data = await response.json();
      error.textContent = data.error || 'Nie udało się dodać tablicy.';
      return;
    }

    document.getElementById('boardForm').reset();
    bootstrap.Modal.getInstance(document.getElementById('boardModal')).hide();
    loadBoards();
  } catch (err) {
    console.error(err);
    error.textContent = 'Błąd połączenia z serwerem.';
    }
});

document.getElementById('addBoardBtn').addEventListener('click', () => {
  editingBoardId = null;

  document.getElementById('boardForm').reset();
  document.getElementById('boardModalTitle').textContent = 'Dodaj tablicę';
  document.getElementById('boardName').classList.remove('is-invalid');
  document.getElementById('boardError').textContent = '';
});

async function loadCurrentUser() {
    try {
        const response = await fetch('/api/auth/me');

        if (!response.ok) return;

        const user = await response.json();

        document.getElementById('userName').textContent =
            `${user.firstName} ${user.lastName}`;
    } catch (error) {
        console.error(error);
    }
}

loadCurrentUser();