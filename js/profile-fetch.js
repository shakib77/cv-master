// const token = localStorage.getItem("token")
//     ? localStorage.getItem("token")
//     : "";
//
// const bearer = "Bearer " + token;
// let isUserLoggedIn = false;
// if (token) isUserLoggedIn = true;

const myInit = {
    method: "POST",
    // withCredentials: true,
    // credentials: "include",
    headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
        // cookie: document.cookie,
    },
    mode: "cors",
    cache: "default",
};

fetch("https://xosstech.com/cvm/api/public/api/profileV2", myInit)
    .then((res) => {
        console.log(res);
        if (!res.ok) {
            throw Error("Could not fetch data for that resource");
        } else {
            return res.json();
        }
    })
    .then((jsonRes) => {
        console.log('jsonRes =>', jsonRes);
        if (!jsonRes.success) {
            console.log('!jsonRes.success->', jsonRes);
            window.location.href = "login.html";
        } else {
            console.log('jsonRes.success->', jsonRes);

            let data = jsonRes;
        }
    })
    .catch((err) => {
        console.log('error->', err);
        // window.location.href = "/login.html";
    });