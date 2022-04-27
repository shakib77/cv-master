fetch('http://xosstech.com/cvm/api/public/api/experiences', {
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
        let workExperienceInfoData = jsonRes.data[0];

        document.getElementById('company_name').value = workExperienceInfoData.company_name;
        document.getElementById('position').value = workExperienceInfoData.position;
        document.getElementById('start').value = workExperienceInfoData.start;
        document.getElementById('end').value = workExperienceInfoData.end;
        document.getElementById('location').value = workExperienceInfoData.location;
        document.getElementById('work_summary').value = workExperienceInfoData.work_summary;
    }

}).catch((err) => console.log('error', err));


const workExperienceForm = document.getElementById("work_experience_from");
workExperienceForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
        company_name: e.target.elements["company_name"].value,
        position: e.target.elements["position"].value,
        start: e.target.elements["start"].value,
        end: e.target.elements["end"].value,
        work_summary: e.target.elements["work_summary"].value,
        location: e.target.elements["location"].value,
    };

    fetch("https://xosstech.com/cvm/api/public/api/experience", {
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
                document.getElementById("work_experience_from").reset();
            }
        })
        .catch((err) => {
            console.log('error->', err);
            // window.location.href = "/login.html";
        });
});