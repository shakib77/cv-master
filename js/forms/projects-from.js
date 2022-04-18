const projectsForm = document.getElementById("projects_from");
projectsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
        project_name: e.target.elements["project_name"].value,
        start: e.target.elements["project_start"].value,
        end: e.target.elements["project_end"].value,
        project_summary: e.target.elements["project_summary"].value,
    };

    fetch("https://xosstech.com/cvm/api/public/api/project", {
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
                // document.getElementById("projects_from").reset();
            }
        })
        .catch((err) => {
            console.log('error->', err);
            // window.location.href = "/login.html";
        });
});
