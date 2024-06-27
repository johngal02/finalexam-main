import {
  backendURL,
  successNotification,
  getLoggedUser,
} from "../utils/utils.js";

// Get All Events
getEvents();
async function getEvents() {
  const response = await fetch(backendURL + "/api/event", {
    method: "GET",
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

      container += `<div class="col-lg-4 mb-4 p-2 mb-lg-0">
                      <div class="pricing h-100 text-center">
                          <span>&nbsp;</span>
                          <h3>${element.event_name}</h3>
                          <ul class="list-unstyled">
                              <li>${element.event_type}</li>
                              <li>${element.location}</li>
                              <li>${element.event_description}</li>
                          </ul>
                          <div class="price-cta">
                              <strong class="price">${element.start_date}</strong>
                              <strong class="price">${element.end_date}</strong>
                              <p>${element.organizer_id}</p>
                          </div>
                      </div>
                  </div>`;
    });

    document.getElementById("get_event").innerHTML = container;

    // Add event listeners for any additional actions here
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
