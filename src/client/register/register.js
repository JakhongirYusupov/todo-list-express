const fullName = document.querySelector("#exampename");
const email = document.querySelector("#exampleInputEmail1");
const password = document.querySelector("#exampleInputPassword1");
const input = document.querySelector("#exampleCheck1");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formdata = new FormData();
  formdata.append("image", input.files[0])

  const res = await fetch("http://localhost:4040/register/upload", {
    method: "POST",
    body: formdata
  })

  const data = await res.json();

  if (data.status === 200) {
    const res = await fetch("http://localhost:4040/register", {
      method: "POST",
      body: JSON.stringify({
        username: fullName.value,
        email: email.value,
        password: password.value,
        profileImg: data.image
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    let { status, message } = await res.json()

    if (status === 200) {
      alert(message);
      window.location = "/login"
    } else {
      alert(message);
    }
  } else {
    alert(data.message)
  }
})