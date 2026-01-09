import pool from "../config/dbConfig.js";

export const AddReceiptService = async (data, receipt_id, company_id) => {
    const insertQuery = `
    INSERT INTO money_receipt (
    receipt_id,
    receipt_no,receipt_date,customer_id,receipt_type,receipt_type_no,payment_type,receipt_amount,
    payment_mode,transaction_no,branch,remark,company_id)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);
    `;
    const values = [
        receipt_id,
        data.receipt_no, data.receipt_date, data.customer_id, data.receipt_type, data.receipt_type_no, data.payment_type,
        data.receipt_amount, data.payment_mode, data.transaction_no, data.branch, data.remark, company_id
    ];

    try {
        const inserted_data = await pool.query(insertQuery, values)
        return { success: true, message: "Inserted Successfully", data: inserted_data }
    } catch (error) {
        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}



export const GetReceiptService = async (company_id, customer_id, receipt_id) => {
    const getQuery = `
    select 
    mr1.*,
    c1.email,
    c1.mf_city,c1.mt_city,c1.shift_date,c1.shift_time,c1.mf_country,c1.mf_state,c1.mf_pincode,c1.mf_address,c1.mf_floor,
    c1.mf_lift_status,c1.mt_state,c1.mt_pincode,c1.mt_address,c1.mt_floor,
    c1.mt_lift_status,c1.party_company,c1.party_company_gst,c1.moving_type,c1.customer_status
    from money_receipt as mr1 
    inner join customer as c1 ON 
    c1.customer_id = mr1.customer_id and
    c1.customer_status = ?
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

export const GetReceiptIDService = async () => {
    const receiptQuery = `select id from  money_receipt ORDER BY id DESC LIMIT 1`;

    try {
        const [get_data] = await pool.query(receiptQuery)
        return { success: true, message: "Fetched Successfully", data: get_data }
    } catch (error) {

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}


export const UpdateReceiptService = async (fields, values, company_id, receipt_id) => {
    const setClause = fields.map((field, i) => `${field} = ?`)
    const final_values = [...values, company_id, receipt_id]
    const receiptQuery = `update money_receipt set ${setClause} where  company_id =? and receipt_id =?`;
    try {
        const [update_data] = await pool.query(receiptQuery, final_values)
        if (update_data.affectedRows === 0) {
            return { success: false, message: "receipt Id is Not Available on Database", data: update_data }
        }
        return { success: true, message: "Updated Successfully", data: update_data }
    } catch (error) {

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}