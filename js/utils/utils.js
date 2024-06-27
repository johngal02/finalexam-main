import { setRouter } from "../router/router.js";

setRouter();
const backendURL = "http://127.0.0.1:8000";

async function getLoggedUser() {
  const response = await fetch(backendURL + "/api/profile/show", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "69420",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  if (response.ok) {
    const json = await response.json();

    if (document.getElementById("id")) {
      document.getElementById("id").value = json.id;
    }
  } else {
    const json = await response.json();

    alert(json.message);
  }
}

function successNotification(message, seconds) {
  document.querySelector(".alert-success").classList.remove("d-none");
  document.querySelector(".alert-success").classList.add("d-block");
  document.querySelector(".alert-success").innerHTML = message;

  if (seconds != "") {
    setTimeout(function () {
      document.querySelector(".alert-success").classList.remove("d-none");
      document.querySelector(".alert-success").classList.add("d-block");
    }, seconds * 1000);
  }
}

function errorNotification(message, seconds) {
  document.querySelector(".alert-danger").classList.remove("d-none");
  document.querySelector(".alert-danger").classList.add("d-block");
  document.querySelector(".alert-danger").innerHTML = message;
  if (seconds != "") {
    setTimeout(function () {
      document.querySelector(".alert-danger").classList.remove("d-none");
      document.querySelector(".alert-danger").classList.add("d-block");
    }, seconds * 1000);
  }
}

export { backendURL, successNotification, errorNotification, getLoggedUser };
