import {
  backendURL,
  successNotification,
  getLoggedUser,
} from "../utils/utils.js";

getLoggedUser();

const btn_logout = document.getElementById("btn_logout");

btn_logout.onclick = async () => {
  const response = await fetch(backendURL + "/api/logout", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "69420",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  if (response.ok) {
    localStorage.clear();

    window.location.pathname = "/";

    successNotification("Successfully logged out account", 5);
  } else {
    const json = await response.json();

    alert(json.message);
  }
};

// Submit Form Functionality; This is for Create and Update
const form_slides = document.getElementById("form_slides");

form_slides.onsubmit = async (e) => {
  e.preventDefault();

  // Disable Button
  document.querySelector("#form_slides button[type='submit']").disabled = true;

  // Get Values of Form (input, textarea, select) set it as form-data
  const formData = new FormData(form_slides);

  // Fetch API Carousel Item Store Endpoint
  const response = await fetch(backendURL + "/api/artist", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "69420",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: formData,
  });
  if (response.ok) {
    const json = await response.json();

    console.log(json);

    form_slides.reset();

    successNotification("Successfully joined as an Artist!", 5);
  } else if (response.status == 422) {
    const json = await response.json();

    // Close Modal Form
    //document.getElementById("modal_close").click();

    //errorNotification(json.message, 10);
  }

  //Enable the button after processing
  document.querySelector("#form_slides button[type='submit']").disabled = false;
  document.querySelector("#form_slides button[type='submit']").innerHTML =
    "Submit";
};
