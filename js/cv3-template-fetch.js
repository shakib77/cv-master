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
            <img src='${image}' class="profile" alt="profile_pic">`;

            profileImage += profileImageSegment;
            let profileImageContainer = document.querySelector('.profile_image');
            profileImageContainer.innerHTML = profileImage;

            let profileName = '';
            let name = personalInfo.name
            let profileNameSegment = `
            <p class="p1">${name}</p>
            <p class="p2">${personalInfo.job_title}</p>`;

            profileName += profileNameSegment;
            let profileNameContainer = document.querySelector('.profile_name');
            profileNameContainer.innerHTML = profileName;

            let contactInfo = '';
            let contactInfoSegment = `
                <p class="p3"><i class="fa fa-phone" aria-hidden="true"></i> &nbsp;&nbsp; ${personalInfo.mobile}</p>
                <p class="p3"><i class="fa fa-envelope" aria-hidden="true"></i> &nbsp;&nbsp; ${personalInfo.email}</p>
                <p class="p3"><i class="fa fa-home" aria-hidden="true"></i> &nbsp;&nbsp;${personalInfo.present_address}</p>
                `;

            contactInfo += contactInfoSegment;
            let contactInfoContainer = document.querySelector('.contact_info');
            contactInfoContainer.innerHTML = contactInfo;

            let profileSkills = '';
            let profileSkillsSegment = `
                         <li>
                             <span>
                                ${additionalInfo.skills}
                             </span>
                        </li>`;

            profileSkills += profileSkillsSegment;
            let profileSkillsContainer = document.querySelector('.profile_skills');
            profileSkillsContainer.innerHTML = profileSkills;

            let language = '';
            let languageSegment = `
                             <p class="p3">
                                ${additionalInfo.language}
                             </p>
                        `;

            language += languageSegment;
            let languageContainer = document.querySelector('.language');
            languageContainer.innerHTML = language;

            let referenceInfo = '';
            let referenceInfoSegment = `
                <li>
                    <div class="p3">
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
                        <p>${reference.mobile}</p>
                    </div>
                </li>

                `;

            referenceInfo += referenceInfoSegment;
            let referenceInfoContainer = document.querySelector('.ref');
            referenceInfoContainer.innerHTML = referenceInfo;

            let profileSummary = '';
            let profileSummarySegment = `
                <p class="head">profile</p>
                <p class="p3" style="font-size: 14px;">
                    ${personalInfo.profile_summary}
                </p>
`;

            profileSummary += profileSummarySegment;
            let profileSummaryContainer = document.querySelector('.profile_sum');
            profileSummaryContainer.innerHTML = profileSummary;

            let experience_info = '';
            let experience_infoSegment = `
<!--<span>${workExperience.company_name}</span>-->
                    <p class="head">EXPERIENCE</p>
                    <p>${workExperience.position}&nbsp;(${workExperience.start} - ${workExperience.end})</p>
                    <p class="p-4">${workExperience.work_summary}</p>
                `;

            experience_info += experience_infoSegment;
            let experience_infoContainer = document.querySelector('.experience_info');
            experience_infoContainer.innerHTML = experience_info;

            let educationInfo = '';
            let educationInfoSegment = `
                <p class="head">Education</p>
                <p class="p-4">${education.degree}&nbsp;&nbsp;&nbsp;&nbsp; ${education.inst_name}&nbsp;&nbsp;&nbsp;&nbsp; ${education.pass_year}&nbsp;&nbsp;&nbsp;&nbsp; ${education.result}</p>
                `;

            educationInfo += educationInfoSegment;
            let educationInfoContainer = document.querySelector('.education_info');
            educationInfoContainer.innerHTML = educationInfo;

            let trainingInfo = '';
            let trainingInfoSegment = `
                    <td>
                        <p>${trainings.training_name}</p>
                        <!--<p>Institute Name</p>-->
                        <p class="p-4">${trainings.end}</p>
                    </td>
                 `;

            trainingInfo += trainingInfoSegment;
            let trainingInfoContainer = document.querySelector('.training_info');
            trainingInfoContainer.innerHTML = trainingInfo;

            let projectInfo = '';
            let projectInfoSegment = `
                <p>${projects.project_name}</p>
                <p style="font-size: 14px;">${projects.start} - ${projects.end}</p>
                <p class="p-4">
                    ${projects.project_summary}
                </p>
                 `;

            projectInfo += projectInfoSegment;
            let projectInfoContainer = document.querySelector('.project_info');
            projectInfoContainer.innerHTML = projectInfo;
        }
    })
    .catch((err) => {
        console.log('error->', err);
        // window.location.href = "/login.html";
    });

let cv3Obj = {};

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

    cv3Obj = jsonRes?.cv[1];

}).catch((err) => console.log('error', err))

const onClickCv3Download = () => {
    let nagadFormData = new FormData();
    nagadFormData.append('amount', cv3Obj?.price);

    fetch("https://xosstech.com/Payment/nagad/index.php", {
        method: "POST",
        mode: "no-cors",
        body: nagadFormData,
        redirect: 'follow'

    }).then((res) => {
        console.log('res=>', res);
        if (!res.ok) {
            // throw Error("Could not fetch data for that resource!!!");
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
