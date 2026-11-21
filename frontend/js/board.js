let editingTask = null;
const params = new URLSearchParams(window.location.search);
const boardId = params.get('id');

const todoList = document.getElementById('todoList');
const progressList = document.getElementById('progressList');
const doneList = document.getElementById('doneList');

async function loadUsers() {
  try {
    const response = await fetch('/api/users');

    if (!response.ok) return;

    const users = await response.json();
    const select = document.getElementById('filterAssignee');

    for (const user of users) {
      const option = document.createElement('option');
      option.value = user.id;
      option.textContent = `${user.firstName} ${user.lastName}`;
      select.appendChild(option);
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadTasks() {
    if (!boardId) {
        todoList.textContent = 'Nie wybrano tablicy';
        return;
    }

    try {
        const priority = document.getElementById('filterPriority').value;
        const assigneeId = document.getElementById('filterAssignee').value;
        const q = document.getElementById('filterQ').value;

        const params = new URLSearchParams();

        if (priority) params.set('priority', priority);
        if (assigneeId) params.set('assigneeId', assigneeId);
        if (q) params.set('q', q);

        const query = params.toString() ? `?${params}` : '';
        const response = await fetch(`/api/boards/${boardId}/tasks${query}`);

        if (response.status === 401) {
            window.location.href = 'login.html';
            return;
        }

        if (!response.ok) {
            throw new Error('Błąd pobierania zadań');
        }

        const tasks = await response.json();

        const usersResponse = await fetch('/api/users');
        const users = await usersResponse.json();
        const assigneeSelect = document.getElementById('taskAssignee');

        assigneeSelect.innerHTML = '<option value="">Nieprzypisane</option>';

        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = `${user.firstName} ${user.lastName}`;
            assigneeSelect.appendChild(option);
        });

        todoList.replaceChildren();
        progressList.replaceChildren();
        doneList.replaceChildren();

        for (const task of tasks) {
            const card = document.createElement('div');
            card.className = 'card p-3 mb-2';
            card.style.display = 'flex';
            card.style.flexDirection = 'row';
            card.style.flexWrap = 'wrap';
            card.style.alignItems = 'flex-start';
            card.style.gap = '8px';

            const title = document.createElement('h4');
            title.className = 'h6 mb-1 w-100';
            title.textContent = task.title;

            card.appendChild(title);        

            const info = document.createElement('div');
            info.className = 'w-100 small text-secondary';

            const priorityNames = {
                low: 'Niski',
                medium: 'Średni',
                high: 'Wysoki'
            };

            const priority = priorityNames[task.priority] || 'Brak';
            const deadline = task.deadline
                ? new Date(task.deadline).toLocaleDateString('pl-PL')
                : 'Brak';

            const badge = document.createElement('span');
            badge.className = 'badge me-2';

            if (task.priority === 'high') {
                badge.classList.add('bg-danger');
            } else if (task.priority === 'medium') {
                badge.classList.add('bg-warning', 'text-dark');
            } else {
                badge.classList.add('bg-secondary');
            }

            badge.textContent = `Priorytet: ${priority}`;

            const dateText = document.createElement('span');
            dateText.textContent = `Termin: ${deadline}`;

            info.append(badge, dateText);

            card.appendChild(info);

            const person = document.createElement('div');
            person.className = 'w-100 small text-secondary';

            const user = users.find(u => u.id === task.assigneeId);

            person.textContent = user
                ? `Osoba: ${user.firstName} ${user.lastName}`
                : 'Osoba: nieprzypisane';

            card.appendChild(person);

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Szczegóły';
            editBtn.className = 'btn btn-outline-secondary btn-sm';

            editBtn.addEventListener('click', () => {
                editingTask = task;
                document.querySelector('#taskModal .modal-title').textContent =
                    `Zadanie: ${task.title}`;

                document.getElementById('taskCreatedAt').textContent =
                    task.createdAt
                        ? `Utworzono: ${new Date(task.createdAt).toLocaleDateString('pl-PL')}`
                        : '';
                document.getElementById('taskTitle').value = task.title;
                document.getElementById('taskDescription').value = task.description || '';
                document.getElementById('taskStatus').value = task.status || 'todo';
                document.getElementById('taskPriority').value = task.priority || 'medium';

                document.getElementById('taskDeadline').value =
                task.deadline ? task.deadline.slice(0, 10) : '';

                document.getElementById('taskAssignee').value = task.assigneeId || '';

                const modal = new bootstrap.Modal(document.getElementById('taskModal'));
                modal.show();
            });

            card.appendChild(editBtn);

                const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Usuń';
                    deleteBtn.className = 'btn btn-outline-danger btn-sm';

                    deleteBtn.addEventListener('click', async () => {
                        if (!confirm('Czy na pewno usunąć zadanie?')) {
                        return;
                        }

                    const response = await fetch(`/api/tasks/${task.id}`, {
                        method: 'DELETE'
                    });

                        if (response.ok) {
                            loadTasks();
                        } else {
                            alert('Nie udało się usunąć zadania');
                        }
                    });

            card.appendChild(deleteBtn);

            const statusBtn = document.createElement('button');
            statusBtn.className = 'btn btn-outline-primary btn-sm';

                if (task.status === 'todo') {
                    statusBtn.textContent = 'Przenieś do: W trakcie';
                } else if (task.status === 'in_progress') {
                    statusBtn.textContent = 'Przenieś do: Gotowe';
                } else {
                    statusBtn.textContent = 'Otwórz ponownie';
                }  

        statusBtn.addEventListener('click', async () => {
            const newStatus = task.status === 'todo'
                ? 'in_progress'
                : task.status === 'in_progress'
                    ? 'done'
                    : 'todo';

            const response = await fetch(`/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify({
                    title: task.title,
                    description: task.description,
                    status: newStatus,
                    priority: task.priority,
                    deadline: task.deadline
                    ? String(task.deadline).slice(0, 10)
                    : null,
                    boardId: task.boardId,
                    assigneeId: task.assigneeId
                    })
        });

    if (response.ok) {
        loadTasks();
    } else {
        alert('Nie udało się zmienić statusu');
    }
});

card.appendChild(statusBtn);

            if (task.status === 'todo') {
                todoList.appendChild(card);
            } else if (task.status === 'in_progress') {
                progressList.appendChild(card);
            } else if (task.status === 'done') {
                doneList.appendChild(card);
            }
        }
    } catch (error) {
        todoList.textContent = 'Nie udało się pobrać zadań';
    }
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    const response = await fetch('/api/auth/logout', {
        method: 'POST'
    });

    if (response.ok) {
        window.location.href = 'login.html';
    }
});

loadUsers();
loadTasks();

document.getElementById('taskForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('taskTitle').value;
    if (title.trim().length < 3 || title.trim().length > 100) {
        document.getElementById('taskTitle').classList.add('is-invalid');
        return;
    }

    document.getElementById('taskTitle').classList.remove('is-invalid');
    const description = document.getElementById('taskDescription').value;
    const priority = document.getElementById('taskPriority').value;
    const deadline = document.getElementById('taskDeadline').value || null;
    const assigneeId = document.getElementById('taskAssignee').value;

    const response = await fetch(
    editingTask ? `/api/tasks/${editingTask.id}` : '/api/tasks',
    {
        method: editingTask ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description,
            boardId: Number(boardId),
            status: document.getElementById('taskStatus').value,
            priority,
            deadline,
            assigneeId: assigneeId ? Number(assigneeId) : null
        })
    }
);

    if (response.ok) {
        editingTask = null;
        document.getElementById('taskForm').reset();
        bootstrap.Modal.getInstance(document.getElementById('taskModal')).hide();
        loadTasks();
    } else {
        alert('Nie udało się dodać zadania');
    }
});

document.getElementById('addTaskBtn').addEventListener('click', () => {
    editingTask = null;
    document.getElementById('taskForm').reset();
    document.getElementById('taskCreatedAt').textContent = '';
    document.getElementById('taskTitle').classList.remove('is-invalid');
    document.getElementById('taskPriority').value = 'medium';
    document.querySelector('#taskModal .modal-title').textContent =
        'Dodaj zadanie';
});

document.getElementById('filterPriority').addEventListener('change', loadTasks);

document.getElementById('filterAssignee').addEventListener('change', loadTasks);

document.getElementById('filterQ').addEventListener('input', loadTasks);

document.getElementById('clearFilters').addEventListener('click', () => {
  document.getElementById('filterPriority').value = '';
  document.getElementById('filterAssignee').value = '';
  document.getElementById('filterQ').value = '';
  loadTasks();
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