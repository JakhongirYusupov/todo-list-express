const email = document.querySelector("#exampleInputEmail1");
const password = document.querySelector("#exampleInputPassword1");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await fetch("http://localhost:4040/login", {
    method: "POST",
    body: JSON.stringify({
      email: email.value,
      password: password.value
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })

  const { status, message, token } = await res.json();
  if (status === 200 && token) {
    alert(message);
    window.location = "/"
    return window.localStorage.setItem("todo_token", JSON.stringify(token));
  } else {
    alert(message);
  }
})