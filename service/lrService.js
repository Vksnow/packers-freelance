import pool from "../config/dbConfig.js";

export const AddlrBillService = async (data, lr_id, company_id) => {
    const insertQuery = `
    INSERT INTO lr_bill (
        lr_id,
        customer_id,company_id,lr_no,risk_type,vehicle_no,v_move_from,v_move_to,dr_name,dr_mobile,dr_licence,total_pack,description,
        actual_weight,charge_weight,charge_weight_type,actual_weight_type,pack_condition,pack_remark,freight_bill,freight_paid,freight_to_pay,
        total_freight,loading_charge,unloading_charge,st_charge,other_charge,lr_charge,gst,gst_paid_type,mate_insurance_type,
        insurance_company,policy_num,insurance_date,insur_amount,incur_risk,demurrage_charge,demurrage_type,applicable_after,
        good_value,invoice_num,invoice_date,e_way_num,e_way_generate_date,e_way_extended)
    VALUES (?,?,?,?,?,?,?,?,?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
    `;
    const values = [
        lr_id,
        data.customer_id, company_id, data.lr_no, data.risk_type, data.vehicle_no, data.v_move_from,
        data.v_move_to, data.dr_name, data.dr_mobile, data.dr_licence, data.total_pack, data.description, data.actual_weight,
        data.charge_weight, data.charge_weight_type, data.actual_weight_type, data.pack_condition, data.pack_remark, data.freight_bill,
        data.freight_paid, data.freight_to_pay, data.total_freight, data.loading_charge, data.unloading_charge, data.st_charge,
        data.other_charge, data.lr_charge, data.gst, data.gst_paid_type, data.mate_insurance_type, data.insurance_company, data.policy_num,
        data.insurance_date, data.insur_amount, data.incur_risk, data.demurrage_charge, data.demurrage_type, data.applicable_after, data.good_value,
        data.invoice_num, data.invoice_date, data.e_way_num, data.e_way_generate_date, data.e_way_extended
    ];

    try {
        const inserted_data = await pool.query(insertQuery, values)
        return { success: true, message: "Inserted Successfully", data: inserted_data }
    } catch (error) {
        console.log(error, 'errr');

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}



export const GetLrBillService = async (company_id, customer_id, lr_id) => {
    const getQuery = `
    select 
    lr1.*,
    c1.email,
    c1.mf_city,c1.mt_city,c1.shift_date,c1.shift_time,c1.mf_country,c1.mf_state,c1.mf_pincode,c1.mf_address,c1.mf_floor,
    c1.mf_lift_status,c1.mt_state,c1.mt_pincode,c1.mt_address,c1.mt_floor,
    c1.mt_lift_status,c1.party_company,c1.party_company_gst,c1.moving_type,c1.customer_status
    from lr_bill as lr1 
    inner join customer as c1 ON 
    c1.customer_id = lr1.customer_id and
    c1.customer_status = ?
    where lr1.company_id =?  and lr1.customer_id =? and lr1.lr_id =?`;
    const values = [true,company_id,  customer_id, lr_id];
    try {
        const [get_data] = await pool.query(getQuery, values)
        return { success: true, message: "Fetched Successfully", data: get_data }
    } catch (error) {

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}

export const GetLrbillIDService = async () => {
    const lrbillQuery = `select id from  lr_bill ORDER BY id DESC LIMIT 1`;

    try {
        const [get_data] = await pool.query(lrbillQuery)
        return { success: true, message: "Fetched Successfully", data: get_data }
    } catch (error) {

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}


export const UpdateLrbillService = async (fields,values, company_id,lr_id) => {
    const setClause = fields.map((field, i) => `${field} = ?`)
    const final_values = [...values, company_id,lr_id]
    const lr_billQuery = `update lr_bill set ${setClause} where  company_id =? and lr_id =?`;
    try {
        const [update_data] = await pool.query(lr_billQuery, final_values)
        if (update_data.affectedRows === 0) {
            return { success: false, message: "Lr Id is Not Available on Database", data: update_data }
        }
        return { success: true, message: "Updated Successfully", data: update_data }
    } catch (error) {

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}