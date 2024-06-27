function setRouter() {
  //alert(window.location.pathname);
  switch (window.location.pathname) {
    case "/":
    case "/landingpage.html":
    case "/index.html":
      if (localStorage.getItem("token") != null) {
        window.location.pathname = "/home.html";
      }
      break;

    case "/home.html":
      if (!localStorage.getItem("token")) {
        window.location.pathname = "/landingpage.html";
      }
      break;

    default:
      break;
  }
}

export { setRouter };