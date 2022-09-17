const form = document.querySelector("form");
const submit = document.querySelector(".submitted");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let date = document.getElementById("hangout").value;
  let location = document.getElementById("location").value;
  let comment = document.getElementById("comment").value;

  //   console.log(name);
  //   console.log(email);
  //   console.log(date);
  //   console.log(location);
  //   console.log(comment);
  let submitText = `Sounds good! ${name}, I'll see you in ${location} on ${date} for ${comment}`;
  form.reset();

  document.querySelector(".submitted").classList.add("visible");
  document.querySelector(".submit-text").textContent = submitText;
});

document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".submitted").classList.remove("visible");
});
