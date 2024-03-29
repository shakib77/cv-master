let personalImage = ''

fetch('https://xosstech.com/cvm/api/public/api/infos', {
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
        if (jsonRes.data && jsonRes.data.length > 0) {
            let personalInfoLength = jsonRes.data.length;
            let personalInfoData = jsonRes.data[personalInfoLength - 1];

            personalImage = personalInfoData.image


            /*console.log('dbod->',personalInfoData.dob);

            function padTo2Digits(num) {
                return num.toString().padStart(2, '0');
            }

            console.log('logdd->', padTo2Digits(personalInfoData.dob.slice(0, 2)));*/

            document.getElementById('info_id').value = personalInfoData.id;
            document.getElementById('name').value = personalInfoData.name;
            document.getElementById('email').value = personalInfoData.email;
            document.getElementById('mobile').value = personalInfoData.mobile;
            document.getElementById('present_address').value = personalInfoData.present_address;
            document.getElementById('permanent_address').value = personalInfoData.permanent_address;
            document.getElementById('job_title').value = personalInfoData.job_title;
            document.getElementById('marital_status').value = personalInfoData.marital_status;
            document.getElementById('religion').value = personalInfoData.religion;
            document.getElementById('nationality').value = personalInfoData.nationality;
            document.getElementById('gender').value = personalInfoData.gender;
            document.getElementById('dob').value = personalInfoData.dob.split("-").reverse().join("-");
            document.getElementById('father_name').value = personalInfoData.father_name;
            document.getElementById('mother_name').value = personalInfoData.mother_name;
            document.getElementById('profile_summary').value = personalInfoData.profile_summary;
            document.getElementById('image').file = personalInfoData.image;
        }
    }

}).catch((err) => console.log('error=>', err))

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const savePersonalInfo = () => {
    let id = null;
    if (document.getElementById('info_id').value) {
        id = document.getElementById('info_id').value;
    }

    let file = document.getElementById("image").files[0];
    let imageFile = '';
    if (file) {
        getBase64(file).then(
            data => {
                imageFile = data
            }
        );
    } else {
        imageFile = personalImage;
    }

    const formData = {
        name: document.getElementById("name").value,
        mobile: document.getElementById("mobile").value,
        email: document.getElementById("email").value,
        present_address: document.getElementById("present_address").value,
        permanent_address: document.getElementById("permanent_address").value,
        job_title: document.getElementById("job_title").value,
        marital_status: document.getElementById("marital_status").value,
        religion: document.getElementById("religion").value,
        nationality: document.getElementById("nationality").value,
        gender: document.getElementById("gender").value,
        dob: document.getElementById("dob").value.split("-").reverse().join("-"),
        profile_summary: document.getElementById("profile_summary").value,
        father_name: document.getElementById("father_name").value,
        mother_name: document.getElementById("mother_name").value,
    };

    setTimeout(apiCall, 2000);

    function apiCall () {
        formData.image = imageFile;

        // fileInput.files[0], "file")
        /*const formData = new FormData();
        formData.append("name", document.getElementById("name").value);
        formData.append("image", document.getElementById("image").files[0]);
        formData.append("mobile", document.getElementById("mobile").value);
        formData.append("email", document.getElementById("email").value);
        formData.append("present_address", document.getElementById("present_address").value);
        formData.append("permanent_address", document.getElementById("permanent_address").value);
        formData.append("job_title", document.getElementById("job_title").value);
        formData.append("marital_status", document.getElementById("marital_status").value);
        formData.append("religion", document.getElementById("religion").value);
        formData.append("nationality", document.getElementById("nationality").value);
        formData.append("gender", document.getElementById("gender").value);
        formData.append("dob", document.getElementById("dob").value);
        formData.append("profile_summary", document.getElementById("profile_summary").value);
        formData.append("father_name", document.getElementById("father_name").value);
        formData.append("mother_name", document.getElementById("mother_name").value);*/

        // console.log('sdfd->', document.getElementById("dob").value.split("-").reverse().join("-"));

        fetch(id ? `https://xosstech.com/cvm/api/public/api/info/update/${id}` : 'https://xosstech.com/cvm/api/public/api/info', {
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
                    alert(id ? 'Data has been successfully updated' : 'Data has been successfully submitted');
                    // document.getElementById("personal_info_from").reset();
                }
            })
            .catch((err) => {
                console.log('error->', err);
                // window.location.href = "/login.html";
            });
    }
}
