import {
  backendURL,
  successNotification,
  errorNotification,
} from "../utils/utils.js";

getClasses();

async function getClasses() {
  const response = await fetch(backendURL + "/api/classes", {
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

      container += `<div class="col-lg-12 mb-4 d-inline-block mx-2 shadow-none">
                        <div class="pricing text-center">
                            <span>&nbsp;</span>
                            <h3>${element.class_name}</h3>
                            <p class="mb-4">${element.instructor_id}</p>
                            <p class="mb-4">${element.class_date}</p>
                            <p class="mb-4">${element.class_description}</p>
                            <button class="btn btn-primary join-class-btn" data-class-id="${element.id}">Join Class</button>
                        </div>
                    </div>`;
    });

    document.getElementById("get_classes").innerHTML = container;

    // Add event listeners for any additional actions here
    addJoinClassEventListeners();
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

function addJoinClassEventListeners() {
  const joinClassButtons = document.querySelectorAll(".join-class-btn");

  joinClassButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const classId = button.dataset.classId;

      try {
        const response = await fetch(backendURL + "/api/classreg", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            classId: classId,
          }),
        });

        if (response.ok) {
          successNotification("Successfully joined the class", 5);
        } else {
          const json = await response.json();
          errorNotification(json.message, 5);
        }
      } catch (error) {
        console.error("Error joining class:", error);
      }
    });
  });
}
