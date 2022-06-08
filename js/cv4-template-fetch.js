// const token = localStorage.getItem("token")
//     ? localStorage.getItem("token")
//     : "";
//
// const bearer = "Bearer " + token;
// let isUserLoggedIn = false;
// if (token) isUserLoggedIn = true;

let data = '';

const myInit = {
    method: "POST", // withCredentials: true,
    // credentials: "include",
    headers: {
        "Content-Type": "application/json", Authorization: bearer, // cookie: document.cookie,
    }, mode: "cors", cache: "default",
};

fetch("https://xosstech.com/cvm/api/public/api/profileV2", myInit)
    .then((res) => {
        console.log(res);
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
            window.location.href = "login.html";
        } else {
            console.log('jsonRes.success->', jsonRes);
            data = jsonRes

            let personalInfoLength = data?.personal_infos_data?.personal_infos.length - 1
            let additionalInfoLength = data?.additonalInfos_data?.additonalInfos.length - 1
            let referenceLength = data?.additonalInfos_data?.additonalInfos.length - 1
            let workExperienceLength = data?.experiences_data?.experiences.length - 1
            let educationLength = data?.education_data?.education.length - 1
            let trainingsLength = data?.trainings_data?.trainings.length - 1
            let projectsLength = data?.projects_data?.projects.length - 1

            let personalInfo = data?.personal_infos_data?.personal_infos[personalInfoLength]
            let additionalInfo = data?.additonalInfos_data?.additonalInfos[additionalInfoLength]
            let references = data?.references_data?.references
            let workExperience = data?.experiences_data?.experiences
            let education = data?.education_data?.education;
            let trainings = data?.trainings_data?.trainings
            let projects = data?.projects_data?.projects

            let profile = '';
            let image = personalInfo.image
            let name = personalInfo.name
            let profileSegment = `
                <img src='${image ? image : ''}' class="photo" alt="Profile Picture">
                <div class="contact-info-box">
                    <h1 class="name">${name}</h1>
                    <br>
                    <p class="job-title">Address: ${personalInfo.present_address}</p>
                    <p class="job-title">Mobile: ${personalInfo.mobile}</p>
                    <p class="job-title">E-mail: ${personalInfo.email}</p>
                </div>
            `;

            profile += profileSegment;
            let profileContainer = document.querySelector('.photo-and-name');
            profileContainer.innerHTML = profile;

            let careerObjective = '';
            let careerObjectiveSegment = `
                <h3>Career Objective</h3>
                <p>${personalInfo.profile_summary}</p>`;

            careerObjective += careerObjectiveSegment;
            let careerObjectiveContainer = document.querySelector('.career_objective');
            careerObjectiveContainer.innerHTML = careerObjective;

            let educationInfo = '';
            let educationInfoSegment = education.map((education, index) => {
                return (`
                 <tr class="school-1">
                    <td>${education.degree}</td>
                    <td>${education.dept}</td>
                    <td>${education.inst_name}</td>
                    <td>${education.board}</td>
                    <td>${education.result}</td>
                    <td>${education.pass_year}</td>
                 </tr>
                `)
            }).join('');

            educationInfo += educationInfoSegment;
            let educationInfoContainer = document.querySelector('.education');
            educationInfoContainer.innerHTML = educationInfo;

            let profileSkills = '';
            let profileSkillsSegment = `<li>
                            <div class="skill">
                                ${additionalInfo.skills}
                            </div>
                        </li>`;

            profileSkills += profileSkillsSegment;
            let profileSkillsContainer = document.querySelector('.profile_skills');
            profileSkillsContainer.innerHTML = profileSkills;

            let languageProficiency = '';
            let languageProficiencySegment = `
                     <tr>
                        <td>${additionalInfo.language}</td>
                        <td>Good</td>
                    </tr>`;

            languageProficiency += languageProficiencySegment;
            let languageProficiencyContainer = document.querySelector('.language_proficiency');
            languageProficiencyContainer.innerHTML = languageProficiency;

            let personalDetails = '';
            let personalDetailsSegment = `
                    <li>
                        <div class="skill">Name<span class="s1">: &nbsp;&nbsp;${personalInfo.name}</span></div>
                    </li>
                    <li>
                        <div class="skill">Father's Name<span class="s2">: &nbsp;&nbsp;${personalInfo.father_name}</span></div>
                    </li>
                    <li>
                        <div class="skill">Mother's Name<span class="s3">: &nbsp;&nbsp;${personalInfo.mother_name}</span></div>
                    </li>
                    <li>
                        <div class="skill">Gender<span class="s4">: &nbsp;&nbsp;${personalInfo.gender}</span></div>
                    </li>
                    <li>
                        <div class="skill">Date of Birth<span class="s5">: &nbsp;&nbsp;${personalInfo.dob}</span></div>
                    </li>
                    <li>
                        <div class="skill">Marital Status<span class="s6">: &nbsp;&nbsp;${personalInfo.marital_status}</span></div>
                    </li>
                    <li>
                        <div class="skill">Nationality<span class="s7">: &nbsp;&nbsp;${personalInfo.nationality}</span></div>
                    </li>
                    <li>
                        <div class="skill">Religion<span class="s8">: &nbsp;&nbsp;${personalInfo.religion}</span></div>
                    </li>
                    <li>
                        <div class="skill">Present Address<span class="s9">: &nbsp;&nbsp;${personalInfo.present_address}</span></div>
                    </li>
                    <li>
                        <div class="skill">Permanent Address<span class="s10">: &nbsp;&nbsp;${personalInfo.permanent_address}</span></div>
                    </li>`;

            personalDetails += personalDetailsSegment;
            let personalDetailsContainer = document.querySelector('.personal_details');
            personalDetailsContainer.innerHTML = personalDetails;
        }
    })
    .catch((err) => {
        console.log('error->', err);
        // window.location.href = "/login.html";
    });

