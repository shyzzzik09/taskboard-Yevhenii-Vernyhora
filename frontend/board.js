let editingTask = null;
const params = new URLSearchParams(window.location.search);
const boardId = params.get('id');

const todoList = document.getElementById('todoList');
const progressList = document.getElementById('progressList');
const doneList = document.getElementById('doneList');


async function loadTasks() {
    if (!boardId) {
        todoList.textContent = 'Nie wybrano tablicy';
        return;
    }

    try {
        const priority = document.getElementById('filterPriority').value;
        const query = priority ? `?priority=${priority}` : '';

        const response = await fetch(`/api/boards/${boardId}/tasks${query}`);

        if (response.status === 401) {
            window.location.href = 'login.html';
            return;
        }

        if (!response.ok) {
            throw new Error('Błąd pobierania zadań');
        }

        const tasks = await response.json();

        todoList.replaceChildren();
        progressList.replaceChildren();
        doneList.replaceChildren();

        for (const task of tasks) {
            const card = document.createElement('div');
            card.className = 'card p-3 mb-2';

            const title = document.createElement('h4');
            title.className = 'h5';
            title.textContent = task.title;

            card.appendChild(title);        

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edytuj';
            editBtn.className = 'btn btn-secondary btn-sm mt-2';

            editBtn.addEventListener('click', () => {
                editingTask = task;
                document.getElementById('taskTitle').value = task.title;
                document.getElementById('taskDescription').value = task.description || '';

                const modal = new bootstrap.Modal(document.getElementById('taskModal'));
                modal.show();
            });

            card.appendChild(editBtn);

                const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Usuń';
                    deleteBtn.className = 'btn btn-danger btn-sm mt-2';

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
            statusBtn.className = 'btn btn-warning btn-sm mt-2';

                if (task.status === 'todo') {
                    statusBtn.textContent = 'Rozpocznij';
                } else if (task.status === 'in_progress') {
                    statusBtn.textContent = 'Zakończ';
                } else {
                    statusBtn.textContent = 'Zrobione';
                    statusBtn.disabled = true;
                }   

        statusBtn.addEventListener('click', async () => {
            const newStatus = task.status === 'todo' ? 'in_progress' : 'done';

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
            status: editingTask ? editingTask.status : 'todo',
            priority: editingTask ? editingTask.priority : 'medium',
            deadline: editingTask?.deadline
                ? String(editingTask.deadline).slice(0, 10)
                : null,
            assigneeId: editingTask ? editingTask.assigneeId : null
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
});

document.getElementById('filterPriority').addEventListener('change', loadTasks);