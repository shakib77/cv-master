const referenceFormDiv = `<form id="reference_from" class="reference_from_cls">
                            <div class="row">
                            <div class="col-6 d-none">
                                    <div class="form-group">
                                        <label for="reference_id">Id</label>
                                        <input type="text" class="form-control"
                                               name="reference_id"
                                               placeholder="Write id...">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="reference_name">Name</label>
                                        <input type="text" class="form-control"
                                               name="reference_name"
                                               placeholder="Write name...">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="reference_designation">Designation</label>
                                        <input type="text" class="form-control" name="reference_designation"
                                               placeholder="Write designation...">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="reference_organization">Organization</label>
                                        <input type="text" class="form-control" name="reference_organization"
                                               placeholder="Write organization...">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="reference_email">Email</label>
                                        <input type="email" class="form-control"
                                               name="reference_email"
                                               aria-describedby="emailHelp" placeholder="Write email id...">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="reference_mobile">Mobile</label>
                                        <input type="tel" class="form-control"
                                               name="reference_mobile"
                                               placeholder="Write your mobile no...">
                                    </div>
                                </div>
                            </div>
                            <div class="mb-4">
                                <button type="button" class="top-button top-button-q-pre" onclick="deleteReference(event)">
                                    Delete
                                </button>
                                <button type="button" class="top-button top-button-q-pre float-right" onclick="createUpdateReference(event)">Save</button>
                            </div>
                            <hr>
                        </form>`

const addReference = () => {
    let selector = document.getElementById('reference_div')
    let temp = document.createElement('div')
    temp.innerHTML += referenceFormDiv;
    selector.appendChild(temp.children[0])
    // selector.parentElement.innerHTML += selector.outerHTML;
}

fetch('https://xosstech.com/cvm/api/public/api/references', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: bearer
    },
    mode: "cors",
    cache: "default",
}).then((res) => {
    return res.json()
}).then((jsonRes) => {
    // console.log({jsonRes});
    if (!jsonRes.success) {
        throw Error("Could not fetch data for that resource");
    } else {
        let referencesInfoLength = jsonRes.data.length;
        let referencesInfoData = jsonRes.data;

        let referenceInfoForm = '';
        let referenceInfoFormSegment = referencesInfoData.map((referenceInfoForm) => {
            return (referenceFormDiv)
        }).join('');

        referenceInfoForm += referenceInfoFormSegment;
        let referenceInfoFormContainer = document.querySelector('.reference_div');
        referenceInfoFormContainer.innerHTML = referenceInfoForm;

        if (referencesInfoData && referencesInfoLength > 0) {
            referencesInfoData.forEach((referenceInfo, i) => {
                let div = document.getElementById('reference_div');

                $(div.children[i]).find('[name="reference_id"]').val(referenceInfo.id);
                $(div.children[i]).find('[name="reference_name"]').val(referenceInfo.name);
                $(div.children[i]).find('[name="reference_designation"]').val(referenceInfo.designation);
                $(div.children[i]).find('[name="reference_email"]').val(referenceInfo.email);
                $(div.children[i]).find('[name="reference_mobile"]').val(referenceInfo.mobile);
                $(div.children[i]).find('[name="reference_organization"]').val(referenceInfo.organization);
            })
        }
    }

}).catch((err) => console.log('error', err));

const createUpdateReference = (e) => {
    let form = $(e.target).parent().parent();
    let id = form.find('[name="reference_id"]').val();

    const formData = {
        name: form.find('[name="reference_name"]').val(),
        designation: form.find('[name="reference_designation"]').val(),
        organization: form.find('[name="reference_organization"]').val(),
        email: form.find('[name="reference_email"]').val(),
        mobile: form.find('[name="reference_mobile"]').val(),
    };

    fetch(id ? `https://xosstech.com/cvm/api/public/api/reference/update/${id}` : `https://xosstech.com/cvm/api/public/api/reference`, {
        method: "POST",
        mode: "cors", headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
        },
        body: JSON.stringify(formData),

    }).then((res) => {
        console.log('res=>', res);
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
                // window.location.href = "login.html";
            } else {
                console.log('jsonRes.success->', jsonRes);
                alert(id ? 'Data has been successfully updated' : 'Data has been successfully created');
                // document.getElementById("reference_from").reset();
            }
        })
        .catch((err) => {
            console.log('error->', err);
            // window.location.href = "/login.html";
        });
}

const deleteReference = (e) => {
    let form = $(e.target).parent().parent();
    let id = form.find('[name="reference_id"]').val();

    if (id) {
        fetch(`https://xosstech.com/cvm/api/public/api/reference/delete/${id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: bearer,
            },
        }).then((res) => {
            console.log('res=>', res);
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
                    // window.location.href = "login.html";
                } else {
                    console.log('delete jsonRes.success->', jsonRes);
                    alert('Data has been successfully deleted');

                    $('.reference_from_cls').on('click', function () {
                        $(this).remove();
                        // $(this).parent('div.reference_div').remove();
                    });
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log('error->', err);
                // window.location.href = "/login.html";
            });
    } else {
        $('.reference_from_cls').on('click', function () {
            $(this).remove();
            // $(this).parent('div.reference_div').remove();
        });
    }
}
