const projectFormDiv = `<form id="projects_from" class="project_from_cls">
                            <div class="row">
                                <div class="col-6 d-none">
                                    <div class="form-group">
                                        <label for="project_id">Project ID</label>
                                        <input type="text" class="form-control" name="project_id"
                                               placeholder="Write project id...">
                                    </div>
                                </div>
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
                                               class="form-control datepicker" name="project_start">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="project_end">End date</label>
                                        <input placeholder="Selected end date" type="date" id="project_end"
                                               class="form-control datepicker" name="project_end">
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="project_summary">Project summary</label>
                                        <textarea class="form-control" id="project_summary" name="project_summary" rows="4"
                                                  placeholder="Write work summery..."></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-4">
                                <button type="button" class="top-button top-button-q-pre" onclick="deleteProject(event)">
                                    Delete
                                </button>
                                <button type="button" class="top-button top-button-q-pre float-right" onclick="addUpdateProject(event)">Save</button>
                            </div>
                            <hr>
                        </form>`;

const addProject = () => {
    let selector = document.getElementById('project_div')
    let temp = document.createElement('div')
    temp.innerHTML += projectFormDiv;
    selector.appendChild(temp.children[0])
    // selector.parentElement.innerHTML += selector.outerHTML;
}

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
        let projectInfoData = jsonRes.data;

        let projectInfoForm = '';
        let projectInfoFormSegment = projectInfoData.map((projectInfoForm) => {
            return (projectFormDiv)
        }).join('');

        projectInfoForm += projectInfoFormSegment;
        let projectInfoFormContainer = document.querySelector('.project_div');
        projectInfoFormContainer.innerHTML = projectInfoForm;

        if (projectInfoData && projectInfoLength > 0) {
            projectInfoData.forEach((projectInfo, i) => {
                let div = document.getElementById('project_div')
                $(div.children[i]).find('[name="project_id"]').val(projectInfo.id);
                $(div.children[i]).find('[name="project_name"]').val(projectInfo.project_name);
                $(div.children[i]).find('[name="project_summary"]').val(projectInfo.project_summary);
                $(div.children[i]).find('[name="project_start"]').val(projectInfo.start);
                $(div.children[i]).find('[name="project_end"]').val(projectInfo.end);

            })
        }
    }

}).catch((err) => console.log('error', err));

const addUpdateProject = (e) => {
    let form = $(e.target).parent().parent();
    let id = form.find('[name="project_id"]').val();

    const formData = {
        project_name: form.find('[name="project_name"]').val(),
        start: form.find('[name="project_start"]').val(),
        end: form.find('[name="project_end"]').val(),
        project_summary: form.find('[name="project_summary"]').val(),
    };

    fetch(id ? `https://xosstech.com/cvm/api/public/api/project/update/${id}` : `https://xosstech.com/cvm/api/public/api/project`, {
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
                alert(id ? 'Data has been successfully updated' : 'Data has been successfully submitted');
                // document.getElementById("projects_from").reset();
            }
        })
        .catch((err) => {
            console.log('error->', err);
            // window.location.href = "/login.html";
        });
}

const deleteProject = (e) => {
    let form = $(e.target).parent().parent();
    let id = form.find('[name="project_id"]').val();

    if (id) {
        fetch(`https://xosstech.com/cvm/api/public/api/project/delete/${id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json", Authorization: bearer,
            },
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
                    console.log('delete jsonRes.success->', jsonRes);
                    alert('Data has been successfully deleted');
                    $('.project_from_cls').on('click', function () {
                        // console.log('thisdfdf->', $("#project_id").val());
                        $(this).remove();
                    });
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log('error->', err);
                // window.location.href = "/login.html";
            });
    } else {
        $('.project_from_cls').on('click', function () {
            // console.log('thisdfdf->', $("#project_id").val());
            $(this).remove();
        });
    }
}
