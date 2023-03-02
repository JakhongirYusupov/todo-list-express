const fullName = document.querySelector("#exampename");
const email = document.querySelector("#exampleInputEmail1");
const password = document.querySelector("#exampleInputPassword1");
const input = document.querySelector("#exampleCheck1");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formdata = new FormData();
  formdata.append("username", fullName.value)
  formdata.append("email", email.value)
  formdata.append("password", password.value)
  formdata.append("image", input.files[0])

  const res = await fetch("http://localhost:4040/register", {
    method: "POST",
    body: formdata,
    headers: {
      "Content-Type": "multipart/form-data"
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