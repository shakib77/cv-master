let data = '';
let userId = '';

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
        if (!jsonRes.success) {
            console.log('!jsonRes.success->', jsonRes);
            window.location.href = "login.html";
        } else {
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

            let profileImage = '';
            let image = personalInfo.image
            let profileImageSegment = `
            <img src='${image ? image : ''}' alt="profile_pic">`;

            profileImage += profileImageSegment;
            let profileImageContainer = document.querySelector('.profile_image');
            profileImageContainer.innerHTML = profileImage;

            let profileName = '';
            let name = personalInfo.name
            let profileNameSegment = `
            <p class="bold1">${name}</p>
            <p class="regular">${personalInfo.job_title}</p>`;

            profileName += profileNameSegment;
            let profileNameContainer = document.querySelector('.profile_name');
            profileNameContainer.innerHTML = profileName;

            let profileAddress = '';
            let profileAddressSegment = `<span>${personalInfo.present_address}</span>`;

            profileAddress += profileAddressSegment;
            let profileAddressContainer = document.querySelector('.profile_address');
            profileAddressContainer.innerHTML = profileAddress;

            let profileMobile = '';
            let profileMobileSegment = `<span>${personalInfo.mobile}</span>`;

            profileMobile += profileMobileSegment;
            let profileMobileContainer = document.querySelector('.profile_mobile');
            profileMobileContainer.innerHTML = profileMobile;

            let profileEmail = '';
            let profileEmailSegment = `<span>${personalInfo.email}</span>`;

            profileEmail += profileEmailSegment;
            let profileEmailContainer = document.querySelector('.profile_email');
            profileEmailContainer.innerHTML = profileEmail;

            let profileLinkedIn = '';
            let profileLinkedInSegment = `<span>${additionalInfo.linkedin}</span>`;

            profileLinkedIn += profileLinkedInSegment;
            let profileLinkedInContainer = document.querySelector('.additional_linked');
            profileLinkedInContainer.innerHTML = profileLinkedIn;

            let profileSkills = '';
            let profileSkillsSegment = `<li>
                            <div class="skill_name">
                                ${additionalInfo.skills}
                            </div>
                        </li>`;

            profileSkills += profileSkillsSegment;
            let profileSkillsContainer = document.querySelector('.profile_skills');
            profileSkillsContainer.innerHTML = profileSkills;


            let reference = '';

            let referenceSegment = references.map((reference) => {
                return (`
                <ul>
                                    <li>
                                        <div class="data reference_name">
                                            <p>${reference.name}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="data reference_designation">
                                            <p>${reference.designation}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="data reference_organization">
                                            <p>${reference.organization}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="data reference_email">
                                            <p>${reference.email}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="data reference_mobile">
                                            <p>${reference.mobile}
                                        </div>
                                    </li>
                                </ul>`)
            }).join('');

            reference += referenceSegment;
            let referenceContainer = document.querySelector('.reference');
            referenceContainer.innerHTML = reference;

            let profileSummary = '';
            let profileSummarySegment = `<p>${personalInfo.profile_summary}</p>`;

            profileSummary += profileSummarySegment;
            let profileSummaryContainer = document.querySelector('.personal_info_profile_summary');
            profileSummaryContainer.innerHTML = profileSummary;

            let jobExperience = '';
            let jobExperienceSegment = workExperience.map((workExperience) => {
                return (
                    `<ul>
                            <li>
                                <div class="date job_exp_company_name">${workExperience.company_name}</div>
                                <div class="title job_exp_title">
                                    <p class="regular">
                            ${workExperience.position}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${workExperience.location}
                        </p>
                                </div>
                                <div class="info job_exp_Summary">
                                    <p class="semi-bold">${workExperience.start} - ${workExperience.end}</p>
                        <p>${workExperience.work_summary}</p>
                                </div>
                            </li>
                        </ul>`
                )
            }).join('')


            jobExperience += jobExperienceSegment;
            let jobExperienceContainer = document.querySelector('.work_experience');
            jobExperienceContainer.innerHTML = jobExperience;

            let educationInfo = '';
            let educationInfoSegment = education.map((education, index) => {
                return (`
                 <tr key={index}>
                    <td>${education.pass_year}</td>
                    <td>${education.inst_name}</td>
                    <td>${education.degree}</td>
                    <td>${education.result}</td>
                </tr>`)
            }).join('');

            educationInfo += educationInfoSegment;
            let educationInfoContainer = document.querySelector('.education_info');
            educationInfoContainer.innerHTML = educationInfo;

            let trainingInfo = '';

            let trainingInfoSegment = trainings.map((training) => {
                return (
                    `
                 <li>
                    <div class="date">${training.training_name}</div>
                    <div class="info">
                        <p class="semi-bold1">${training.end}</p>
                    </div>
                </li>`
                )
            }).join('');

            trainingInfo += trainingInfoSegment;
            let trainingInfoContainer = document.querySelector('.training_info');
            trainingInfoContainer.innerHTML = trainingInfo;

            let projectInfo = '';

            let projectInfoSegment = projects.map((project) => {
                return (`
                 <li>
                    <div class="date">${project.project_name}</div>
                    <div class="title">
                    </div>
                    <div class="info">
                        <p class="semi-bold2">${project.start} - ${project.end}</p>
                        <p>${project.project_summary}</p>
                    </div>
                </li>`)
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

let cv2Obj = {};

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

    cv2Obj = jsonRes?.cv[2];

}).catch((err) => console.log('error', err));


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
    $('#payment_modal2').modal('hide');
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
            createPdfFromHtmlCv2();
        }
    }).catch((err) => console.log('error', err));

    setTimeout(nagadPaymentGet, 3000);
}

const nagadPayment = () => {
    let nagadFormData = new FormData();
    nagadFormData.append('amount', cv2Obj?.price);
    nagadFormData.append('user_id', userId);
    nagadFormData.append('cv_id', cv2Obj?.id);

    fetch("https://xosstech.com/Payment/nagad/index.php", {
        method: "POST", mode: "cors", body: nagadFormData

    }).then((res) => {
        if (!res.ok) {
            throw Error("Could not fetch data for that resource!!!");
        } else {
            // console.log('nagad res->', res.json());
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
    const charge = cv2Obj?.price;

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
                createPdfFromHtmlCv2();
            }

        })
}

const onClickBdApps = () => {
    $('.mobile_no').toggle("slide");
}
