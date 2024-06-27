/**
 * Template Name: SoftLand
 * Updated: Sep 18 2023 with Bootstrap v5.3.2
 * Template URL: https://bootstrapmade.com/softland-bootstrap-app-landing-page-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Function to handle form submission for creating or updating events
   */
  const eventForm = document.getElementById("event_form");

  eventForm.onsubmit = async (e) => {
    e.preventDefault();

    // Disable Button
    document.querySelector("#event_form button[type='submit']").disabled = true;

    // Get Values of Form (input, textarea, select) set it as form-data
    const formData = new FormData(eventForm);

    let url = backendURL + "/api/event";
    let method = "POST";

    // Check if we are updating an existing event
    const eventId = formData.get("event_id");
    if (eventId) {
      url += `/${eventId}`;
      method = "PUT";
    }

    // Fetch API Endpoint
    const response = await fetch(url, {
      method: method,
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

      eventForm.reset();

      successNotification(
        `Event ${method === "POST" ? "added" : "updated"} successfully!`,
        5
      );
    } else if (response.status == 422) {
      const json = await response.json();

      //errorNotification(json.message, 10);
    }

    document.querySelector(
      "#event_form button[type='submit']"
    ).disabled = false;
    document.querySelector("#event_form button[type='submit']").innerHTML =
      "Submit";
  };

  /**
   * Function to handle deleting an event
   */
  on("click", "#get_allevent #btn_delete", async function (e) {
    e.preventDefault();
    const eventId = this.getAttribute("data-id");

    if (!confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      const response = await fetch(backendURL + "/api/event/", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        // Optionally, update UI or refresh events list
        successNotification("Event deleted successfully!", 5);
        // Reload events after deletion
        getEvents();
      } else {
        alert("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  });

  /**
   * Function to fetch all events
   */
  async function getEvents() {
    try {
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

          container += `
            <div class="table-responsive-lg">
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
                    <th>
                      <div class="dropdown my-dropdown">
                        <button class="btn btn-outline-secondary btn-sm dropdown-toggle my-dropdown-button" type="button" data-bs-toggle="dropdown" area-expanded="false">
                          <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <ul class="dropdown-menu my-dropdown-menu">
                          <li>
                            <a class="dropdown-item" href="#" id="btn_edit" data-id="${element.event_id}">Edit</a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#" id="btn_delete" data-id="${element.event_id}">Delete</a>
                          </li>
                        </ul>
                      </div>
                    </th>
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
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  // Initial call to fetch events
  getEvents();
})();
