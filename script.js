const todoButtonEl = document.querySelector(".addtodo__button");
const todoListEl = document.querySelector(".todolist__list");
const todoInputEl = document.querySelector("#addtodo__field");

const getTodoList = async () => {
  const result = await getData();

  // convert the data to a usable array of objects
  const todoList = Object.keys(result).map((key) => ({
    id: key,
    description: result[key].description,
    done: result[key].done,
  }));

  return todoList;
};

const renderSingleTodo = (todo) => {
  const todoEl = document.createElement("li");
  todoEl.classList.add("todolist__item");

  // delete button
  const deleteButton = document.createElement("img");
  deleteButton.src = "./img/dustbin.png";
  deleteButton.classList.add("todolist__deletebutton");

  deleteButton.addEventListener("click", () => {
    deleteData(todo.id); // send delete request
    todoEl.parentNode.removeChild(todoEl); // remove the element from DOM
  });

  todoEl.innerHTML = todo.description;
  todoEl.appendChild(deleteButton);
  todoListEl.appendChild(todoEl);

  return todoEl;
};

const renderTodoList = async () => {
  const todoList = await getTodoList();
  todoList.map((todo) => renderSingleTodo(todo));
};

renderTodoList(); // first render of the TODO list

// Enable "enter" press to submit the TODO
todoInputEl.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    todoButtonEl.click();
  }
});

todoButtonEl.addEventListener("click", async () => {
  const todo = { description: todoInputEl.value, done: true };
  todoInputEl.value = ""; // clear the input field after submit
  postData(todo);
  renderSingleTodo(todo);
});
