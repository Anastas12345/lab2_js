const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
};

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let itemCount = 0;
let uncheckedCount = 0;

function newTodo() {
  const todoText = prompt("Enter TODO item:");
  todoText && addTodoItem(todoText);
}

function addTodoItem(text) {
  updateItemCount(1);
  updateUncheckedCount(1);

  const todoItem = createTodoItem(text);
  list.appendChild(todoItem);

  updateCounts();
}

function createTodoItem(text) {
  const todoItem = document.createElement('li');
  todoItem.className = classNames.TODO_ITEM;

  const checkbox = createCheckbox();
  const todoText = createText(text);
  const deleteButton = createDeleteButton(todoItem, checkbox);

  todoItem.append(checkbox, todoText, deleteButton);
  
  return todoItem;
}

function createCheckbox() {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = classNames.TODO_CHECKBOX;
  checkbox.addEventListener('change', handleCheckboxChange);
  return checkbox;
}

function createText(text) {
  const todoText = document.createElement('span');
  todoText.className = classNames.TODO_TEXT;
  todoText.textContent = text;
  
  todoText.addEventListener('click', () => {
    const newText = prompt("Edit TODO item:", todoText.textContent);
    if (newText) {
      todoText.textContent = newText;
    }
  });
  
  return todoText;
}

function createDeleteButton(todoItem, checkbox) {
  const deleteButton = document.createElement('button');
  deleteButton.className = classNames.TODO_DELETE;
  deleteButton.textContent = 'Delete';
  
  deleteButton.addEventListener('click', () => {
    todoItem.remove();
    updateItemCount(-1);
    !checkbox.checked && updateUncheckedCount(-1);
    updateCounts();
  });
  
  return deleteButton;
}

function handleCheckboxChange(event) {
  const change = event.target.checked ? -1 : 1;
  updateUncheckedCount(change);
  updateCounts();
}

function updateItemCount(change) {
  itemCount += change;
}

function updateUncheckedCount(change) {
  uncheckedCount += change;
}

function updateCounts() {
  itemCountSpan.textContent = itemCount;
  uncheckedCountSpan.textContent = uncheckedCount;
}
