import pool from "../config/dbConfig.js";

export const AddNocService = async (data, noc_id, company_id) => {
    const insertQuery = `
    INSERT INTO noc_letter ( noc_id,customer_id,noc_date,noc_type,lr_num,lr_date,company_id)
    VALUES (?,?,?,?,?,?,?);`;
    const values = [noc_id, data.customer_id, data.noc_date, data.noc_type, data.lr_num, data.lr_date,company_id];

    try {
        const inserted_data = await pool.query(insertQuery, values)
        return { success: true, message: "Inserted Successfully", data: inserted_data }
    } catch (error) {
        console.log(error, 'errr');

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}



export const GetNocService = async (company_id, customer_id, noc_id) => {
    const getQuery = `
    select
    nl1.*,
    c1.email,
    c1.mf_city,c1.mt_city,c1.shift_date,c1.shift_time,c1.mf_country,c1.mf_state,c1.mf_pincode,c1.mf_address,c1.mf_floor,
    c1.mf_lift_status,c1.mt_state,c1.mt_pincode,c1.mt_address,c1.mt_floor,
    c1.mt_lift_status,c1.party_company,c1.party_company_gst,c1.moving_type,c1.customer_status
    from noc_letter as nl1
    inner join customer as c1 ON
    c1.customer_id = nl1.customer_id and
    c1.customer_status = ?
    where nl1.company_id =?  and nl1.customer_id =? and nl1.noc_id =?`;
    const values = [true,company_id,  customer_id, noc_id];
    try {
        const [get_data] = await pool.query(getQuery, values)
        return { success: true, message: "Fetched Successfully", data: get_data }
    } catch (error) {

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}


export const UpdateNocService = async (fields,values, company_id,noc_id) => {
    const setClause = fields.map((field, i) => `${field} = ?`)
    const final_values = [...values, company_id,noc_id]
    const nocQuery = `update noc_letter set ${setClause} where  company_id =? and noc_id =?`;
    try {
        const [update_data] = await pool.query(nocQuery, final_values)
        if (update_data.affectedRows === 0) {
            return { success: false, message: "Noc ID is Not Available on Database", data: update_data }
        }
        return { success: true, message: "Updated Successfully", data: update_data }
    } catch (error) {

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}