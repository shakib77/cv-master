let projectInfo_form_data = [];

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
        projectInfo_form_data = jsonRes.data;
        let projectInfoData = jsonRes.data[0];

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

let projectForm = '';
let projectFormSegment = `
        <form id="projects_from">
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="project_name">Project name</label>
                                        <input type="text" class="form-control" id="project_name" name="project_name"
                                               placeholder="Write project name...">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="project_start">Start date</label>
                                        <input placeholder="Selected start date" type="date" id="project_start"
                                               class="form-control datepicker">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="project_end">End date</label>
                                        <input placeholder="Selected end date" type="date" id="project_end"
                                               class="form-control datepicker">
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="project_summary">Project summary</label>
                                        <textarea class="form-control" id="project_summary" rows="4"
                                                  placeholder="Write work summery..."></textarea>
                                    </div>
                                </div>

                            </div>

                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>`;

projectInfo_form_data.map((data) => {
    return projectForm += projectFormSegment;
})
// projectForm += projectFormSegment; //todo: it will be in loop

let projectFormContainer = document.querySelector('.project_form_div');
projectFormContainer.innerHTML = projectForm;


