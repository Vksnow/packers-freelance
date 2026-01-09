import pool from "../config/dbConfig.js";

export const AddQuotationService = async (data, quotation_id, company_id) => {
    const insertQuery = `
    INSERT INTO quotation (
    customer_id,quotation_id, company_id,quotation_num,qt_date,packing_date,delivery_date,load_type,shipping_cost,
    packing_charge,advance_paid,unpacking_charge,loading_charge,unloading_charge,pac_material_charge,storage_charge,
    pcharge_type,iunpcharge_type,locharge_type,stcharge_type,unlocharge_type,matecharge_type,remarks,gst_show_amt,
    insurance_type,other_easy_access,balcony_access,access_restriction,concerns,qt_gst_mode)
     VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?);
    `;
    const values = [data.customer_id, quotation_id, company_id, data.quotation_num, data.qt_date, data.packing_date, data.delivery_date,
    data.load_type, data.shipping_cost, data.packing_charge, data.advance_paid, data.unpacking_charge, data.loading_charge,
    data.unloading_charge, data.pac_material_charge, data.storage_charge, data.pcharge_type, data.iunpcharge_type, data.locharge_type,
    data.stcharge_type, data.unlocharge_type, data.matecharge_type, data.remarks, data.gst_show_amt, data.insurance_type,
    data.other_easy_access, data.balcony_access, data.access_restriction, data.concerns, data.qt_gst_mode
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

export const GetQuotationIDService = async (data, quotation_id, company_id) => {
    const getQuery = `select id from  quotation ORDER BY id DESC LIMIT 1;`;


    try {
        const [get_data] = await pool.query(getQuery)
        return { success: true, message: "fetched Successfully", data: get_data }
    } catch (error) {
        console.log(error, 'errr');

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}

export const GetQuotationService = async (customer_id,quotation_id, company_id) => {
    const quotationQuery = `
    select q1.*,
    c1.email,c1.mf_city,c1.mt_city,c1.shift_date,c1.shift_time,c1.mf_country,c1.mf_state,c1.mf_pincode,
    c1.mf_address,c1.mf_floor,c1.mf_lift_status,c1.mt_state,c1.mt_pincode,c1.mt_address,
    c1.mt_floor,c1.mt_lift_status,c1.party_company,c1.party_company_gst,c1.moving_type,c1.customer_status
    from quotation as q1 
    inner join customer as c1 ON 
    c1.customer_id = q1.customer_id and
    c1.customer_status = ?
    where q1.customer_id =? and q1.company_id =?  and q1.quotation_id =?`;
    const values = [true,customer_id, company_id,quotation_id];
    try {
        const [get_data] = await pool.query(quotationQuery, values)
        return { success: true, message: "Fetched Successfully", data: get_data }
    } catch (error) {
        console.log(error, 'errr');

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}
export const UpdateQuotationService = async (customer_id,fields,values, company_id) => {
    const setClause = fields.map((field, i) => `${field} = ?`)
    const final_values = [...values, customer_id, company_id]
    const quotationQuery = `update quotation set ${setClause} where quotation_id =? and company_id =?`;
    try {
        const [update_data] = await pool.query(quotationQuery, final_values)
        if (update_data.affectedRows === 0) {
            return { success: false, message: "quotation Id is Not Available on Database", data: update_data }
        }
        return { success: true, message: "Updated Successfully", data: update_data }
    } catch (error) {

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}