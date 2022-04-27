fetch('https://xosstech.com/cvm/api/public/api/additions', {
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
        let additionalInfoData = jsonRes.data[0];

        document.getElementById('skills').value = additionalInfoData.skills;
        document.getElementById('hobby').value = additionalInfoData.hobby;
        document.getElementById('language').value = additionalInfoData.language;
        document.getElementById('linkedin').value = additionalInfoData.linkedin;
        document.getElementById('twitter').value = additionalInfoData.twitter;
        document.getElementById('behance').value = additionalInfoData.behance;
        document.getElementById('github').value = additionalInfoData.github;
    }

}).catch((err) => console.log('error', err));

const additionalInfoForm = document.getElementById("additional_info_from");
additionalInfoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
        skills: e.target.elements["skills"].value,
        hobby: e.target.elements["hobby"].value,
        language: e.target.elements["language"].value,
        linkedin: e.target.elements["linkedin"].value,
        github: e.target.elements["github"].value,
        twitter: e.target.elements["twitter"].value,
        behance: e.target.elements["behance"].value,
    };

    fetch("https://xosstech.com/cvm/api/public/api/addition", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
        },
        body: JSON.stringify(formData),
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
                // document.getElementById("additional_info_from").reset();
            }
        })
        .catch((err) => {
            console.log('error->', err);
            // window.location.href = "/login.html";
        });
});
