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

            let profileAddress = '';
            let profileAddressSegment = `
                            <i class="fas fa-map-marker-alt" id="icon"></i>
                            <p>${personalInfo.present_address}</p>`;

            profileAddress += profileAddressSegment;
            let profileAddressContainer = document.querySelector('.data');
            profileAddressContainer.innerHTML = profileAddress;

            let profileMobile = '';
            let profileMobileSegment = `<i class="fas fa-phone-alt" id="icon3"></i>
                            <p><span>${personalInfo.mobile}</p>`;

            profileMobile += profileMobileSegment;
            let profileMobileContainer = document.querySelector('.data1');
            profileMobileContainer.innerHTML = profileMobile;

            let profileEmail = '';
            let profileEmailSegment = `<i class="fas fa-envelope" id="icon1"></i>
                            <p><span>${personalInfo.email}</p>`;

            profileEmail += profileEmailSegment;
            let profileEmailContainer = document.querySelector('.data2');
            profileEmailContainer.innerHTML = profileEmail;

            let profileImage = '';
            let profileImageSegment = `
            <img src='${personalInfo.image}' alt="Resume_image">`;

            profileImage += profileImageSegment;
            let profileImageContainer = document.querySelector('.resume_image');
            profileImageContainer.innerHTML = profileImage;


            let profileName = '';
            let name = personalInfo.name
            let profileNameSegment = `<div class="name">${name}</div>
                        <div class="role">${personalInfo.job_title}</div>`;

            profileName += profileNameSegment;
            let profileNameContainer = document.querySelector('.resume_item');
            profileNameContainer.innerHTML = profileName;

            let profileSkills = '';
            let profileSkillsSegment = `<li>
                            <div class="skill_name">
                                ${additionalInfo.skills}
                            </div>
                        </li>`;

            profileSkills += profileSkillsSegment;
            let profileSkillsContainer = document.querySelector('.profile_skills');
            profileSkillsContainer.innerHTML = profileSkills;


            let educationInfo = '';
            let educationInfoSegment = education.map((education) => {
                return (`
                             <div class="resume_info">
                                ${education.degree}
                            </div>

                            <div class="skill_name1">
                                ${education.inst_name}
                            </div>

                            <div class="skill_name2">
                                ${education.pass_year}
                            </div>
                            <div class="skill_name2">
                                ${education.result}
                            </div>
                            <div class="skill_name2">
                                ${education.board}
                            </div>
                            <br>
                `)
            }).join('');

            educationInfo += educationInfoSegment;
            let educationInfoContainer = document.querySelector('.education_info');
            educationInfoContainer.innerHTML = educationInfo;

            let reference = '';
            let referenceSegment = references.map((reference) => {
                return (`
                <ul>
                                    <li>
                                        <div class="data">
                                            <p>${reference.name}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="data">
                                            <p>${reference.designation}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="data">
                                            <p>${reference.organization}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="data">
                                            <p>${reference.email}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="data">
                                            <p>${reference.mobile}
                                        </div>
                                    </li>
                                </ul>
                            <br>`)
            }).join('');

            reference += referenceSegment;
            let referenceContainer = document.querySelector('.reference');
            referenceContainer.innerHTML = reference;

            let profileSummary = '';
            let profileSummarySegment = `<p>${personalInfo.profile_summary}</p>`;

            profileSummary += profileSummarySegment;
            let profileSummaryContainer = document.querySelector('.pro_summery');
            profileSummaryContainer.innerHTML = profileSummary;

            let jobExperience = '';
            let jobExperienceSegment = workExperience.map((workExperience) => {
                return (
                    `<ul>
                            <li>
                                <div class="date">${workExperience.company_name}</div>
                                <div class="title">
                                    <p class="regular">
                            ${workExperience.position}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${workExperience.location}
                        </p>
                                </div>
                                <div class="info">
                                    <p class="semi-bold">${workExperience.start} - ${workExperience.end}</p>
                        <p>${workExperience.work_summary}</p>
                                </div>
                            </li>
                        </ul>`
                )
            }).join('')


            jobExperience += jobExperienceSegment;
            let jobExperienceContainer = document.querySelector('.job_info');
            jobExperienceContainer.innerHTML = jobExperience;

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
                        <!--<p class="regular">Job Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Location</p>-->
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

            let language = '';
            let languageSegment = `<li>
                                <div class="data">
                                    <p>${additionalInfo.language}</p>
                                </div>
                            </li>
                            <li>
                                <div class="data1">
                                    <p>Good</p>
                                </div>
                            </li>`;

            language += languageSegment;
            let languageContainer = document.querySelector('.language_info');
            languageContainer.innerHTML = language;


        }
    })
    .catch((err) => {
        console.log('error->', err);
        // window.location.href = "/login.html";
    });

let cv7Obj = {};

let image = fetch('https://xosstech.com/cvm/api/public/api/cv', {
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

    cv7Obj = jsonRes?.cv[2];

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
    nagadFormData.append('amount', cv7Obj?.price);

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
    const charge = cv7Obj?.price;
    console.log('userMobile->', userMobile.value);

    const bdAppFormData = new FormData();
    bdAppFormData.append("user_mobile", userMobile.value);
    bdAppFormData.append("charge", charge);

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
            if (!jsonRes.success) {
                console.log('!jsonRes.success->', jsonRes);
                // window.location.href = "login.html";
            } else {
                console.log('jsonRes.success->', jsonRes);
            }
        })
}

const onClickBdApps = () => {
    $('.mobile_no').toggle("slide");
}
