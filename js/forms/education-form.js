const educationFormDiv = `<form id="education_from" class="education_from_cls">
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="inst_name">Institute name</label>
                                        <input type="text" class="form-control" id="inst_name" name="inst_name"
                                               placeholder="Write institute name...">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="degree">Degree</label>
                                        <input type="text" class="form-control" id="degree" name="degree"
                                               placeholder="Write your degree...">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="dept">Department</label>
                                        <input type="text" class="form-control" id="dept" name="dept"
                                               placeholder="Write department...">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="pass_year">Passing year</label>
                                        <input placeholder="Selected passing year" type="date" id="pass_year"
                                               class="form-control datepicker">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="result">Result</label>
                                        <input type="number" class="form-control" id="result"
                                               name="result"
                                               placeholder="Ex: 5.00">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="board">Board</label>
                                        <input type="text" class="form-control" id="board"
                                               name="board"
                                               placeholder="Board..">
                                    </div>
                                </div>

                            </div>

                            <div class="mb-4">
                               
                                <button type="button" class="top-button top-button-q-pre" onclick="deleteEducation()">
                                    Delete
                                </button>
                                <button type="submit" class="top-button top-button-q-pre float-right">Save</button>
                            </div>
                            <hr>
                        </form>
`

const addEducation = () => {
    let selector = document.getElementById('education_div')
    let temp = document.createElement('div')
    temp.innerHTML += projectFormDiv;
    selector.appendChild(temp.children[0])
    // selector.parentElement.innerHTML += selector.outerHTML;
}

const deleteEducation = () => {
    $('.education_from_cls').on('click', function () {
        // $(this).parent('div.education_div').remove();
        $(this).remove();
    });
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
                $(div.children[i]).find('[name="dept"]').val(educationInfo.dept);
                $(div.children[i]).find('[name="pass_year"]').val(educationInfo.pass_year);
                $(div.children[i]).find('[name="result"]').val(educationInfo.result);
                $(div.children[i]).find('[name="board"]').val(educationInfo.board);
                $(div.children[i]).find('[name="location"]').val(educationInfo.location);
                $(div.children[i]).find('[name="work_summary"]').val(educationInfo.work_summary);
                $(div.children[i]).find('[name="degree"]').val(educationInfo.degree);
                $(div.children[i]).find('[name="inst_name"]').val(educationInfo.inst_name);
            })
        }

        const educationForm = document.getElementById("education_from");
        educationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = {
                inst_name: e.target.elements["inst_name"].value,
                degree: e.target.elements["degree"].value,
                dept: e.target.elements["dept"].value,
                pass_year: e.target.elements["pass_year"].value,
                result: e.target.elements["result"].value,
                board: e.target.elements["board"].value,
            };

            if (educationInfoData && educationInfoLength > 0) {
                fetch(`https://xosstech.com/cvm/api/public/api/education/update/${educationInfoLength.id}`, {
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
                            alert('Data has been successfully updated');
                            // document.getElementById("education_from").reset();
                        }
                    })
                    .catch((err) => {
                        console.log('error->', err);
                        // window.location.href = "/login.html";
                    });
            } else {
                fetch("https://xosstech.com/cvm/api/public/api/education", {
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
                            // document.getElementById("education_from").reset();
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

