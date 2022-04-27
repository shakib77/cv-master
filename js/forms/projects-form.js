// todo: not implemented yet for key space
fetch('https://xosstech.com/cvm/api/public/api/project', {
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
        let projectInfoData = jsonRes.data[0];

        document.getElementById('dept').value = projectInfoData.dept;
        document.getElementById('pass_year').value = projectInfoData.pass_year;
        document.getElementById('result').value = projectInfoData.result;
        document.getElementById('board').value = projectInfoData.board;
        document.getElementById('location').value = projectInfoData.location;
        document.getElementById('work_summary').value = projectInfoData.work_summary;
        document.getElementById('degree').value = projectInfoData.degree;
        document.getElementById('inst_name').value = projectInfoData.inst_name;
    }

}).catch((err) => console.log('error', err));


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
