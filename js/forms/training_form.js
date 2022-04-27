fetch('https://xosstech.com/cvm/api/public/api/trainings', {
    method: "POST", headers: {
        "Content-Type": "application/json", Authorization: bearer
    }, mode: "cors", cache: "default",
}).then((res) => {
    return res.json()
}).then((jsonRes) => {
    // console.log({jsonRes});
    if (!jsonRes.success) {
        throw Error("Could not fetch data for that resource");
    } else {
        let trainingsInfoData = jsonRes.data[0];

        document.getElementById('training_name').value = trainingsInfoData.training_name;
        document.getElementById('training_end').value = trainingsInfoData.end;
        document.getElementById('training_summary').value = trainingsInfoData.training_summary;
    }

}).catch((err) => console.log('error', err));

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