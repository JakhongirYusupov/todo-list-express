const fullName = document.querySelector("#exampename");
const email = document.querySelector("#exampleInputEmail1");
const password = document.querySelector("#exampleInputPassword1");

// ; (async function () {
//   let token = JSON.parse(window.localStorage.getItem("todo_token"));
//   if (token) {
//     let res = await fetch("http://localhost:4040/register", {
//       method: "POST",
//       head
//       body: JSON.stringify({ token })
//     });
//     let data = await res.json();
//     console.log(data);
//     // if (data.status === 200) return window.location = "/";
//     // return
//   }
// }())

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log({
    username: fullName.value,
    email: email.value,
    password: password.value
  });
  const res = await fetch("http://localhost:4040/register", {
    method: "POST",
    body: JSON.stringify({
      username: fullName.value,
      email: email.value,
      password: password.value
    }),
    headers: {
      "Content-Type": "application/json"
    }

  })

  const { status, message } = await res.json();
  console.log(status, message);
  if (status === 200) {
    alert(message);
    window.location = "/login"
  } else {
    alert(message);
  }
})