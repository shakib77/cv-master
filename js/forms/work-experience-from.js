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
                document.getElementById("work_experience_from").reset();
            }
        })
        .catch((err) => {
            console.log('error->', err);
            // window.location.href = "/login.html";
        });
});