const list = document.getElementById('todos');
const btn = document.querySelector('button');
btn.addEventListener('click', handleclick);

function handleclick() {
    const todo = this.previousElementSibling.value.trim();
    if(todo) {
        addTask(todo);
        this.previousElementSibling.value = "";       
    }
    else {
        alert('Please enter a task');
    }
}

function addTask(text) {
    const li = document.createElement('li');
    li.textContent = text;
    list.prepend(li);
    li.addEventListener('click', deleteTask);
}

function deleteTask() {
    this.removeEventListener('click', deleteTask);
    this.remove();
}