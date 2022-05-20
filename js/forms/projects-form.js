fetch('https://xosstech.com/cvm/api/public/api/projects', {
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
        let projectInfoLength = jsonRes.data.length;
        let projectInfoData = jsonRes.data[projectInfoLength - 1];

        document.getElementById('project_name').value = projectInfoData.project_name;
        document.getElementById('project_summary').value = projectInfoData.project_summary;
        document.getElementById('project_start').value = projectInfoData.start;
        document.getElementById('project_end').value = projectInfoData.end;

        const projectsForm = document.getElementById("projects_from");
        projectsForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = {
                project_name: e.target.elements["project_name"].value,
                start: e.target.elements["project_start"].value,
                end: e.target.elements["project_end"].value,
                project_summary: e.target.elements["project_summary"].value,
            };

            if (projectInfoData && projectInfoLength > 0) {
                fetch(`https://xosstech.com/cvm/api/public/api/project/update/${projectInfoData.id}`, {
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
                            alert('Data has been successfully updated');
                            // document.getElementById("projects_from").reset();
                        }
                    })
                    .catch((err) => {
                        console.log('error->', err);
                        // window.location.href = "/login.html";
                    });
            } else {
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
                            alert('Data has been successfully created');
                            // document.getElementById("projects_from").reset();
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
