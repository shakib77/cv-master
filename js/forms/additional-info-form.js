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
        let additionalInfoDataLength = jsonRes.data.length;
        let additionalInfoData = jsonRes.data[additionalInfoDataLength - 1];

        document.getElementById('skills_id').value = additionalInfoData.id;
        document.getElementById('skills').value = additionalInfoData.skills;
        document.getElementById('hobby').value = additionalInfoData.hobby;
        document.getElementById('language').value = additionalInfoData.language;
        document.getElementById('linkedin').value = additionalInfoData.linkedin;
        document.getElementById('twitter').value = additionalInfoData.twitter;
        document.getElementById('behance').value = additionalInfoData.behance;
        document.getElementById('github').value = additionalInfoData.github;
    }

}).catch((err) => console.log('error', err));

const saveAdditionalInfo = () => {
    const id = document.getElementById("skills_id").value;

    const formData = {
        skills: document.getElementById("skills").value,
        hobby: document.getElementById("hobby").value,
        language: document.getElementById("language").value,
        linkedin: document.getElementById("linkedin").value,
        github: document.getElementById("github").value,
        twitter: document.getElementById("twitter").value,
        behance: document.getElementById("behance").value,
    };

    fetch(id ? `https://xosstech.com/cvm/api/public/api/addition/update/${id}` : "https://xosstech.com/cvm/api/public/api/addition", {
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
                alert(id ? 'Data has been successfully updated': 'Data has been successfully submitted');
                // document.getElementById("additional_info_from").reset();
            }
        })
        .catch((err) => {
            console.log('error->', err);
            // window.location.href = "/login.html";
        });
}


