const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let todos = [
  { id: 1, text: 'Вивчити HTML', checked: true },
  { id: 2, text: 'Вивчити CSS', checked: true },
  { id: 3, text: 'Вивчити JavaScript', checked: false }
];

document.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage();
  render(todos);
  updateCounter();
  addEventListeners();
  
  const listItems = document.querySelectorAll('.list-group-item');
  listItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
});

function newTodo() {
  const text = prompt('Введіть нову справу:');
  if (text !== null && text.trim() !== '') {
    const newId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    todos.push({ id: newId, text: text.trim(), checked: false });

    render(todos);
    updateCounter();
    saveToLocalStorage();
    
    console.log('Оновлений список справ:', todos);
  }
}

function renderTodo(todo) {
  const textClass = todo.checked ? 'text-success text-decoration-line-through' : '';
  
  return `
    <li class="list-group-item" data-id="${todo.id}">
      <input type="checkbox" class="form-check-input me-2" id="todo-${todo.id}" ${todo.checked ? 'checked' : ''} onchange="checkTodo(${todo.id})" />
      <label for="todo-${todo.id}"><span class="${textClass}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">Видалити</button>
    </li>
  `;
}

function render(todos) {
  const todosHTML = todos.map(todo => renderTodo(todo)).join('');
  list.innerHTML = todosHTML;
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  const uncheckedCount = todos.filter(todo => !todo.checked).length;
  uncheckedCountSpan.textContent = uncheckedCount;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  render(todos);
  updateCounter();
  saveToLocalStorage();
}

function checkTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, checked: !todo.checked };
    }
    return todo;
  });
  render(todos);
  updateCounter();
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadFromLocalStorage() {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }
}