let cv4Obj = {};

fetch('https://xosstech.com/cvm/api/public/api/cv', {
    method: "GET", headers: {
        "Content-Type": "application/json",
    }, mode: "cors", cache: "default",
}).then((res) => {
    return res.json()
}).then((jsonRes) => {
    // console.log({jsonRes});
    if (!jsonRes.success) {
        return false;
    }

    cv4Obj = jsonRes?.cv[2];

}).catch((err) => console.log('error', err))


const onClickPay = () => {
    const radioValue = document.querySelector('input[name="payment_radio"]:checked').value;

    switch (radioValue) {
        case '1':
            nagadPayment();
            break;
        case '2':
            bdAppsPayment();
            break;
        default:
            alert('No template found!')
    }
}

const nagadPayment = () => {
    let nagadFormData = new FormData();
    nagadFormData.append('amount', cv4Obj?.price);

    $(".water-mark").hide();
    // createPdfFromHtmlCv2();

    fetch("https://xosstech.com/Payment/nagad/index.php", {
        method: "POST", mode: "cors", body: nagadFormData

    }).then((res) => {
        if (!res.ok) {
            throw Error("Could not fetch data for that resource!!!");
        } else {
            return res.text();
        }
    })
        .then((jsonRes) => {
            console.log('Nagad jsonRes =>', jsonRes);
            window.location.href = jsonRes.match(/\bhttps?:\/\/\S+/gi)[0].replace(/","status":"Success"}/g, '');

        }).catch((err) => console.log('err->', err))
}

const bdAppsPayment = () => {
    const userMobile = document.getElementById('user_mobile');
    const charge = cv4Obj?.price;

    const bdAppFormData = new FormData();
    bdAppFormData.append("user_mobile", userMobile.value);
    bdAppFormData.append("charge", charge);

    const bdAppSubscriptionData = new FormData();
    bdAppFormData.append("user_mobile", userMobile.value);

    fetch("https://xosstech.com/cvm/xossapp/cass.php", {
        method: "POST",
        mode: "cors",
        body: bdAppFormData,
        redirect: 'follow'

    }).then((res) => {
        console.log('res=>', res);
        if (!res.ok) {
            throw Error("Could not fetch data for that resource!!!");
        } else {
            return res.json();
        }
    })
        .then((jsonRes) => {
            console.log('jsonRes.success->', jsonRes.response);
            if (jsonRes.response === 'not_subscribe') {
                fetch("https://xosstech.com/cvm/xossapp/subscription.php", {
                    method: "POST",
                    mode: "cors",
                    body: bdAppSubscriptionData,
                    redirect: 'follow'

                }).then((res) => {
                    console.log('res=>', res);
                    if (!res.ok) {
                        throw Error("Could not fetch data for that resource!!!");
                    } else {
                        return res.json();
                    }
                })
                    .then((jsonRes) => {
                        console.log('jsonRes.success sub->', jsonRes.response);

                    })
            }

            if (jsonRes.response ==='charged_successfull')  {
                createPdfFromHtmlCv4();
            }

        })
}

const onClickBdApps = () => {
    $('.mobile_no').toggle("slide");
}
