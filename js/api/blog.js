import {
  backendURL,
  successNotification,
  getLoggedUser,
} from "../utils/utils.js";

// Get All Events
getBlogs();
async function getBlogs() {
  const response = await fetch(backendURL + "/api/eventexhi", {
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

      container += `<div class="col-md-4">
                        <div class="post-entry">
                          <a href="#" class="d-block mb-4">
                            <img src="${backendURL}/storage/${element.image}" alt="Image" height = "250px" width = "250px">
                          </a>
                          <div class="post-text">
                            <span class="post-meta">${element.exhibition_date} &bullet; By <a href="#">${element.exhibition_id}</a></span>
                            <h3><a href="#">${element.exhibition_name}</a></h3>
                          </div>
                        </div>
                      </div>`;
    });

    document.getElementById("get_blogs").innerHTML = container;

    // Add event listeners for any additional actions here
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
