let image = fetch('https://xosstech.com/cvm/api/public/api/cv', {
    method: "GET", headers: {
        "Content-Type": "application/json",
    }, mode: "cors", cache: "default",
}).then((res) => {
    return res.json()
}).then((jsonRes) => {
    // console.log({jsonRes});
    if (!jsonRes.success) {
        return;
    }
    let cv1 = '';
    let htmlSegment1 = `<div class="resume-example">
                               <a href="../cv-temp/cv4" target="_blank">
                                <img class="resume-example-image" src="${jsonRes.cv[0].image}"  alt="">
                                <span class="resume-example-title">${jsonRes.cv[0].category}</span>
                               </a>
                            </div>
                            `;

    cv1 += htmlSegment1;
    let container1 = document.querySelector('.cv-img-1');
    container1.innerHTML = cv1;

    let cv2 = '';
    let htmlSegment2 = `<div class="resume-example">
                               <a href="" target="_blank">
                                <img class="resume-example-image" src="${jsonRes.cv[1].image}"  alt="">
                                <span class="resume-example-title">${jsonRes.cv[1].category}</span>
                               </a>
                            </div>
                            `;

    cv2 += htmlSegment2;
    let container2 = document.querySelector('.cv-img-2');
    container2.innerHTML = cv2;

    let cv3 = '';
    let htmlSegment3 = `<div class="resume-example">
                               <a href="../cv-temp/cv2" target="_blank">
                                <img class="resume-example-image" src="${jsonRes.cv[2].image}"  alt="">
                                <span class="resume-example-title">${jsonRes.cv[2].category}</span>
                               </a>
                            </div>
                            `;

    cv3 += htmlSegment3;
    let container3 = document.querySelector('.cv-img-3');
    container3.innerHTML = cv3;

    let cv4 = '';
    let htmlSegment4 = `<div class="resume-example">
                               <a href="../cv-temp/cv3" target="_blank">
                                <img class="resume-example-image" src="${jsonRes.cv[3].image}"  alt="">
                                <span class="resume-example-title">${jsonRes.cv[3].category}</span>
                               </a>
                            </div>
                            `;

    cv4 += htmlSegment4;
    let container4 = document.querySelector('.cv-img-4');
    container4.innerHTML = cv4;

    let cv5 = '';
    let htmlSegment5 = `<div class="resume-example">
                               <a href="../cv-temp/cv7" target="_blank">
                                <img class="resume-example-image" src="${jsonRes.cv[4].image}"  alt="">
                                <span class="resume-example-title">${jsonRes.cv[4].category}</span>
                               </a>
                            </div>
                            `;

    cv5 += htmlSegment5;
    let container5 = document.querySelector('.cv-img-5');
    container5.innerHTML = cv5;

    let cv6 = '';
    let htmlSegment6 = `<div class="resume-example">
                               <a href="../cv-temp/cv13" target="_blank">
                                <img class="resume-example-image" src="${jsonRes.cv[5].image}"  alt="">
                                <span class="resume-example-title">${jsonRes.cv[5].category}</span>
                               </a>
                            </div>
                            `;

    cv6 += htmlSegment6;
    let container6 = document.querySelector('.cv-img-6');
    container6.innerHTML = cv6;

    let cv7 = '';
    let htmlSegment7 = `<div class="resume-example">
                               <a href="../cv-temp/cv9" target="_blank">
                                <img class="resume-example-image" src="${jsonRes.cv[6].image}"  alt="">
                                <span class="resume-example-title">${jsonRes.cv[6].category}</span>
                               </a>
                            </div>
                            `;

    cv7 += htmlSegment7;
    let container7 = document.querySelector('.cv-img-7');
    container7.innerHTML = cv7;

    let cv8 = '';
    let htmlSegment8 = `<div class="resume-example">
                               <a href="../cv-temp/cv11" target="_blank">
                                <img class="resume-example-image" src="${jsonRes.cv[7].image}"  alt="">
                                <span class="resume-example-title">${jsonRes.cv[7].category}</span>
                               </a>
                            </div>
                            `;

    cv8 += htmlSegment8;
    let container8 = document.querySelector('.cv-img-8');
    container8.innerHTML = cv8;

}).catch((err) => console.log('error', err))
