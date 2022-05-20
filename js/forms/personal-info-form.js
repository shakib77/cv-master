fetch('https://xosstech.com/cvm/api/public/api/infos', {
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
        let personalInfoLength = jsonRes.data.length;
        let personalInfoData = jsonRes.data[personalInfoLength - 1];

        document.getElementById('name').value = personalInfoData.name;
        document.getElementById('email').value = personalInfoData.email;
        document.getElementById('mobile').value = personalInfoData.mobile;
        document.getElementById('present_address').value = personalInfoData.present_address;
        document.getElementById('permanent_address').value = personalInfoData.permanent_address;
        document.getElementById('job_title').value = personalInfoData.job_title;
        document.getElementById('marital_status').value = personalInfoData.marital_status;
        document.getElementById('religion').value = personalInfoData.religion;
        document.getElementById('nationality').value = personalInfoData.nationality;
        document.getElementById('gender').value = personalInfoData.gender;
        document.getElementById('dob').value = personalInfoData.dob;
        document.getElementById('father_name').value = personalInfoData.father_name;
        document.getElementById('mother_name').value = personalInfoData.mother_name;
        document.getElementById('profile_summary').value = personalInfoData.profile_summary;
        document.getElementById('image').value = personalInfoData.image;

        const personalInfoForm = document.getElementById("personal_info_from");
        personalInfoForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = {
                name: e.target.elements["name"].value,
                mobile: e.target.elements["mobile"].value,
                email: e.target.elements["email"].value,
                present_address: e.target.elements["present_address"].value,
                permanent_address: e.target.elements["permanent_address"].value,
                job_title: e.target.elements["job_title"].value,
                marital_status: e.target.elements["marital_status"].value,
                religion: e.target.elements["religion"].value,
                nationality: e.target.elements["nationality"].value,
                gender: e.target.elements["gender"].value,
                dob: e.target.elements["dob"].value,
                profile_summary: e.target.elements["profile_summary"].value,
                father_name: e.target.elements["father_name"].value,
                mother_name: e.target.elements["mother_name"].value,
                image: e.target.elements["image"].value,
            };

            if (personalInfoData && personalInfoLength > 0) {
                fetch(`https://xosstech.com/cvm/api/public/api/info/update/${personalInfoData.id}`, {
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
                            // document.getElementById("personal_info_from").reset();
                        }
                    })
                    .catch((err) => {
                        console.log('error->', err);
                        // window.location.href = "/login.html";
                    });
            } else {
                fetch("https://xosstech.com/cvm/api/public/api/info", {
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
                            // document.getElementById("personal_info_from").reset();
                            alert('Data has been successfully created');
                        }
                    })
                    .catch((err) => {
                        console.log('error->', err);
                        // window.location.href = "/login.html";
                    });
            }
        });
    }

}).catch((err) => console.log('error', err))
