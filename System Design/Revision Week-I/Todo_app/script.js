var taskIdCounter = 1;
var form = document.getElementById("todo-form");
var input = document.getElementById("todo-input");
var list = document.getElementById("todo-list");
var emptyMsg = document.getElementById("empty-msg");

var tasks = [];
function render() {
  list.innerHTML = "";

  if (tasks.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];

    var li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = task.id;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.className = "icon complete";
    checkbox.setAttribute("aria-label", "Mark task complete");

    checkbox.addEventListener(
      "change",
      (function (id) {
        return function () {
          toggleComplete(id);
        };
      })(task.id)
    );

    var span = document.createElement("div");
    span.className = "text";
    if (task.completed) {
      span.className += " completed";
    }
    span.textContent = task.text;

    var delBtn = document.createElement("button");
    delBtn.className = "icon delete";
    delBtn.setAttribute("aria-label", "Delete task");
    delBtn.textContent = "Delete";

    delBtn.addEventListener(
      "click",
      (function (id) {
        return function () {
          deleteTask(id);
        };
      })(task.id)
    );

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  }
}

function addTask(text) {
  var trimmed = text.trim();

  if (!trimmed) return;

  var task = {
    id: taskIdCounter++,
    text: trimmed,
    completed: false,
  };

  tasks.unshift(task);

  render();
}

function toggleComplete(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].completed = !tasks[i].completed;
      break;
    }
  }

  render();
}

function deleteTask(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      break;
    }
  }

  render();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask(input.value);
  input.value = "";
  input.focus();
});

input.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    input.value = "";
  }
});

render();
