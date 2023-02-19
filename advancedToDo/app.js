(() => {
//Globals
let todos = [];
let users = [];
const todoList = document.getElementById('todo-list');
const userSelect = document.getElementById('user-todo');
const form = document.querySelector('form');


//Attach event
document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', handleSumbit);


//Basic Functions
function getUserName(userId) {
    return users.find(user => user.id === userId).name;
}

function printTodos({userId, id, title, completed}) {
    const li = document.createElement('li');
    li.className = "todo-item";
    li.dataset.id = id;
    li.innerHTML = `<span>${title} <i>by</i> <b>${getUserName(userId)}</b></span>`;
    todoList.prepend(li);

    const status = document.createElement('input');
    status.type = 'checkbox';
    status.checked = completed;
    status.addEventListener('change', handleStatusChange);
    li.prepend(status);

    const close = document.createElement('span');
    close.innerHTML = '&times';
    close.className = 'close';
    close.addEventListener('click', handleClose);
    li.append(close);
}

function createUserOption(user) { 
    const option = document.createElement('option');
    option.value = user.id;
    option.innerText = user.name;

    userSelect.append(option);
}

function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    const todo = todoList.querySelector(`[data-id="${id}"]`);
    todo.querySelector('input').removeEventListener('change', handleStatusChange);
    todo.querySelector('.close').removeEventListener('click', handleClose);

    todo.remove();
}

function errorAlert(error) {
    alert(error.message);
}
//Event logic
function initApp() {
    Promise.all([getAllTodos(), getAllUsers()])
    .then(values =>
        {
        [todos, users] = values;

        //Print
        todos.forEach(todo => printTodos(todo));
        users.forEach(user => createUserOption(user));
        });
}

function handleSumbit(event) {
    event.preventDefault();
    createTodo(
        {
            userId: Number(form.user.value),
            title: form.todo.value,
            completed: false
        }
    );
}

function handleStatusChange() {
    const todoId = this.parentElement.dataset.id;
    const completed = this.checked;

    toggleTodoStatus(todoId, completed);
}

function handleClose() {
    const todoId = this.parentElement.dataset.id;
    deleteTodo(todoId);
}

//Async logic
async function getAllTodos() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        return data;
    }
    catch (error) {
        errorAlert(error);
    }

}

async function getAllUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        return data;
    }
    catch (error) {
        errorAlert(error);
    }
}

async function createTodo(todo) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
    
        const newTodo = await response.json();
        printTodos(newTodo);
    }
    catch (error) {
        errorAlert(error);
    }
}

async function toggleTodoStatus(todoId, completed) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`,
        {
            method: 'PATCH',
            body: JSON.stringify({completed: completed}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        const data = await response.json();
        if(!response.ok) {
            throw new Error("Failed to update todo status, please try again");
        }
    }
    catch (error) {
        errorAlert(error);
    }
}

async function deleteTodo(todoId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        if(response.ok) {
            removeTodo(todoId);
        }
    }
    catch (error) {
        errorAlert(error);
    }
}
})()