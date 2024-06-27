import {
  backendURL,
  successNotification,
  errorNotification,
} from "../utils/utils.js";

//Form Regis

const form_register = document.getElementById("form_register");
form_register.onsubmit = async (e) => {
  e.preventDefault();

  document.querySelector("#form_register button").disabled = true;

  const formData = new FormData(form_register);

  const response = await fetch(backendURL + "/api/user", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
    body: formData,
  });

  if (response.ok) {
    const json = await response.json();

    form_register.reset();

    successNotification("Successfully registered account", 5);
  } else if (response.status == 422) {
    const json = await response.json();

    errorNotification(json.message, 5);
  }

  document.querySelector("#form_register button").disabled = false;
};
