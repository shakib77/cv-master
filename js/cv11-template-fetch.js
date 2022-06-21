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

            let profileImage = '';
            let image = personalInfo.image;
            // let image = 'https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0';
            let profileImageSegment = `
            <img src='${image ? image : ''}' alt="profile_pic">`;

            profileImage += profileImageSegment;
            let profileImageContainer = document.querySelector('.img');
            profileImageContainer.innerHTML = profileImage;

            let content = '';
            let contentSegment = `
            <p class="p5"><i class="fa fa-envelope" aria-hidden="true"
                                     style="display: block; font-size: 23px; color: #008AD3;"></i>${personalInfo.email ? personalInfo.email : ''}</p>
                    <p class="p5"><i class="fa fa-mobile" aria-hidden="true"
                                     style="display: block; font-size: 33px; color: #008AD3;"></i>${personalInfo.mobile ? personalInfo.mobile : ''}</p>
                    <p class="p5"><i class="fa fa-map-marker" aria-hidden="true"
                                     style="display: block; font-size: 24px; color: #008AD3;"></i>${personalInfo.present_address ? personalInfo.present_address : ''}</p>
                    <p class="head">Skills</p>
                    <hr style="border: 1px solid #008AD3;">
                    <ul class="skills">
                        <li>${additionalInfo.skills ? additionalInfo.skills : ''}</li>
                    </ul>

                    <p class="head">Languages</p>
                    <hr style="border: 1px solid #008AD3;">
                    <p class="p3">${additionalInfo.language ? additionalInfo.language : ''}</p>
                    <p class="p4">Good</p>`;

            content += contentSegment;
            let contentContainer = document.querySelector('.content_info');
            contentContainer.innerHTML = content;

            let referenceInfo = '';
            let referenceInfoSegment = reference.map((reference) => {
                return (`
<ul class="ref">
                <li>
                    <div class="p6">
                        <p>${reference.name ? reference.name : ''}</p>
                    </div>
                </li>
                <li>
                    <div class="p3">
                        <p>${reference.designation ? reference.designation : ''}</p>
                    </div>
                </li>
                <li>
                    <div class="p3">
                        <p>${reference.organization ? reference.organization : ''}</p>
                    </div>
                </li>
                <li>
                    <div class="p3">
                        <p>${reference.email ? reference.email : ''}</p>
                    </div>
                </li>
                <li>
                    <div class="p3">
                        <p>${reference.mobile ? reference.mobile : ''}</p>
                    </div>
                </li>
</ul>
<br>
                `)
            }).join('')

            referenceInfo += referenceInfoSegment;
            let referenceInfoContainer = document.querySelector('.reference');
            referenceInfoContainer.innerHTML = referenceInfo;

            let trainingInfo = '';
            let trainingInfoSegment = trainings.map((training) => {
                return (`
                           
                            <ul class="ref">
                            <li>
                                <div class="head1">
                                    <p>${training.training_name ? training.training_name : ''}</p>
                                </div>
                            </li>
                           
                            <li>
                                <div class="p3">
                                    <p>${training.end ? training.end : ''}</p>
                                </div>
                            </li>
                        </ul>
                        <br>
                 `)
            }).join('')

            trainingInfo += trainingInfoSegment;
            let trainingInfoContainer = document.querySelector('.training_info');
            trainingInfoContainer.innerHTML = trainingInfo;

            let profileSummary = '';
            let profileSummarySegment = `
                    <p class="head21">${personalInfo.name ? personalInfo.name : ''}</p>
                    <p class="p7" style="font-size: 14px;">${personalInfo.profile_summary ? personalInfo.profile_summary : ''}</p>`;

            profileSummary += profileSummarySegment;
            let profileSummaryContainer = document.querySelector('.bg');
            profileSummaryContainer.innerHTML = profileSummary;

            if (education.length > 0) {


                let educationInfo = '';
                let educationInfoSegment = education.map((education) => {
                    return (`
                        <div class="head1">${education.degree ? education.degree : ''}</div>
                        <div class="skill_name1">${education.inst_name ? education.inst_name : ''}</div>
                        <p class="p4">${education.pass_year ? education.pass_year : ''}</p>
                        <p class="p4">${education.result ? education.result : ''}</p>
                        <p class="p4">${education.board ? education.board : ''}</p>`)
                }).join('')

                educationInfo += educationInfoSegment;
                let educationInfoContainer = document.querySelector('.education_info');
                educationInfoContainer.innerHTML = educationInfo;
            }

            let experience_info = '';
            let experience_infoSegment = workExperience.map((workExperience) => {
                return (`
                        <div class="head1">${workExperience.position ? workExperience.position : ''}</div>
                        <div class="skill_name1">${workExperience.company_name ? workExperience.company_name : ''}</div>
                        <p class="p4">${workExperience.start ? workExperience.start : ''} - ${workExperience.end ? workExperience.end : ''}</p>
                        `)
            }).join('')

            experience_info += experience_infoSegment;
            let experience_infoContainer = document.querySelector('.experience_info');
            experience_infoContainer.innerHTML = experience_info;

            let projectInfo = '';
            let projectInfoSegment = projects.map((project) => {
                return (` 
                        <div class="head1">${project.project_name ? project.project_name : ''}</div>
                        <p class="p4">${project.start ? project.start : ''} - ${project.end ? project.end : ''}</p>
                        <p class="p3">${project.project_summary}</p>
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

let cv11Obj = {};

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

    cv11Obj = jsonRes?.cv[1];

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
        case '3':
            bkashPayment();
            break;
        default:
            alert('No template found!')
    }
    $('#payment_modal').modal('hide');
}

const bkashPayment = () => {
    window.open(`https://xosstech.com/Payment/bkash/payment.php?cv_id=${cv11Obj?.id}&user_id=${userId}&id=CVM${cv11Obj?.price}CVF`, '_blank');

    setTimeout(bkashPaymentStatusGet, 5000);
}

const bkashPaymentStatusGet = () => {
    fetch('https://xosstech.com/cvm/api/public/api/nagadpayment', {
        method: "GET", headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
        },
        mode: "cors",
        cache: "default",
    }).then((res) => {
        return res.json()
    }).then((jsonRes) => {
        console.log('get bkdjson->', jsonRes);
        if (jsonRes.data.status === 'Completed') {
            $(".water-mark").hide();
            createPdfFromHtmlCv11();
        }
    }).catch((err) => console.log('error', err));

    setTimeout(bkashPaymentStatusGet, 3000);
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
            createPdfFromHtmlCv11();
        }
    }).catch((err) => console.log('error', err));

    setTimeout(nagadPaymentGet, 3000);
}

const nagadPayment = () => {
    let nagadFormData = new FormData();
    nagadFormData.append('amount', cv11Obj?.price);
    nagadFormData.append('user_id', userId);
    nagadFormData.append('cv_id', cv11Obj?.id);

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
    const charge = cv11Obj?.price;

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
                        window.alert('Please press 1 for subscription')
                    })
            }

            if (jsonRes.response === 'charged_successfull') {
                createPdfFromHtmlCv11();
            }

        })
}

const onClickBdApps = () => {
    $('.mobile_no').toggle("slide");
}
