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
            let reference = data?.references_data?.references[referenceLength]
            let workExperience = data?.experiences_data?.experiences[workExperienceLength]
            let education = data?.education_data?.education[educationLength]
            let trainings = data?.trainings_data?.trainings[trainingsLength]
            let projects = data?.projects_data?.projects[projectsLength]

            let profileImage = '';
            let image = personalInfo.image
            let profileImageSegment = `
            <img src='${image}' alt="profile_pic">`;

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

            let referenceName = '';
            let referenceNameSegment = `<p>${reference.name}</p>`;

            referenceName += referenceNameSegment;
            let referenceNameContainer = document.querySelector('.reference_name');
            referenceNameContainer.innerHTML = referenceName;

            let referenceDesignation = '';
            let referenceDesignationSegment = `<p>${reference.designation}</p>`;

            referenceDesignation += referenceDesignationSegment;
            let referenceDesignationContainer = document.querySelector('.reference_designation');
            referenceDesignationContainer.innerHTML = referenceDesignation;

            let referenceOrganization = '';
            let referenceOrganizationSegment = `<p>${reference.organization}</p>`;

            referenceOrganization += referenceOrganizationSegment;
            let referenceOrganizationContainer = document.querySelector('.reference_organization');
            referenceOrganizationContainer.innerHTML = referenceOrganization;

            let referenceEmail = '';
            let referenceEmailSegment = `<p>${reference.email}</p>`;

            referenceEmail += referenceEmailSegment;
            let referenceEmailContainer = document.querySelector('.reference_email');
            referenceEmailContainer.innerHTML = referenceEmail;

            let referenceMobile = '';
            let referenceMobileSegment = `<p>${reference.mobile}</p>`;

            referenceMobile += referenceMobileSegment;
            let referenceMobileContainer = document.querySelector('.reference_mobile');
            referenceMobileContainer.innerHTML = referenceMobile;

            let profileSummary = '';
            let profileSummarySegment = `<p>${personalInfo.profile_summary}</p>`;

            profileSummary += profileSummarySegment;
            let profileSummaryContainer = document.querySelector('.personal_info_profile_summary');
            profileSummaryContainer.innerHTML = profileSummary;

            let jobExperienceComName = '';
            let jobExperienceComNameSegment = `<span>${workExperience.company_name}</span>`;

            jobExperienceComName += jobExperienceComNameSegment;
            let jobExperienceComNameContainer = document.querySelector('.job_exp_company_name');
            jobExperienceComNameContainer.innerHTML = jobExperienceComName;

            let jobExperienceJobTitle = '';
            let jobExperienceJobTitleSegment = `<p class="regular">
                            ${workExperience.position}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${workExperience.location}
                        </p>`;

            jobExperienceJobTitle += jobExperienceJobTitleSegment;
            let jobExperienceJobTitleContainer = document.querySelector('.job_exp_title');
            jobExperienceJobTitleContainer.innerHTML = jobExperienceJobTitle;

            let jobExperienceJobDurationSummary = '';
            let jobExperienceJobDurationSummarySegment = `<p class="semi-bold">${workExperience.start} - ${workExperience.end}</p>
                        <p>${workExperience.work_summary}</p>`;

            jobExperienceJobDurationSummary += jobExperienceJobDurationSummarySegment;
            let jobExperienceJobDurationSummaryContainer = document.querySelector('.job_exp_Summary');
            jobExperienceJobDurationSummaryContainer.innerHTML = jobExperienceJobDurationSummary;

            let educationInfo = '';
            let educationInfoSegment = `
                 <tr>
                    <td>${education.pass_year}</td>
                    <td>${education.inst_name}</td>
                    <td>${education.degree}</td>
                    <td>${education.result}</td>
                </tr>`;

            educationInfo += educationInfoSegment;
            let educationInfoContainer = document.querySelector('.education_info');
            educationInfoContainer.innerHTML = educationInfo;

            let trainingInfo = '';
            let trainingInfoSegment = `
                 <li>
                    <div class="date">${trainings.training_name}</div>
                    <!--<div class="title">
                        <p class="regular">Institute Name</p>
                    </div>-->
                    <div class="info">
                        <p class="semi-bold1">${trainings.end}</p>
                    </div>
                </li>`;

            trainingInfo += trainingInfoSegment;
            let trainingInfoContainer = document.querySelector('.training_info');
            trainingInfoContainer.innerHTML = trainingInfo;

            let projectInfo = '';
            let projectInfoSegment = `
                 <li>
                    <div class="date">${projects.project_name}</div>
                    <div class="title">
                        <!--<p class="regular">Job Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Location</p>-->
                    </div>
                    <div class="info">
                        <p class="semi-bold2">${projects.start} - ${projects.end}</p>
                        <p>${projects.project_summary}</p>
                    </div>
                </li>`;

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

    cv2Obj = jsonRes?.cv[2];

}).catch((err) => console.log('error', err))


const onClickCv2Download = () => {
    let nagadFormData = new FormData();
    nagadFormData.append('amount', cv2Obj?.price);

    fetch("https://xosstech.com/Payment/nagad/index.php", {
        method: "POST",
        mode: "no-cors",
        body: nagadFormData,
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
            console.log('jsonRes =>', jsonRes);
            if (!jsonRes.success) {
                console.log('!jsonRes.success->', jsonRes);
                // window.location.href = "login.html";
            } else {
                console.log('jsonRes.success->', jsonRes);

                /*let printContents = document.getElementById('print_cv').innerHTML;
                let originalContents = document.body.innerHTML;

                document.body.innerHTML = printContents;

                window.print();

                document.body.innerHTML = originalContents;*/
            }
        })
}
