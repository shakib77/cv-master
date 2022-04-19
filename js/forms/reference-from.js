const referenceForm = document.getElementById("reference_from");
referenceForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
        name: e.target.elements["reference_name"].value,
        designation: e.target.elements["designation"].value,
        organization: e.target.elements["organization"].value,
        email: e.target.elements["reference_email"].value,
        mobile: e.target.elements["reference_mobile"].value,
    };

    fetch("https://xosstech.com/cvm/api/public/api/reference", {
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
                document.getElementById("reference_from").reset();
            }
        })
        .catch((err) => {
            console.log('error->', err);
            // window.location.href = "/login.html";
        });
});