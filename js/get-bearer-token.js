const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";

const bearer = "Bearer " + token;

let isUserLoggedIn = false;
if (token) isUserLoggedIn = true;