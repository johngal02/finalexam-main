import {
  backendURL,
  successNotification,
  getLoggedUser,
} from "../../../js/utils/utils.js";

getUsers();
async function getUsers() {
  const response = await fetch(backendURL + "/api/user", {
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
                              <th scope="col" class="text-dark">${element.id}</th>
                              <th scope="col" class="text-dark">${element.firstname}</th>
                              <th scope="col" class="text-dark">${element.lastname}</th>
                              <th scope="col" class="text-dark">${element.email}</th>

                              </tr>
                          </thead>
                          <tbody id="room-data">
                          </tbody>
                      </table>
                  </div>`;
    });

    document.getElementById("get_alluser").innerHTML = container;

    // Add event listeners for any additional actions here
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
