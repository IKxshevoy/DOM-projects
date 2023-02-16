const list = document.getElementById('todos');
const btn = document.querySelector('button');
const input = document.querySelector('input');
btn.addEventListener('click', handleclick);
document.addEventListener('DOMContentLoaded', loadTasks);
document.addEventListener('keydown', handlekeydown);

function handleclick() {
    const todo = input.value.trim();
    if(todo) {
        addTask(todo);
        saveToStorage(todo);
        input.value = "";       
    }
    else {
        alert('Please enter a task');
    }
}

function handlekeydown(e) {
    if(e.key === "Enter") {
        handleclick();
    }
}

function addTask(text) {
    const li = document.createElement('li');
    li.textContent = text;
    list.prepend(li);
    li.addEventListener('click', deleteTask);
    li.addEventListener('click', deleteFromStorage);
}

function deleteTask() {
    this.removeEventListener('click', deleteTask);
    document.removeEventListener('keydown', handlekeydown);
    this.remove();
}

function saveToStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    localStorage.setItem('tasks', JSON.stringify([...tasks, task]));
}

function deleteFromStorage() {
    this.removeEventListener('click', deleteFromStorage);
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const newArr = tasks.filter(task => task !== this.textContent);
    localStorage.setItem('tasks', JSON.stringify(newArr));
} 

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks) {
        tasks.forEach(task => addTask(task));
    }
}
