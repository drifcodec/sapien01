Nf.ready(async function () {

    var data_id = U.getUrlParameter("data_id");

    if (!data_id) {
        $('#confirm').remove();
        $('#approve').remove();
        $('#reject').remove();
        $('#cancel').remove();
        disabledFields();
        return;
    }

    const currentUser = await getCurrentUser();
    const isAdministrator = await checkIsAdministrator(currentUser);
    const isCEG = await checkIsCEG(currentUser);
    const pm = await getPM(currentUser);
    let isSameCompany = false

    const vetting = await getVetting(data_id);
    console.log('vetting:', vetting);
    if (vetting) {
        S('status').setValue(vetting.status);
        S('full_name').setValue(vetting.full_name);
        S('sur_name').setValue(vetting.sur_name);
        S('project_code').setValue(vetting.project_code);
        S('company').setValue(vetting.company);
        console.log('vetting.company:', vetting.company);
        S('id_number').setValue(vetting.id_number);
        S('id_type').setValue(vetting.id_type);
        S('cell').setValue(vetting.cell);
        S('email').setValue(vetting.email);
        S('smart_key').setValue(vetting.smart_key);
        S('ms_key').setValue(vetting.ms_key);
        S('old_mh_key').setValue(vetting.old_mh_key);
        S('new_mh_key').setValue(vetting.new_mh_key);
        S('cl').setValue(vetting.cl);
        S('union_str').setValue(vetting.union_str);
        S('viro').setValue(vetting.viro);
        S('glam_key').setValue(vetting.glam_key);
        S('vetting_agent').setValue(vetting.vetting_agent);
        S('vetting_capture_date').setValue(vetting.vetting_capture_date);
        S('mie_ref').setValue(vetting.mie_ref);
        S('credit_note').setValue(vetting.credit_note);
        S('review_remark').setValue(vetting.review_remark);
        S('review_attachment').setValue(vetting.review_attachment);
        S("main_id").setValue(vetting.id)

        buildHistory(vetting.id, vetting.creator, vetting.create_time)

        isSameCompany = await checkIsSameCompany(vetting.company)
    }

    console.log('currentUser:', currentUser);
    console.log('isAdministrator:', isAdministrator);
    console.log('isCEG:', isCEG);
    console.log('pm:', pm);
    console.log('isSameCompany:', isSameCompany);
    console.log('vetting.status:', vetting.status);

    if (
        vetting.status === 'confirmed' ||
        vetting.status === 'canceled' ||
        vetting.status === 'rejected' ||
        (vetting.status === 'approved' && (isAdministrator || isCEG)) ||
        (pm && pm.is_black_list === 'yes') ||
        !isSameCompany
    ) {
        // back
        disabledFields();
        $('#confirm').remove();
        $('#approve').remove();
        $('#reject').remove();
        $('#cancel').remove();
       // $('#review_col').hide() 
        S('review_col').hide();
        S('review_remark').setReadOnly(true)
        S('review_attachment').setReadOnly(true)
    } else if (vetting.status === 'approved' && (pm && pm.is_black_list === 'no')) {
        console.log("------------------>: its Approved")
        // issuance | back
        disabledFields();
        $('#approve').remove();
        $('#reject').remove();
        $('#cancel').remove();
        S('review_remark').setReadOnly(false);
        S('review_attachment').setReadOnly(false);
    } else if ((vetting.status === undefined || vetting.status === '' || vetting.status === 'to_be_review') && (isAdministrator || isCEG)) {
        // approve | reject | back
        disabledFields();
        $('#confirm').remove();
        $('#cancel').remove();
        S('review_remark').setReadOnly(false);
        S('review_attachment').setReadOnly(false);
    } else if ((vetting.status === undefined || vetting.status === '' || vetting.status === 'to_be_review') && (pm && pm.is_black_list === 'no') && isSameCompany) {
        // cancel | back
        disabledFields();
        $('#confirm').remove();
        $('#approve').remove();
        $('#reject').remove();
        S('review_remark').setReadOnly(false);
        S('review_attachment').setReadOnly(false);
    }

    $('#confirm').on('click', async function () {
        let review_remark = S('review_remark').getValue();
        let review_attachment = S('review_attachment').getValue();
        if (review_remark !== '') {
            let isUpdateSuccess = await updateVetting(data_id, 'confirmed', review_remark, review_attachment)
            let isHistorySuccess = await saveOperationHistory('sub_vetting_application', vetting.id, 'Confirmed', review_remark, review_attachment);
            open('sub_vetting_application_list.spl', '_self');
        } else {
            Nf.promptInfo({
                message: "Please input the reason.",
                height: 150,
                width: 400,
                handler: function (btn) { }
            });
        }
    });

    $('#approve').on('click', async function () {
        let review_remark = S('review_remark').getValue();
        let review_attachment = S('review_attachment').getValue();
        if (review_remark !== '') {
            let isUpdateSuccess = await updateVetting(data_id, 'approved', review_remark, review_attachment)
            let isHistorySuccess = await saveOperationHistory('sub_vetting_application', vetting.id, 'Approved', review_remark, review_attachment);
            open('sub_vetting_application_list.spl', '_self');
        } else {
            Nf.promptInfo({
                message: "Please input the reason.",
                height: 150,
                width: 400,
                handler: function (btn) { }
            });
        }
    });

    $('#reject').on('click', async function () {
        let review_remark = S('review_remark').getValue();
        let review_attachment = S('review_attachment').getValue();
        if (review_remark !== '') {
            let isUpdateSuccess = await updateVetting(data_id, 'rejected', review_remark, review_attachment)
            let isHistorySuccess = await saveOperationHistory('sub_vetting_application', vetting.id, 'Rejected', review_remark, review_attachment);
            open('sub_vetting_application_list.spl', '_self');
        } else {
            Nf.promptInfo({
                message: "Please input the reason.",
                height: 150,
                width: 400,
                handler: function (btn) { }
            });
        }
    });


    $('#cancel').on('click', async function () {
        let review_remark = S('review_remark').getValue();
        let review_attachment = S('review_attachment').getValue();
        if (review_remark !== '') {
            let isUpdateSuccess = await updateVetting(data_id, 'canceled', review_remark, review_attachment)
            let isHistorySuccess = await saveOperationHistory('sub_vetting_application', vetting.id, 'Canceled', review_remark, review_attachment);
            console.log
            // open('sub_vetting_application_list.spl', '_self');
        } else {
            Nf.promptInfo({
                message: "Please input the reason.",
                height: 150,
                width: 400,
                handler: function (btn) { }
            });
        }
    });

});

