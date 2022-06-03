const workExperienceFormDiv = `<form id="work_experience_from" class="work_experience_from_cls">
                            <div class="row">
                                <div class="col-6 d-none">
                                    <div class="form-group">
                                        <label for="company_id">Company id</label>
                                        <input type="text" class="form-control" name="company_id"
                                               placeholder="Write your company id...">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="company_name">Company name</label>
                                        <input type="text" class="form-control" name="company_name"
                                               placeholder="Write your company name...">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="position">Position</label>
                                        <input type="text" class="form-control" name="position"
                                               placeholder="Write your position...">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="start">Start From</label>
                                        <input type="text" class="form-control" name="start"
                                               placeholder="Write Start date...">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="end">End at</label>
                                        <input type="text" class="form-control" name="end"
                                               placeholder="Write end date...">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="location">Location</label>
                                        <input type="text" class="form-control"
                                               name="location"
                                               placeholder="Enter location...">
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="work_summary">Work summary</label>
                                        <textarea class="form-control" name="work_summary" rows="4"
                                                  placeholder="Write work summery..."></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-4">
                                <button type="button" class="top-button top-button-q-pre"
                                        onclick="deleteWorkExperience(event)">
                                    Delete
                                </button>
                                <button type="button" class="top-button top-button-q-pre float-right" onclick="createUpdateWorkExp(event)">Save</button>
                            </div>
                            <hr>
                        </form>`;

const addWorkExperience = () => {
    let selector = document.getElementById('work_experience_div')
    let temp = document.createElement('div')
    temp.innerHTML += workExperienceFormDiv;
    selector.appendChild(temp.children[0]);
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

                $(div.children[i]).find('[name="company_id"]').val(workExperienceInfo.id);
                $(div.children[i]).find('[name="company_name"]').val(workExperienceInfo.company_name);
                $(div.children[i]).find('[name="position"]').val(workExperienceInfo.position);
                $(div.children[i]).find('[name="start"]').val(workExperienceInfo.start);
                $(div.children[i]).find('[name="end"]').val(workExperienceInfo.end);
                $(div.children[i]).find('[name="location"]').val(workExperienceInfo.location);
                $(div.children[i]).find('[name="work_summary"]').val(workExperienceInfo.work_summary);
            })
        }
    }

}).catch((err) => console.log('error', err));

const createUpdateWorkExp = (e) => {
    let form = $(e.target).parent().parent();
    let id = form.find('[name="company_id"]').val();
    console.log('id i->', id);

    const formData = {
        company_name: form.find('[name="company_name"]').val(),
        position: form.find('[name="position"]').val(),
        start: form.find('[name="start"]').val(),
        end: form.find('[name="end"]').val(),
        work_summary: form.find('[name="work_summary"]').val(),
        location: form.find('[name="location"]').val(),
    };

    fetch(id ? `https://xosstech.com/cvm/api/public/api/experience/update/${id}` : 'https://xosstech.com/cvm/api/public/api/experience', {
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
                alert(id ? 'Data has been successfully updated' : 'Data has been successfully submitted');
            }
        })
        .catch((err) => {
            console.log('error->', err);
            // window.location.href = "/login.html";
        });

}

const deleteWorkExperience = (e) => {
    let form = $(e.target).parent().parent();
    let id = form.find('[name="company_id"]').val();
    console.log('id ief->', id);

    if (id) {
        fetch(`https://xosstech.com/cvm/api/public/api/experience/delete/${id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: bearer,
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

                    $('.work_experience_from_cls').on('click', function () {
                        // $(this).parent('div.work_experience_div').remove();
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
        $('.work_experience_from_cls').on('click', function () {
            // $(this).parent('div.work_experience_div').remove();
            $(this).remove();
        });
    }
}
