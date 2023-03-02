const form = document.querySelector(".todo-form");
const input = document.querySelector(".add-task");
const todoList = document.querySelector(".todo-list");

const createElement = (...arr) => {
  return arr.map((el) => document.createElement(el))
};

const putTodo = async (todoId) => {
  let token = JSON.parse(window.localStorage.getItem("todo_token"));
  let res = await fetch("http://localhost:4040/course", {
    method: "PUT",
    body: JSON.stringify({
      todoId
    }),
    headers: {
      "Content-Type": "application/json",
      token
    }
  })
  let data = await res.json();
  alert(data.message)
}

const deleteTodo = async (todoId) => {
  let token = JSON.parse(window.localStorage.getItem("todo_token"));
  let res = await fetch("http://localhost:4040/course", {
    method: "DELETE",
    body: JSON.stringify({
      todoId
    }),
    headers: {
      "Content-Type": "application/json",
      token
    }
  })
  let data = await res.json();
  alert(data.message);
  pushTodos(getCourse("all"));
}

const pushTodos = (todos) => {
  todoList.innerHTML = ""

  if (todos.length) {
    todos.map((el) => {
      const [item, checker, span1, input, span2, btn] = createElement("div", "div", "span", "input", "span", "button");
      item.className = "todo-item";
      checker.className = "checker";
      input.type = "checkbox";
      span2.innerText = el.todo;
      span2.className = "ml-2";
      btn.className = "btn-danger ml-4"
      btn.innerText = "Delete"

      if (el.checked === true) input.checked = true

      input.addEventListener("change", () => putTodo(el.id));
      btn.addEventListener("click", () => deleteTodo(el.id));

      span1.appendChild(input);
      checker.appendChild(span1);
      item.appendChild(checker);
      item.appendChild(span2);
      item.appendChild(btn)
      todoList.prepend(item)
      return
    })
  } else todoList.innerHTML = `<h3>404 Not Found</h3>`
};

; (async function () {
  getCourse("all")
}());

form.addEventListener("submit", async () => {
  let token = JSON.parse(window.localStorage.getItem("todo_token"));
  const data = {
    "todo": input.value
  };
  if (token) {
    const res = await fetch("http://localhost:4040/course", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        token
      }
    });
    let todo = await res.json();
    if (todo.status === 200) {
      return getCourse("all")
    }
    return window.location = "/login"

  } else window.location = "/login"
})

all.addEventListener("click", async () => {
  getCourse("all");
});

active.addEventListener("click", async () => {
  getCourse("active");
});

complated.addEventListener("click", async () => {
  getCourse("complated");
});

async function getCourse(type) {
  let token = JSON.parse(window.localStorage.getItem("todo_token"));
  try {
    let todos = await fetch("http://localhost:4040/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        type,
        token
      }
    })
    let courses = await todos.json();
    if (courses.status === 200) {
      return pushTodos(courses.data);
    }
    else return alert(courses.message);
  } catch (error) {
    console.log(error);
  }
}