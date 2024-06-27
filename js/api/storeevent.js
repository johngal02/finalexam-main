import {
  backendURL,
  successNotification,
  getLoggedUser,
} from "../../../js/utils/utils.js";

getLoggedUser();
// Submit Form Functionality; This is for Create and Update
const event_form = document.getElementById("event_form");

event_form.onsubmit = async (e) => {
  e.preventDefault();

  // Disable Button
  document.querySelector("#event_form button[type='submit']").disabled = true;

  // Get Values of Form (input, textarea, select) set it as form-data
  const formData = new FormData(event_form);

  // Fetch API Carousel Item Store Endpoint
  const response = await fetch(backendURL + "/api/event", {
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

    event_form.reset();

    successNotification("Successfully added an Event!", 5);
  } else if (response.status == 422) {
    const json = await response.json();

    // Close Modal Form
    //document.getElementById("modal_close").click();

    //errorNotification(json.message, 10);
  }

  document.querySelector("#event_form button[type='submit']").disabled = false;
  document.querySelector("#event_form button[type='submit']").innerHTML =
    "Submit";
};

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

      container += `<div class="table-responsive-lg"">
                      <table class="table table-hover border text-center">
                          <thead>
                              <tr class="bg-dark">
                              <th scope="col" class="text-dark">${element.event_id}</th>
                              <th scope="col" class="text-dark">${element.event_name}</th>
                              <th scope="col" class="text-dark">${element.event_type}</th>
                              <th scope="col" class="text-dark">${element.start_date}</th>
                              <th scope="col" class="text-dark">${element.end_date}</th>
                              <th scope="col" class="text-dark">${element.location}</th>
                              <th scope="col" class="text-dark">${element.event_description}</th>
                              <th scope="col" class="text-dark">${element.organizer_id}</th>
                              <div class="dropdown my-dropdown">
    <button class="btn btn-outline-secondary btn-sm dropdown-toggle my-dropdown-button" type="button" data-bs-toggle="dropdown" area-expanded="false">
        <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <ul class="dropdown-menu my-dropdown-menu">
        <!-- Dropdown menu items -->
        <li>
            <a class="dropdown-item" href="#" id="btn_edit" data-id="${element.event_id}">Edit</a>
        </li>
        <li>
            <a class="dropdown-item" href="#" id="btn_delete" data-id="${element.event_id}">Delete</a>
        </li>
    </ul>
</div>

                </td>
            </tr>
        </tbody>
    </table>
</div>

                              </tr>
                          </thead>
                          <tbody id="room-data">
                          </tbody>
                      </table>
                  </div>`;
    });

    document.getElementById("get_allevent").innerHTML = container;

    // Add event listeners for any additional actions here
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
