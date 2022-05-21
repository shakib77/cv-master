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

    let cvs = jsonRes?.cv;

    let cvTempRadio = '';

    let cvTempRadioSegment = cvs.map((cv) => {
        return `
                <div class="row py-2">
                            <div class="col-6">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="cvRadios" id="cvRadios" value='${cv.id}'>
                                    <label class="form-check-label" for="cvRadios">
                                        ${cv?.category}
                                    </label>
                                </div>
                            </div>
                            <div class="col-6">
                                <p>Price: ${cv?.price}</p>
                            </div>
                        </div>`
    }).join('');

    cvTempRadio += cvTempRadioSegment;

    let cvTempRadioContainer = document.querySelector('.temp_radio_form');

    cvTempRadioContainer.innerHTML = cvTempRadio;

}).catch((err) => console.log('error', err))

const cvTemplateSubmit = document.getElementById('cv_template_submit');

cvTemplateSubmit.addEventListener('click', (e) => {
    const radioValue = document.querySelector('input[name="cvRadios"]:checked').value;

    switch (radioValue) {
        case '1':
            window.location.href = "../cv-temp/cv4";
            break;
        case '2':
            window.location.href = "../cv-temp/cv3";
            break;
        case '3':
            window.location.href = "../cv-temp/cv2";
            break;
        case '4':
            window.location.href = "../cv-temp/cv3";
            break;
        case '5':
            window.location.href = "../cv-temp/cv7";
            break;
        case '6':
            window.location.href = "../cv-temp/cv13";
            break;
        case '7':
            window.location.href = "../cv-temp/cv9";
            break;
        case '8':
            window.location.href = "../cv-temp/cv11";
            break;
        default:
            alert('No template found!')
    }
})
