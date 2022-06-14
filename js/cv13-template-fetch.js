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
            let references = data?.references_data?.references
            let workExperience = data?.experiences_data?.experiences
            let education = data?.education_data?.education;
            let trainings = data?.trainings_data?.trainings
            let projects = data?.projects_data?.projects

            userId = personalInfo?.user_id;

            let contactInfo = '';
            let contactInfoSegment = `
                <p class="p5" style="color: #F1F0F2;padding-top: 20px; padding-left: 63px; font-size: 14px;"><i class="fa fa-phone" aria-hidden="true" style="font-size: 14px; color: #F1F0F2;"></i>&nbsp;&nbsp;&nbsp;${personalInfo.mobile}</p>
                <hr style="border: 1px solid #F1F0F2; margin-top: -7px; width: 204px; margin-left: 63px;">
                <p class="p5" style="color: #F1F0F2; margin-top: -5px; margin-left: 63px; font-size: 14px;"><i class="fa fa-envelope" aria-hidden="true" style="font-size: 14px; color: #F1F0F2;"></i>&nbsp;&nbsp;&nbsp;${personalInfo.email}</p>
                <hr style="border: 1px solid #F1F0F2; margin-top: -7px; width: 204px; margin-left: 63px;">
                <p class="p5" style="color: #F1F0F2; margin-top: -5px; margin-left: 63px; font-size: 14px;"><i class="fa fa-map-marker" aria-hidden="true" style="font-size: 14px; color: #F1F0F2;"></i>&nbsp;&nbsp;&nbsp;${personalInfo.present_address}</p>`;

            contactInfo += contactInfoSegment;
            let contactInfoContainer = document.querySelector('.bg1');
            contactInfoContainer.innerHTML = contactInfo;

            let educationInfo = '';
            let educationInfoSegment = education.map((education, index) => {
                return (`
                <div class="head1">${education.degree}</div>
                <div class="skill_name1">${education.inst_name}</div>
                <div class="skill_name1">${education.pass_year}</div>
                 `)
            }).join('');

            educationInfo += educationInfoSegment;
            let educationInfoContainer = document.querySelector('.education_info');
            educationInfoContainer.innerHTML = educationInfo;

            let profileSkills = '';
            let profileSkillsSegment = `<li>
                                ${additionalInfo.skills}
                        </li>`;

            profileSkills += profileSkillsSegment;
            let profileSkillsContainer = document.querySelector('.skills');
            profileSkillsContainer.innerHTML = profileSkills;

            let reference = '';
            let referenceSegment = references.map((reference) => {
                return (`
                                <ul class="ref">
                                    <li>
                                        <div class="p6">
                                            <p>${reference.name}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="p3">
                                            <p>${reference.designation}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="p3">
                                            <p>${reference.organization}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="p3">
                                            <p>${reference.email}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="p3">
                                            <p>${reference.mobile}
                                        </div>
                                    </li>
                                </ul>
                                <br>`)
            }).join('');

            reference += referenceSegment;
            let referenceContainer = document.querySelector('.reference');
            referenceContainer.innerHTML = reference;

            let trainingInfo = '';
            let trainingInfoSegment = trainings.map((training) => {
                return (
                    `
                    <ul class="ref">
                      <li>
                        <div class="head1">
                          <p>${training.training_name}</p>
                        </div>
                      </li>
                     
                      <li>
                        <div class="p3">
                          <p>${training.end}</p>
                        </div>
                      </li>
                    </ul>
                    <br>
               `
                )
            }).join('');

            trainingInfo += trainingInfoSegment;
            let trainingInfoContainer = document.querySelector('.training');
            trainingInfoContainer.innerHTML = trainingInfo;

            let profileImage = '';
            let image = personalInfo.image
            let profileImageSegment = `
            <img src='${image ? image : ''}' alt="profile_pic">`;

            profileImage += profileImageSegment;
            let profileImageContainer = document.querySelector('.img_left');
            profileImageContainer.innerHTML = profileImage;

            let profileName = '';
            let name = personalInfo.name
            let profileNameSegment = `
            <p class="head21">${name}</p>
            <p class="p7">${personalInfo.job_title}</p>`;

            profileName += profileNameSegment;
            let profileNameContainer = document.querySelector('.text_right');
            profileNameContainer.innerHTML = profileName;

            let profileSummary = '';
            let profileSummarySegment = `<p class="p8" style="font-size: 12px; line-height: 2;">${personalInfo.profile_summary}</p>`;

            profileSummary += profileSummarySegment;
            let profileSummaryContainer = document.querySelector('.pro_summery');
            profileSummaryContainer.innerHTML = profileSummary;

            let jobExperience = '';
            let jobExperienceSegment = workExperience.map((workExperience) => {
                return (
                    `
                    <div class="head112">${workExperience.position}</div>
                    <div class="skill_name2">${workExperience.company_name}</div>
                    <div class="skill_name23"><i class="fa fa-minus" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;${workExperience.work_summary}
                    </div>`
                )
            }).join('')


            jobExperience += jobExperienceSegment;
            let jobExperienceContainer = document.querySelector('.work_experience');
            jobExperienceContainer.innerHTML = jobExperience;

            let projectInfo = '';
            let projectInfoSegment = projects.map((project) => {
                return (`
                    <div class="head112">${project.project_name}</div>
                    <div class="skill_name2">${project.start} - ${project.end}</div>
                    <div class="skill_name23">${project.project_summary}</div>
                 `)
            }).join('');

            projectInfo += projectInfoSegment;
            let projectInfoContainer = document.querySelector('.project_info');
            projectInfoContainer.innerHTML = projectInfo;
        }
    })
    .catch((err) => {
        console.log('error->', err);
        // window.location.href = "/login.html";
    });

let cv13Obj = {};

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

    cv13Obj = jsonRes?.cv[2];

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
            console.log('jsonRes.data.status->', jsonRes.data.status);
            if (jsonRes.data.status === 'Success') {
                $(".water-mark").hide();
                createPdfFromHtmlCv13();
            }
        }).catch((err) => console.log('error', err));

        setTimeout(nagadPaymentGet, 3000);
}

const nagadPayment = () => {
    let nagadFormData = new FormData();
    nagadFormData.append('amount', cv13Obj?.price);
    nagadFormData.append('user_id', userId);
    nagadFormData.append('cv_id', cv13Obj?.id);

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
    const charge = cv13Obj?.price;

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
                createPdfFromHtmlCv13();
            }

        })
}

const onClickBdApps = () => {
    $('.mobile_no').toggle("slide");
}
