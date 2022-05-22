const addTraining = () => {
    let selector = document.getElementById('training_div')
    selector.parentElement.innerHTML += selector.outerHTML;
}

const deleteTraining = ()=> {
    $('.training_from_cls').on('click',function(){
        $(this).parent('div.training_div').remove();
    });
}

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
        let trainingsInfoDataLength = jsonRes.data.length;
        let trainingsInfoData = jsonRes.data[trainingsInfoDataLength - 1];

        document.getElementById('training_name').value = trainingsInfoData.training_name;
        document.getElementById('training_end').value = trainingsInfoData.end;
        document.getElementById('training_summary').value = trainingsInfoData.training_summary;

        const trainingForm = document.getElementById("training_from");
        trainingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = {
                training_name: e.target.elements["training_name"].value,
                end: e.target.elements["training_end"].value,
                training_summary: e.target.elements["training_summary"].value,
            };

            if ( trainingsInfoDataLength && trainingsInfoDataLength > 0) {
                fetch(`https://xosstech.com/cvm/api/public/api/training/update/${trainingsInfoData.id}`, {
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
                            alert('Data has been successfully updated');
                            // document.getElementById("training_from").reset();
                        }
                    })
                    .catch((err) => {
                        console.log('error->', err);
                        // window.location.href = "/login.html";
                    });

            } else {
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
                            alert('Data has been successfully created');
                            // document.getElementById("training_from").reset();
                        }
                    })
                    .catch((err) => {
                        console.log('error->', err);
                        // window.location.href = "/login.html";
                    });
            }

        });

    }

}).catch((err) => console.log('error', err));
