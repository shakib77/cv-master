let data = '';
let userId = '';

const myInit = {
    method: "POST",
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
            let reference = data?.references_data?.references
            let workExperience = data?.experiences_data?.experiences
            let education = data?.education_data?.education
            let trainings = data?.trainings_data?.trainings
            let projects = data?.projects_data?.projects

            userId = personalInfo?.user_id;

            let profileName = '';
            let profileNameSegment = `
                <h1 class="quickFade delayOne">${personalInfo.name}</h1>
                <p class="quickFade delayOne">${personalInfo.job_title}</p>
           `;

            profileName += profileNameSegment;
            let profileNameContainer = document.querySelector('.name_left');
            profileNameContainer.innerHTML = profileName;

            let profileImage = '';
            let image = personalInfo.image
            let profileImageSegment = `
            <img src='${image ? image : ''}' alt="profile_pic">`;

            profileImage += profileImageSegment;
            let profileImageContainer = document.querySelector('.name_right');
            profileImageContainer.innerHTML = profileImage;

            let profileSummary = '';
            let profileSummarySegment = `
                <p>
                    ${personalInfo.profile_summary}
                </p>
                <div class="clear"></div>
`;

            profileSummary += profileSummarySegment;
            let profileSummaryContainer = document.querySelector('.mainDetails1');
            profileSummaryContainer.innerHTML = profileSummary;

            let contactInfo = '';
            let contactInfoSegment = `<div class="title1">Contact Me</div>
                            <br>
                            <div class="title2">Mobile</div>
                            <p style="margin-bottom: 1px;">${personalInfo.mobile}</p>
                            <div class="title2">E-mail</div>
                            <p style="margin-bottom: 1px;">${personalInfo.email}</p>
                            <div class="title2">Address</div>
                            <p style="margin-bottom: 1px;">${personalInfo.present_address}</p>
                            <div class="title2">Birth Date</div>
                            <p style="margin-bottom: 1px;">${personalInfo.dob}</p>
                `;

            contactInfo += contactInfoSegment;
            let contactInfoContainer = document.querySelector('.contact_info');
            contactInfoContainer.innerHTML = contactInfo;

            let educationInfo = '';
            let educationInfoSegment = education.map((education) => {
                return (`<br>
                            <hr style="border: 1px solid #BEC2CE; position: absolute; width: 334px;">
                            <div class="body_right_right">
                                <div class="title1" style="font-weight: 200;">${education.pass_year}</div>
                            </div>
                            <br>
                            <div class="title3">${education.inst_name}</div>
                            <div class="title3">${education.degree}</div>
                            <p>Passed with CGPA&nbsp; ${education.result}</p>`)
            }).join('')

            educationInfo += educationInfoSegment;
            let educationInfoContainer = document.querySelector('.education_info');
            educationInfoContainer.innerHTML = educationInfo;

            let profileSkills = '';
            let profileSkillsSegment = `
                         
                             <span>
                                ${additionalInfo.skills}
                             </span>
                        `;

            profileSkills += profileSkillsSegment;
            let profileSkillsContainer = document.querySelector('.profile_skills');
            profileSkillsContainer.innerHTML = profileSkills;

            let language = '';
            let languageSegment = `
                             <span>
                                ${additionalInfo.language}
                             </span>
                        `;

            language += languageSegment;
            let languageContainer = document.querySelector('.language');
            languageContainer.innerHTML = language;

            let hobby = '';
            let hobbySegment = `
                             <span>
                                ${additionalInfo.hobby}
                             </span>
                        `;

            hobby += hobbySegment;
            let hobbyContainer = document.querySelector('.hobby');
            hobbyContainer.innerHTML = hobby;

            let experience_info = '';
            let experience_infoSegment = workExperience.map((workExperience) => {
                return (`
                                <br>
                                <hr style="border: 1px solid #BEC2CE; position: absolute; width: 334px;">
                                <div class="body_right_right">
                                    <div class="title1" style="font-weight: 200;">${workExperience.start} - ${workExperience.end}</div>
                                </div>
                                <br>
                                <div class="title3">${workExperience.company_name}</div>
                                <div class="title3">${workExperience.position}</div>
                                <p>${workExperience.work_summary}</p>
                                `)
            }).join('')

            experience_info += experience_infoSegment;
            let experience_infoContainer = document.querySelector('.experience_info');
            experience_infoContainer.innerHTML = experience_info;

            let trainingInfo = '';
            let trainingInfoSegment = trainings.map((training) => {
                return (`
<br>
                                <hr style="border: 1px solid #BEC2CE; position: absolute; width: 334px;">
                                <div class="body_right_right">
                                    <div class="title1" style="font-weight: 200;">${training.end}</div>
                                </div>
                                <br>
                                <p>${training.training_name}</p>
                 `)
            }).join('')

            trainingInfo += trainingInfoSegment;
            let trainingInfoContainer = document.querySelector('.training_info');
            trainingInfoContainer.innerHTML = trainingInfo;

            let projectInfo = '';
            let projectInfoSegment = projects.map((project) => {
                return (` <hr style="border: 1px solid #BEC2CE; position: absolute; width: 334px;">
                                <div class="body_right_right">
                                    <div class="title1" style="font-weight: 200;">${project.start} - ${project.end}</div>
                                </div>
                                <br>
                                <div class="title3">${project.project_name}</div>
                                <p>${project.project_summary}</p>
                 `)
            }).join('')

            projectInfo += projectInfoSegment;
            let projectInfoContainer = document.querySelector('.project_info');
            projectInfoContainer.innerHTML = projectInfo;
        }
    })
    .catch((err) => {
        console.log('error->', err);
        // window.location.href = "/login.html";
    });

let cv9Obj = {};

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

    cv9Obj = jsonRes?.cv[1];

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
    $('#payment_modal').modal('hide');
}

const nagadPaymentGet = () => {
        fetch('https://xosstech.com/cvm/api/public/api/nagadpayment', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: bearer,
            },
            mode: "cors",
            cache: "default",
        }).then((res) => {
            return res.json()
        }).then((jsonRes) => {
            if (jsonRes.data.status === 'Success') {
                $(".water-mark").hide();
                createPdfFromHtmlCv9();
            }
        }).catch((err) => console.log('error', err));

        setTimeout(nagadPaymentGet, 3000);
}

const nagadPayment = () => {
    let nagadFormData = new FormData();
    nagadFormData.append('amount', cv9Obj?.price);
    nagadFormData.append('user_id', userId);
    nagadFormData.append('cv_id', cv9Obj?.id);

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
            const url = jsonRes.match(/\bhttps?:\/\/\S+/gi)[0].replace(/","status":"Success"}/g, '');
            window.open(url, "_blank")
            nagadPaymentGet();
        }).catch((err) => console.log('err->', err))
}

const bdAppsPayment = () => {
    const userMobile = document.getElementById('user_mobile');
    const charge = cv9Obj?.price;

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

            if (jsonRes.response === 'charged_successfull') {
                createPdfFromHtmlCv9();
            }

        })
}

const onClickBdApps = () => {
    $('.mobile_no').toggle("slide");
}
