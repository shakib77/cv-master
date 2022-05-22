const addEducation = () => {
    let selector = document.getElementById('education_div')
    selector.parentElement.innerHTML += selector.outerHTML;
}

const deleteEducation = ()=> {
    $('.education_from_cls').on('click',function(){
        $(this).parent('div.education_div').remove();
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
        let educationInfoData = jsonRes.data[educationInfoLength - 1];

        document.getElementById('dept').value = educationInfoData.dept;
        document.getElementById('pass_year').value = educationInfoData.pass_year;
        document.getElementById('result').value = educationInfoData.result;
        document.getElementById('board').value = educationInfoData.board;
        document.getElementById('location').value = educationInfoData.location;
        document.getElementById('work_summary').value = educationInfoData.work_summary;
        document.getElementById('degree').value = educationInfoData.degree;
        document.getElementById('inst_name').value = educationInfoData.inst_name;

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

