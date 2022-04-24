const educationForm = document.getElementById("education_from");
educationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
        inst_name: e.target.elements["inst_name"].value,
        degree: e.target.elements["degree"].value,
        dept: e.target.elements["dept"].value,
        pass_year: e.target.elements["pass_year"].value,
        result: e.target.elements["result"].value,
        board: e.target.elements["board"].value,
    };

    fetch("https://xosstech.com/cvm/api/public/api/education", {
        method: "POST", mode: "cors", headers: {
            "Content-Type": "application/json", Authorization: bearer,
        }, body: JSON.stringify(formData),
    }).then((res) => {
        console.log('res=>', res);
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
                // window.location.href = "login.html";
            } else {
                console.log('jsonRes.success->', jsonRes);
                // document.getElementById("education_from").reset();
            }
        })
        .catch((err) => {
            console.log('error->', err);
            // window.location.href = "/login.html";
        });
});
