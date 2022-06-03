const trainingFormDiv = `<form id="training_from" class="training_from_cls">
                            <div class="row">
                                <div class="col-6 d-none">
                                    <div class="form-group">
                                        <label for="training_id">Training Id</label>
                                        <input type="text" class="form-control" name="training_id"
                                               placeholder="Write training id...">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="training_name">Training name</label>
                                        <input type="text" class="form-control" name="training_name"
                                               placeholder="Write training name...">
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="training_end">End date</label>
                                        <input placeholder="Selected end date" type="date" name="training_end"
                                               class="form-control datepicker">
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="training_summary">Training summary</label>
                                        <textarea class="form-control" name="training_summary" rows="4"
                                                  placeholder="Write training summery..."></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-4">
                                <button type="button" class="top-button top-button-q-pre" onclick="deleteTraining(event)">
                                    Delete
                                </button>
                                <button type="button" class="top-button top-button-q-pre float-right" onclick="createUpdateTraining(event)">Save</button>
                            </div>
                            <hr>
                        </form>`;

const addTraining = () => {
    let selector = document.getElementById('training_div');
    let temp = document.createElement('div');
    temp.innerHTML += trainingFormDiv;
    selector.appendChild(temp.children[0]);
    // selector.parentElement.innerHTML += selector.outerHTML;
}

fetch('https://xosstech.com/cvm/api/public/api/trainings', {
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
        let trainingsInfoDataLength = jsonRes.data.length;
        let trainingsInfoData = jsonRes.data;

        let trainingsInfoForm = '';
        let trainingsInfoFormSegment = trainingsInfoData.map((trainingsInfoForm) => {
            return (trainingFormDiv)
        }).join('');

        trainingsInfoForm += trainingsInfoFormSegment;
        let trainingsInfoFormContainer = document.querySelector('.training_div');
        trainingsInfoFormContainer.innerHTML = trainingsInfoForm;

        if (trainingsInfoData && trainingsInfoDataLength > 0) {
            trainingsInfoData.forEach((trainingsInfo, i) => {
                let div = document.getElementById('training_div');

                $(div.children[i]).find('[name="training_id"]').val(trainingsInfo.id);
                $(div.children[i]).find('[name="training_name"]').val(trainingsInfo.training_name);
                $(div.children[i]).find('[name="training_end"]').val(trainingsInfo.end);
                $(div.children[i]).find('[name="training_summary"]').val(trainingsInfo.training_summary);
            })
        }
    }
}).catch((err) => console.log('error', err));

const createUpdateTraining = (e) => {
    let form = $(e.target).parent().parent();
    let id = form.find('[name="training_id"]').val();

    const formData = {
        training_name: form.find('[name="training_name"]').val(),
        end: form.find('[name="training_end"]').val(),
        training_summary: form.find('[name="training_summary"]').val(),
    };

    fetch(id ? `https://xosstech.com/cvm/api/public/api/training/update/${id}` : `https://xosstech.com/cvm/api/public/api/training`,
        {
            method: "POST", mode: "cors", headers: {
                "Content-Type": "application/json", Authorization: bearer,
            }, body: JSON.stringify(formData),
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
                alert(id ? 'Data has been successfully updated' : 'Data has been successfully submitted');
                // document.getElementById("training_from").reset();
            }
        })
        .catch((err) => {
            console.log('error->', err);
            // window.location.href = "/login.html";
        });

}

const deleteTraining = (e) => {
    let form = $(e.target).parent().parent();
    let id = form.find('[name="training_id"]').val();
    console.log('id->', id);

    if (id) {
        fetch(`https://xosstech.com/cvm/api/public/api/training/delete/${id}`, {
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
                    $('.training_from_cls').on('click', function () {
                        console.log('ee->');
                        $(this).remove();
                        // $(this).parent('div.training_div').remove();
                    });
                    alert('Data has been successfully deleted');
                    window.location.reload();

                }
            })
            .catch((err) => {
                console.log('error->', err);
                // window.location.href = "/login.html";
            });
    } else {
        $('.training_from_cls').on('click', function () {
            console.log('eed->');
            $(this).remove();
            // $(this).parent('div.training_div').remove();
        });
    }
}
