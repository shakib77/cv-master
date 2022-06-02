const educationFormDiv = `<form id="education_from" class="education_from_cls">
                            <div class="row">
                                <div class="col-6 d-none">
                                    <div class="form-group">
                                        <label for="inst_id">Institute ID</label>
                                        <input type="text" class="form-control" name="inst_id"
                                               placeholder="Write inst id...">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="inst_name">Institute name</label>
                                        <input type="text" class="form-control" name="inst_name"
                                               placeholder="Write institute name...">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="degree">Degree</label>
                                        <input type="text" class="form-control" name="degree"
                                               placeholder="Write your degree...">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="dept">Department</label>
                                        <input type="text" class="form-control" name="dept"
                                               placeholder="Write department...">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="pass_year">Passing year</label>
                                        <input placeholder="Selected passing year" type="date" name="pass_year"
                                               class="form-control datepicker">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="result">Result</label>
                                        <input type="number" class="form-control"
                                               name="result"
                                               placeholder="Ex: 5.00">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="board">Board</label>
                                        <input type="text" class="form-control"
                                               name="board"
                                               placeholder="Board..">
                                    </div>
                                </div>

                            </div>

                            <div class="mb-4">
                               
                                <button type="button" class="top-button top-button-q-pre" onclick="deleteEducation(event)">
                                    Delete
                                </button>
                                <button type="button" class="top-button top-button-q-pre float-right" onclick="addUpdateEducation(event)">Save</button>
                            </div>
                            <hr>
                        </form>
                        `;

const addEducation = () => {
    let selector = document.getElementById('education_div')
    let temp = document.createElement('div')
    temp.innerHTML += educationFormDiv;
    selector.appendChild(temp.children[0])
    // selector.parentElement.innerHTML += selector.outerHTML;
}

fetch('https://xosstech.com/cvm/api/public/api/educations', {
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
        let educationInfoLength = jsonRes.data.length;
        let educationInfoData = jsonRes.data;

        let educationInfoForm = '';
        let educationInfoFormSegment = educationInfoData.map((educationInfoForm) => {
            return (educationFormDiv)
        }).join('');

        educationInfoForm += educationInfoFormSegment;
        let educationInfoFormContainer = document.querySelector('.education_div');
        educationInfoFormContainer.innerHTML = educationInfoForm;

        if (educationInfoData && educationInfoLength > 0) {
            educationInfoData.forEach((educationInfo, i) => {
                let div = document.getElementById('education_div')
                $(div.children[i]).find('[name="inst_id"]').val(educationInfo.id);
                $(div.children[i]).find('[name="inst_name"]').val(educationInfo.inst_name);
                $(div.children[i]).find('[name="degree"]').val(educationInfo.degree);
                $(div.children[i]).find('[name="dept"]').val(educationInfo.dept);
                $(div.children[i]).find('[name="pass_year"]').val(educationInfo.pass_year);
                $(div.children[i]).find('[name="result"]').val(educationInfo.result);
                $(div.children[i]).find('[name="board"]').val(educationInfo.board);
            })
        }
    }
}).catch((err) => console.log('error', err));

const addUpdateEducation = (e) => {
    let form = $(e.target).parent().parent();
    let id = form.find('[name="inst_id"]').val();

    const formData = {
        inst_name: form.find('[name="inst_name"]').val(),
        degree: form.find('[name="degree"]').val(),
        dept: form.find('[name="dept"]').val(),
        pass_year: form.find('[name="pass_year"]').val(),
        result: form.find('[name="result"]').val(),
        board: form.find('[name="board"]').val(),
    };

    fetch(id ? `https://xosstech.com/cvm/api/public/api/education/update/${id}` : `https://xosstech.com/cvm/api/public/api/education`, {
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
                alert(id ? 'Data has been successfully updated' : 'Data has been successfully created');
                // document.getElementById("education_from").reset();
            }
        })
        .catch((err) => {
            console.log('error->', err);
            // window.location.href = "/login.html";
        });
}

const deleteEducation = (e) => {
    let form = $(e.target).parent().parent();
    let id = form.find('[name="inst_id"]').val();

    if (id) {
        fetch(`https://xosstech.com/cvm/api/public/api/education/delete/${id}`, {
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

                    $('.education_from_cls').on('click', function () {
                        // $(this).parent('div.education_div').remove();
                        $(this).remove();
                    });
                }
            })
            .catch((err) => {
                console.log('error->', err);
                // window.location.href = "/login.html";
            });
    } else {
        $('.education_from_cls').on('click', function () {
            // $(this).parent('div.education_div').remove();
            $(this).remove();
        });
    }
}