function disabledFields() {
    S('status').setReadOnly(true);
    S('full_name').setReadOnly(true);
    S('sur_name').setReadOnly(true);
    S('project_code').setReadOnly(true);
    S('company').setReadOnly(true);
    S('id_number').setReadOnly(true);
    S('id_type').setReadOnly(true);
    S('cell').setReadOnly(true);
    S('email').setReadOnly(true);
    S('smart_key').setReadOnly(true);
    S('ms_key').setReadOnly(true);
    S('old_mh_key').setReadOnly(true);
    S('new_mh_key').setReadOnly(true);
    S('cl').setReadOnly(true);
    S('union_str').setReadOnly(true);
    S('viro').setReadOnly(true);
    S('glam_key').setReadOnly(true);
    S('vetting_agent').setReadOnly(true);
    S('vetting_capture_date').setReadOnly(true);
    S('mie_ref').setReadOnly(true);
    S('credit_note').setReadOnly(true);
    S('review_remark').setReadOnly(true);
    S('review_attachment').setReadOnly(true);
}

async function updateVetting(data_id, status, review_remark, review_attachment) {
    return new Promise((resolve, reject) => {
        MessageProcessor.process({
            serviceId: 'sub_vetting_application_update',
            data: {
                data_id: data_id,
                status: status,
                review_remark: review_remark,
                review_attachment: review_attachment
            },
            success: function (data) {
                if (data && data.result) {
                    return resolve(data.result)
                }else{
                    return resolve(false)
                }
            }
        });
    });
}

async function getVetting(data_id) {
    return new Promise((resolve, reject) => {
        MessageProcessor.process({
            serviceId: 'sub_vetting_application_get',
            data: { data_id: data_id },
            success: function (data) {
                if (data && data.result) {
                    console.log("get Vetting: ", data)
                    return resolve(data.result)
                }
            }
        });
    });
}

async function checkIsSameCompany(name) {
    return new Promise((resolve, reject) => {
        MessageProcessor.process({
            serviceId: 'sub_company_select_by_pm_getList',
            data: { start: 0, limit: 1000 },
            success: function (data) {
                if (data && data.results) {
                    let isSame = false
                    for(let i=0; i<data.results.length; i++){
                        let company = data.results[i]
                        if(company.name===name){
                            isSame = true
                            break
                        }
                    }
                    return resolve(isSame)
                }else{
                    return resolve(false)
                }
            }
        });
    });
}

async function getCurrentUser() {
    return new Promise((resolve, reject) => {
        MessageProcessor.process({
            serviceId: 'get_currentuser',
            data: {},
            success: function (data) {
                if (data && data.currentuser) {
                    return resolve(data.currentuser)
                }
            }
        });
    });
}

async function checkIsAdministrator(currentUser) {
    let result = false;
    return new Promise((resolve, reject) => {
        MessageProcessor.process({
            serviceId: 'user_role_member_getList',
            async: true,
            data: {
                member_name: currentUser,
                start: 0,
                limit: 1000
            },
            success: function (data) {
               // console.log("all data", JSON.stringify(data.results))
                if (data && data.results && typeof data.results != 'undefined' && data.results.length > 0) {
                    for (i = 0; i < data.results.length; i++) {
                        var role_name = data.results[i].role_id;
                        if (role_name == 'Administrator') {
                            result = true;
                            break;
                        }
                    }
                }
                return resolve(result);
            }
        })
    });
}

