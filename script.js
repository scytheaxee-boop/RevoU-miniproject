document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const dateInput = document.getElementById("date-input");
  const addBtn = document.getElementById("add-btn");
  const todoList = document.getElementById("todo-list");
  const deleteAllBtn = document.getElementById("delete-all-btn");
  const filterBtn = document.getElementById("filter-btn");

  let todos = [];

  function renderTodos(filter = false) {
    todoList.innerHTML = "";

    let filteredTodos = filter 
      ? todos.filter(todo => !todo.completed)
      : todos;

    if (filteredTodos.length === 0) {
      todoList.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
      return;
    }

    filteredTodos.forEach((todo, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${todo.task}</td>
        <td>${todo.date}</td>
        <td>${todo.completed ? "Completed" : "Pending"}</td>
        <td>
          <button class="action-btn complete-btn" onclick="completeTask(${index})">Done</button>
          <button class="action-btn delete-btn" onclick="deleteTask(${index})">Delete</button>
        </td>
      `;

      todoList.appendChild(row);
    });
  }

  addBtn.addEventListener("click", () => {
    const task = todoInput.value.trim();
    const date = dateInput.value;

    if (task === "" || date === "") {
      alert("Please enter a task and a date!");
      return;
    }

    todos.push({ task, date, completed: false });
    todoInput.value = "";
    dateInput.value = "";
    renderTodos();
  });

  deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
      todos = [];
      renderTodos();
    }
  });

  filterBtn.addEventListener("click", () => {
    renderTodos(true);
  });

  window.completeTask = function(index) {
    todos[index].completed = true;
    renderTodos();
  };

  window.deleteTask = function(index) {
    todos.splice(index, 1);
    renderTodos();
  };

  renderTodos();
});