const trainingForm = document.getElementById("training_from");
trainingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
        training_name: e.target.elements["training_name"].value,
        end: e.target.elements["training_end"].value,
        training_summary: e.target.elements["training_summary"].value,
    };

    fetch("https://xosstech.com/cvm/api/public/api/training", {
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
                document.getElementById("training_from").reset();
            }
        })
        .catch((err) => {
            console.log('error->', err);
            // window.location.href = "/login.html";
        });
});