async function checkIsCEG(currentUser) {
    let result = false;
    return new Promise((resolve, reject) => {
        MessageProcessor.process({
            serviceId: 'sub_ceg_account_mangement_get',
            data: {
                account_id: currentUser,
                active: 1
            },
            success: function (data) {
                if (data && data.result && data.result.account_id) {
                    result = true;
                }
                return resolve(result)
            }
        });
    });
}

async function getPM(currentUser) {
    return new Promise((resolve, reject) => {
        MessageProcessor.process({
            serviceId: 'sub_pm_get',
            data: {
                account_id: currentUser,
                active: 1
            },
            success: function (data) {
                if (data && data.result && data.result.account_id) {
                    return resolve(data.result);
                }
                return resolve(null);
            }
        });
    });
}

async function buildHistory(source_id, creator, create_time){

    let operations = await getOperationHistory(source_id);
    if(operations){
        let isCreated = false;
        for(let i=0; i<operations.length; i++){
            let operation = operations[i];
            if(operation.operation==='Created'){
                isCreated = true;
                break;
            }
        }
        if(!isCreated){
            await createOperationHistory('sub_vetting_application', source_id, 'Created', creator, create_time, '');
            operations = await getOperationHistory(source_id);
        }

        let history = `
            <div>
                <table style="width:100%; text-align:left" border="1" borderColor="#cccccc">
                    <thead>
                        <tr style="background:#f0f0f0;">
                            <td style="height:28px; padding:5px;">Operator</td>
                            <td style="height:28px; padding:5px;">Time</td>
                            <td style="height:28px; padding:5px;">Operation</td>
                            <td style="height:28px; padding:5px;">Remark</td>
                            <td style="height:28px; padding:5px;">Attachment</td>
                        </tr>
                    </thead>
                    <tbody>`
        for(let i=0; i<operations.length; i++){
            history += `
                        <tr>
                            <td style="height:28px; padding:5px">${operations[i].operator || '-'}</td>
                            <td style="height:28px; padding:5px">${operations[i].operate_time || '-'}</td>
                            <td style="height:28px; padding:5px">${operations[i].operation || '-'}</td>
                            <td style="height:28px; padding:5px">${operations[i].remark || '-'}</td>
                            <td style="height:28px; padding:5px" id=${operations[i].operation}_files_ ></td>
                        </tr>`
            append_certificate_to_widget(operations[i].operation, operations[i].attachment)
        }
        history += `</tbody>
                </table>
            </div>
        `
        $('#history').append(history);
        append_files_to_html()
    }
}

function append_certificate_to_widget(type_name, attacment_file) {
        var objNameSets = {
            "Approved": "Approved",
            "Canceled": "Canceled",
            "Rejected": "Rejected",
            "Assuanced":"Assuanced"
        }
        var widgetPreName = objNameSets[type_name];
        if (widgetPreName) {
            S(widgetPreName + '_files').setValue(attacment_file);
        }
    }
function append_files_to_html() {
    var load_reason_attachment = [
        { value: "Approved" },
        { value: "Assuanced" },
        { value: "Rejected" },
        { value: "Canceled" },
        { value: "Disabled" },]
    for (i = 0; i < load_reason_attachment.length; i++) {
        var value = load_reason_attachment[i].value
        $("#" + value + "_files_").append($("#" + value + "_files_div"))
    }
}

async function createOperationHistory(type, source_id, operation, operator, operate_time, remark){
    return new Promise((resolve, reject)=>{
        MessageProcessor.process({
            serviceId: 'sub_operation_history_create',
            data: {
                type: type,
                source_id: source_id,
                operation: operation,
                operator: operator,
                operate_time: operate_time,
                remark: remark
            },
            success: function (data) {
                if (data && data.result) {
                    return resolve(data.result)
                }else{
                    return resolve(false);
                }
            }
        })
    });
}

async function saveOperationHistory(type, source_id, operation, remark){
    return new Promise((resolve, reject)=>{
        MessageProcessor.process({
            serviceId: 'save_operation_history',
            data: {
                type: type,
                source_id: source_id,
                operation: operation,
                remark: remark
            },
            success: function (data) {
                if (data && data.result) {
                    return resolve(data.result)
                }else{
                    return resolve(false);
                }
            }
        })
    });
}

async function getOperationHistory(source_id){
    return new Promise((resolve, reject)=>{
        MessageProcessor.process({
            serviceId: 'get_operation_history',
            data: {
                type: 'sub_vetting_application',
                source_id: source_id
            },
            success: function(data){
                if(data && data.results){
                    return resolve(data.results);
                }else{
                    return resolve(null);
                }
            }
        });
    });
}