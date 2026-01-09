import pool from "../config/dbConfig.js";

export const GetPdfQuotationService = async (customer_id, quotation_id, company_id) => {
    const quotationQuery = `
    select JSON_OBJECT(
    'quotation_id', q1.quotation_id,
    'quotation_num', q1.quotation_num,
    'qt_date', q1.qt_date,
    'packing_date', q1.packing_date,
    'delivery_date', q1.delivery_date,
    'load_type', q1.load_type,
    'shipping_cost', q1.shipping_cost,
    'packing_charge', q1.packing_charge,
    'advance_paid', q1.advance_paid,
    'unpacking_charge', q1.unpacking_charge,
    'loading_charge', q1.loading_charge,
    'unloading_charge', q1.unloading_charge,
    'pac_material_charge', q1.pac_material_charge,
    'storage_charge', q1.storage_charge,
    'pcharge_type', q1.pcharge_type,
    'iunpcharge_type', q1.iunpcharge_type,
    'locharge_type', q1.locharge_type,
    'stcharge_type', q1.stcharge_type,
    'unlocharge_type', q1.unlocharge_type,
    'matecharge_type', q1.matecharge_type,
    'remarks', q1.remarks,
    'gst_show_amt', q1.gst_show_amt,
    'insurance_type', q1.insurance_type,
    'other_easy_access', q1.other_easy_access,
    'balcony_access', q1.balcony_access,
    'access_restriction', q1.access_restriction,
    'concerns', q1.concerns,
    'qt_gst_mode', q1.qt_gst_mode
    ) AS quotation_details,
    JSON_OBJECT(
    'customer_id', c1.customer_id,
    'party_name', c1.party_name,
    'party_ph', c1.party_ph,
    'email', c1.email,
    'mf_city', c1.mf_city,
    'mt_city', c1.mt_city,
    'shift_date', c1.shift_date,
    'creation_type', c1.creation_type,
    'company_id', c1.company_id,
    'shift_time', c1.shift_time,
    'mf_country', c1.mf_country,
    'mf_state', c1.mf_state,
    'mf_pincode', c1.mf_pincode,
    'mf_address', c1.mf_address,
    'mf_floor', c1.mf_floor,
    'mf_lift_status', c1.mf_lift_status,
    'mt_state', c1.mt_state,
    'mt_pincode', c1.mt_pincode,
    'mt_address', c1.mt_address,
    'mt_floor', c1.mt_floor,
    'mt_lift_status', c1.mt_lift_status,
    'party_company', c1.party_company,
    'party_company_gst', c1.party_company_gst,
    'moving_type', c1.moving_type,
    'advance_paid', c1.advance_paid,
    'advance_amount', c1.advance_amount,
    'remark', c1.remark,
    'approval_type', c1.approval_type,
    'reminder_time', c1.reminder_time,
    'created_at', c1.created_at,
    'approval_date', c1.approval_date,
    'reminder_date', c1.reminder_date,
    'mt_remark', c1.mt_remark,
    'mf_remark', c1.mf_remark
    ) AS customer_details,
     
    JSON_OBJECT(
    'company_id', co1.company_id,
    'company_name', co1.company_name,
    'user_email', co1.user_email,
    'ph_num', co1.ph_num,
    'company_status', co1.company_status,
    'user_name', co1.user_name,
    'tagline', co1.tagline,
    'website', co1.website,
    'whatsapp', co1.whatsapp,
    'contact1', co1.contact1,
    'contact2', co1.contact2,
    'gst', co1.gst,
    'pan', co1.pan,
    'state', co1.state,
    'city', co1.city,
    'beneficiary_name', co1.beneficiary_name,
    'jurisdiction', co1.jurisdiction,
    'qr_beneficiary_name', co1.qr_beneficiary_name,
    'logo', co1.logo,
    'signature', co1.signature
    ) AS company_details

    from quotation as q1 
    inner join customer as c1 ON 
    c1.customer_id = q1.customer_id and
    c1.customer_status = ?
    inner join company as co1 ON 
    co1.company_id = q1.company_id 
    
    where q1.customer_id =? and q1.company_id =?  and q1.quotation_id =?`;
    const values = [true, customer_id, company_id, quotation_id];
    try {
        const [get_data] = await pool.query(quotationQuery, values)
        return { success: true, message: "Fetched Successfully", data: get_data }
    } catch (error) {
        console.log(error, 'errr');

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}

export const GetLrBillPdfService = async (customer_id, lr_id, company_id) => {
    const lrBillQuery = `
    select 
    JSON_OBJECT(
    'lr_no', lr1.lr_no,
    'risk_type', lr1.risk_type,
    'vehicle_no', lr1.vehicle_no,
    'v_move_from', lr1.v_move_from,
    'v_move_to', lr1.v_move_to,
    'dr_name', lr1.dr_name,
    'dr_mobile', lr1.dr_mobile,
    'dr_licence', lr1.dr_licence,
    'total_pack', lr1.total_pack,
    'description', lr1.description,
    'actual_weight', lr1.actual_weight,
    'charge_weight', lr1.charge_weight,
    'charge_weight_type', lr1.charge_weight_type,
    'actual_weight_type', lr1.actual_weight_type,
    'pack_condition', lr1.pack_condition,
    'pack_remark', lr1.pack_remark,
    'freight_bill', lr1.freight_bill,
    'freight_paid', lr1.freight_paid,
    'freight_to_pay', lr1.freight_to_pay,
    'total_freight', lr1.total_freight,
    'loading_charge', lr1.loading_charge,
    'unloading_charge', lr1.unloading_charge,
    'st_charge', lr1.st_charge,
    'other_charge', lr1.other_charge,
    'lr_charge', lr1.lr_charge,
    'gst', lr1.gst,
    'gst_paid_type', lr1.gst_paid_type,
    'mate_insurance_type', lr1.mate_insurance_type,
    'insurance_company', lr1.insurance_company,
    'policy_num', lr1.policy_num,
    'insurance_date', lr1.insurance_date,
    'insur_amount', lr1.insur_amount,
    'incur_risk', lr1.incur_risk,
    'demurrage_charge', lr1.demurrage_charge,
    'demurrage_type', lr1.demurrage_type,
    'applicable_after', lr1.applicable_after,
    'good_value', lr1.good_value,
    'invoice_num', lr1.invoice_num,
    'invoice_date', lr1.invoice_date,
    'e_way_num', lr1.e_way_num,
    'e_way_generate_date', lr1.e_way_generate_date,
    'e_way_extended', lr1.e_way_extended
    ) AS lr_details,
    JSON_OBJECT(
    'customer_id', c1.customer_id,
    'party_name', c1.party_name,
    'party_ph', c1.party_ph,
    'email', c1.email,
    'mf_city', c1.mf_city,
    'mt_city', c1.mt_city,
    'shift_date', c1.shift_date,
    'creation_type', c1.creation_type,
    'company_id', c1.company_id,
    'shift_time', c1.shift_time,
    'mf_country', c1.mf_country,
    'mf_state', c1.mf_state,
    'mf_pincode', c1.mf_pincode,
    'mf_address', c1.mf_address,
    'mf_floor', c1.mf_floor,
    'mf_lift_status', c1.mf_lift_status,
    'mt_state', c1.mt_state,
    'mt_pincode', c1.mt_pincode,
    'mt_address', c1.mt_address,
    'mt_floor', c1.mt_floor,
    'mt_lift_status', c1.mt_lift_status,
    'party_company', c1.party_company,
    'party_company_gst', c1.party_company_gst,
    'moving_type', c1.moving_type,
    'advance_paid', c1.advance_paid,
    'advance_amount', c1.advance_amount,
    'remark', c1.remark,
    'approval_type', c1.approval_type,
    'reminder_time', c1.reminder_time,
    'created_at', c1.created_at,
    'approval_date', c1.approval_date,
    'reminder_date', c1.reminder_date,
    'mt_remark', c1.mt_remark,
    'mf_remark', c1.mf_remark
    ) AS customer_details,
     
    JSON_OBJECT(
    'company_id', co1.company_id,
    'company_name', co1.company_name,
    'user_email', co1.user_email,
    'ph_num', co1.ph_num,
    'company_status', co1.company_status,
    'user_name', co1.user_name,
    'tagline', co1.tagline,
    'website', co1.website,
    'whatsapp', co1.whatsapp,
    'contact1', co1.contact1,
    'contact2', co1.contact2,
    'gst', co1.gst,
    'pan', co1.pan,
    'state', co1.state,
    'city', co1.city,
    'beneficiary_name', co1.beneficiary_name,
    'jurisdiction', co1.jurisdiction,
    'qr_beneficiary_name', co1.qr_beneficiary_name,
    'logo', co1.logo,
    'signature', co1.signature
    ) AS company_details
    from lr_bill as lr1 
    inner join customer as c1 ON 
    c1.customer_id = lr1.customer_id and
    c1.customer_status = ?
    inner join company as co1 ON 
    co1.company_id = lr1.company_id 
    where lr1.company_id = ?  and lr1.customer_id = ? and lr1.lr_id = ?`;


    const values = [true, company_id, customer_id, lr_id];
    try {
        const [get_data] = await pool.query(lrBillQuery, values)

        return { success: true, message: "Fetched Successfully", data: get_data }
    } catch (error) {
        console.log(error, 'errr');

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}



export const GetPdfPackingService = async (customer_id, company_id, packing_id) => {
    const packingQuery = `
    select 
    JSON_OBJECT(
    'packing_id', pl1.packing_id,
    'item_details', pl1.item_details,
    'packing_no', pl1.packing_no
    ) AS packing_details,
    JSON_OBJECT(
    'customer_id', c1.customer_id,
    'party_name', c1.party_name,
    'party_ph', c1.party_ph,
    'email', c1.email,
    'mf_city', c1.mf_city,
    'mt_city', c1.mt_city,
    'shift_date', c1.shift_date,
    'creation_type', c1.creation_type,
    'company_id', c1.company_id,
    'shift_time', c1.shift_time,
    'mf_country', c1.mf_country,
    'mf_state', c1.mf_state,
    'mf_pincode', c1.mf_pincode,
    'mf_address', c1.mf_address,
    'mf_floor', c1.mf_floor,
    'mf_lift_status', c1.mf_lift_status,
    'mt_state', c1.mt_state,
    'mt_pincode', c1.mt_pincode,
    'mt_address', c1.mt_address,
    'mt_floor', c1.mt_floor,
    'mt_lift_status', c1.mt_lift_status,
    'party_company', c1.party_company,
    'party_company_gst', c1.party_company_gst,
    'moving_type', c1.moving_type,
    'advance_paid', c1.advance_paid,
    'advance_amount', c1.advance_amount,
    'remark', c1.remark,
    'approval_type', c1.approval_type,
    'reminder_time', c1.reminder_time,
    'created_at', c1.created_at,
    'approval_date', c1.approval_date,
    'reminder_date', c1.reminder_date,
    'mt_remark', c1.mt_remark,
    'mf_remark', c1.mf_remark
    ) AS customer_details,
     
    JSON_OBJECT(
    'company_id', co1.company_id,
    'company_name', co1.company_name,
    'user_email', co1.user_email,
    'ph_num', co1.ph_num,
    'company_status', co1.company_status,
    'user_name', co1.user_name,
    'tagline', co1.tagline,
    'website', co1.website,
    'whatsapp', co1.whatsapp,
    'contact1', co1.contact1,
    'contact2', co1.contact2,
    'gst', co1.gst,
    'pan', co1.pan,
    'state', co1.state,
    'city', co1.city,
    'beneficiary_name', co1.beneficiary_name,
    'jurisdiction', co1.jurisdiction,
    'qr_beneficiary_name', co1.qr_beneficiary_name,
    'logo', co1.logo,
    'signature', co1.signature
    ) AS company_details
    from packing_list as pl1
    inner join customer as c1 ON 
    c1.customer_id = pl1.customer_id and
    c1.customer_status = ?
    inner join company as co1 ON 
    co1.company_id = pl1.company_id 
    where pl1.customer_id =? and pl1.company_id =? and  pl1.packing_id=?`;
    const surveyQuery = `select * from survey_list where customer_id =? and company_id =?`;
    const values1 = [true, customer_id, company_id, packing_id];
    const values = [customer_id, company_id];

    try {
        const [get_data] = await pool.query(packingQuery, values1)
        if (get_data.length > 0) {
            return { success: true, message: "Fetched Successfully", data: get_data }
        } else {
            const [get_data] = await pool.query(surveyQuery, values)
            return { success: true, message: "Fetched Successfully", data: get_data }
        }

    } catch (error) {
        console.log(error, 'errr');

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}


export const GetPdfReceiptService = async (company_id, customer_id, receipt_id) => {
    const getQuery = `
    select 
    JSON_OBJECT(
    'receipt_no', mr1.receipt_no,
    'receipt_id', mr1.receipt_id,
    'receipt_date', mr1.receipt_date,
    'receipt_type', mr1.receipt_type,
    'receipt_type_no', mr1.receipt_type_no,
    'payment_type', mr1.payment_type,
    'receipt_amount', mr1.receipt_amount,
    'payment_mode', mr1.payment_mode,
    'transaction_no', mr1.transaction_no,
    'branch', mr1.branch,
    'remark', mr1.remark
    ) AS receipt_details,

    JSON_OBJECT(
    'customer_id', c1.customer_id,
    'party_name', c1.party_name,
    'party_ph', c1.party_ph,
    'email', c1.email,
    'mf_city', c1.mf_city,
    'mt_city', c1.mt_city,
    'shift_date', c1.shift_date,
    'creation_type', c1.creation_type,
    'company_id', c1.company_id,
    'shift_time', c1.shift_time,
    'mf_country', c1.mf_country,
    'mf_state', c1.mf_state,
    'mf_pincode', c1.mf_pincode,
    'mf_address', c1.mf_address,
    'mf_floor', c1.mf_floor,
    'mf_lift_status', c1.mf_lift_status,
    'mt_state', c1.mt_state,
    'mt_pincode', c1.mt_pincode,
    'mt_address', c1.mt_address,
    'mt_floor', c1.mt_floor,
    'mt_lift_status', c1.mt_lift_status,
    'party_company', c1.party_company,
    'party_company_gst', c1.party_company_gst,
    'moving_type', c1.moving_type,
    'advance_paid', c1.advance_paid,
    'advance_amount', c1.advance_amount,
    'remark', c1.remark,
    'approval_type', c1.approval_type,
    'reminder_time', c1.reminder_time,
    'created_at', c1.created_at,
    'approval_date', c1.approval_date,
    'reminder_date', c1.reminder_date,
    'mt_remark', c1.mt_remark,
    'mf_remark', c1.mf_remark
    ) AS customer_details,
     
    JSON_OBJECT(
    'company_id', co1.company_id,
    'company_name', co1.company_name,
    'user_email', co1.user_email,
    'ph_num', co1.ph_num,
    'company_status', co1.company_status,
    'user_name', co1.user_name,
    'tagline', co1.tagline,
    'website', co1.website,
    'whatsapp', co1.whatsapp,
    'contact1', co1.contact1,
    'contact2', co1.contact2,
    'gst', co1.gst,
    'pan', co1.pan,
    'state', co1.state,
    'city', co1.city,
    'beneficiary_name', co1.beneficiary_name,
    'jurisdiction', co1.jurisdiction,
    'qr_beneficiary_name', co1.qr_beneficiary_name,
    'logo', co1.logo,
    'signature', co1.signature
    ) AS company_details
    from money_receipt as mr1 
    inner join customer as c1 ON 
    c1.customer_id = mr1.customer_id and
    c1.customer_status = ?
    inner join company as co1 ON 
    co1.company_id = mr1.company_id 
    where mr1.company_id =?  and mr1.customer_id =? and mr1.receipt_id =?`;
    const values = [true, company_id, customer_id, receipt_id];
    try {
        const [get_data] = await pool.query(getQuery, values)
        return { success: true, message: "Fetched Successfully", data: get_data }
    } catch (error) {

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}



export const GetPdfsurveyService = async (customer_id, company_id,survey_id) => {
    const surveyQuery = `
    select 
    JSON_OBJECT(
    'survey_no', s1.survey_no,
    'survey_id', s1.survey_id,
    'item_details', s1.item_details
    ) AS survey_details,

    JSON_OBJECT(
    'customer_id', c1.customer_id,
    'party_name', c1.party_name,
    'party_ph', c1.party_ph,
    'email', c1.email,
    'mf_city', c1.mf_city,
    'mt_city', c1.mt_city,
    'shift_date', c1.shift_date,
    'creation_type', c1.creation_type,
    'company_id', c1.company_id,
    'shift_time', c1.shift_time,
    'mf_country', c1.mf_country,
    'mf_state', c1.mf_state,
    'mf_pincode', c1.mf_pincode,
    'mf_address', c1.mf_address,
    'mf_floor', c1.mf_floor,
    'mf_lift_status', c1.mf_lift_status,
    'mt_state', c1.mt_state,
    'mt_pincode', c1.mt_pincode,
    'mt_address', c1.mt_address,
    'mt_floor', c1.mt_floor,
    'mt_lift_status', c1.mt_lift_status,
    'party_company', c1.party_company,
    'party_company_gst', c1.party_company_gst,
    'moving_type', c1.moving_type,
    'advance_paid', c1.advance_paid,
    'advance_amount', c1.advance_amount,
    'remark', c1.remark,
    'approval_type', c1.approval_type,
    'reminder_time', c1.reminder_time,
    'created_at', c1.created_at,
    'approval_date', c1.approval_date,
    'reminder_date', c1.reminder_date,
    'mt_remark', c1.mt_remark,
    'mf_remark', c1.mf_remark
    ) AS customer_details,
     
    JSON_OBJECT(
    'company_id', co1.company_id,
    'company_name', co1.company_name,
    'user_email', co1.user_email,
    'ph_num', co1.ph_num,
    'company_status', co1.company_status,
    'user_name', co1.user_name,
    'tagline', co1.tagline,
    'website', co1.website,
    'whatsapp', co1.whatsapp,
    'contact1', co1.contact1,
    'contact2', co1.contact2,
    'gst', co1.gst,
    'pan', co1.pan,
    'state', co1.state,
    'city', co1.city,
    'beneficiary_name', co1.beneficiary_name,
    'jurisdiction', co1.jurisdiction,
    'qr_beneficiary_name', co1.qr_beneficiary_name,
    'logo', co1.logo,
    'signature', co1.signature
    ) AS company_details
    from survey_list as s1
    inner join customer as c1 ON 
    c1.customer_id = s1.customer_id and
    c1.customer_status = ?
    inner join company as co1 ON 
    co1.company_id = s1.company_id 
    where s1.customer_id =? and s1.company_id =? and s1.survey_id =?`;
    const values = [true,customer_id, company_id,survey_id];
    try {
        const [get_data] = await pool.query(surveyQuery, values)
        return { success: true, message: "Fetched Successfully", data: get_data }
    } catch (error) {
        console.log(error, 'errr');
        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}