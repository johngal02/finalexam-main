import {
  backendURL,
  successNotification,
  getLoggedUser,
} from "../utils/utils.js";

// Get All Events
getInstructors();
async function getInstructors() {
  const response = await fetch(backendURL + "/api/instructor", {
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "69420",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  if (response.ok) {
    const json = await response.json();

    let container = "";
    json.forEach((element) => {
      const date = new Date(element.created_at).toLocaleString();

      const fullName = `${element.instructor_firstname} ${element.instructor_lastname}`;

      container += `<div class="col-lg-4 mb-4 p-2 mb-lg-0">
                        <div class="pricing h-100 text-center">
                            <span>&nbsp;</span>
                            <h3>${fullName}</h3>
                            <ul class="list-unstyled">
                                <li>${element.instructor_contact}</li>
                                <li>${element.instructor_bio}</li>
                            </ul>
                        </div>
                    </div>`;
    });

    document.getElementById("get_instructors").innerHTML = container;

    // Add event listeners for any additional actions here
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
