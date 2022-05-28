const workExperienceFormDiv = `<form id="work_experience_from" class="work_experience_from_cls">
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="company_name">Company name</label>
                                        <input type="text" class="form-control" id="company_name" name="company_name"
                                               placeholder="Write your company name...">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="position">Position</label>
                                        <input type="text" class="form-control" id="position" name="position"
                                               placeholder="Write your position...">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="start">Start From</label>
                                        <input type="text" class="form-control" id="start" name="start"
                                               placeholder="Write Start date...">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="end">End at</label>
                                        <input type="text" class="form-control" id="end" name="end"
                                               placeholder="Write end date...">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="location">Location</label>
                                        <input type="text" class="form-control" id="location"
                                               name="location"
                                               placeholder="Enter location...">
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="work_summary">Work summary</label>
                                        <textarea class="form-control" id="work_summary" name="work_summary" rows="4"
                                                  placeholder="Write work summery..."></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-4">
                                <button type="button" class="top-button top-button-q-pre"
                                        onclick="deleteWorkExperience()">
                                    Delete
                                </button>
                                <button type="submit" class="top-button top-button-q-pre float-right">Save</button>
                            </div>
                            <hr>
                        </form>`;

const addWorkExperience = () => {
    let selector = document.getElementById('work_experience_div')
    let temp = document.createElement('div')
    temp.innerHTML += workExperienceFormDiv;

    selector.appendChild(temp.children[0]);
}

const deleteWorkExperience = () => {
    $('.work_experience_from_cls').on('click', function () {
        $(this).parent('div.work_experience_div').remove();
    });
}

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
        let workExperienceInfoLength = jsonRes.data.length;
        let workExperienceInfoData = jsonRes.data;

        let workExperienceInfoForm = '';
        let workExperienceInfoFormSegment = workExperienceInfoData.map((workExperienceInfoForm) => {
            return (workExperienceFormDiv)
        }).join('');

        workExperienceInfoForm += workExperienceInfoFormSegment;
        let workExperienceInfoFormContainer = document.querySelector('.work_experience_div');
        workExperienceInfoFormContainer.innerHTML = workExperienceInfoForm;

        if (workExperienceInfoData && workExperienceInfoLength > 0) {
            workExperienceInfoData.forEach((workExperienceInfo, i) => {
                let div = document.getElementById('work_experience_div')
                $(div.children[i]).find('[name="company_name"]').val(workExperienceInfo.company_name);
                $(div.children[i]).find('[name="position"]').val(workExperienceInfo.position);
                $(div.children[i]).find('[name="start"]').val(workExperienceInfo.start);
                $(div.children[i]).find('[name="end"]').val(workExperienceInfo.end);
                $(div.children[i]).find('[name="location"]').val(workExperienceInfo.location);
                $(div.children[i]).find('[name="work_summary"]').val(workExperienceInfo.work_summary);

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

                    if (workExperienceInfo.id) {
                        fetch(`https://xosstech.com/cvm/api/public/api/experience/update/${workExperienceInfo.id}`, {
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
                                    // document.getElementById("work_experience_from").reset();
                                    alert('Data has been successfully updated');
                                }
                            })
                            .catch((err) => {
                                console.log('error->', err);
                                // window.location.href = "/login.html";
                            });
                    } else { //todo: this is not correct
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
                                    alert('Data has been successfully created');
                                    // document.getElementById("work_experience_from").reset();
                                }
                            })
                            .catch((err) => {
                                console.log('error->', err);
                                // window.location.href = "/login.html";
                            });
                    }

                });
            })
        }
    }

}).catch((err) => console.log('error', err));
