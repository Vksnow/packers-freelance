import pool from "../config/dbConfig.js";

export const AddPackingService = async (data, packing_id, company_id) => {
    const insertQuery = `insert into packing_list (packing_id,packing_no,item_details,customer_id,company_id)
    values  (?,?,?,?,?)`;
    const values = [packing_id, data?.packing_no, JSON.stringify(data.item_details), data.customer_id, company_id];

    try {
        const inserted_data = await pool.query(insertQuery, values)
        return { success: true, message: "Inserted Successfully", data: inserted_data }
    } catch (error) {
        console.log(error, 'errr');

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}

export const GetPackingService = async (customer_id, company_id,packing_id) => {
    const packingQuery = `
    select pl1.*,
    c1.email,c1.mf_city,c1.mt_city,c1.shift_date,c1.shift_time,c1.mf_country,c1.mf_state,c1.mf_pincode,
    c1.mf_address,c1.mf_floor,c1.mf_lift_status,c1.mt_state,c1.mt_pincode,c1.mt_address,
    c1.mt_floor,c1.mt_lift_status,c1.party_company,c1.party_company_gst,c1.moving_type,c1.customer_status 
    from packing_list as pl1
    inner join customer as c1 ON 
    c1.customer_id = pl1.customer_id and
    c1.customer_status = ?
    where pl1.customer_id =? and pl1.company_id =? and  pl1.packing_id=?`;
    const surveyQuery = `select * from survey_list where customer_id =? and company_id =?`;
    const values1 = [true,customer_id, company_id,packing_id];
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

export const GetPackingIDService = async () => {
    const packingQuery = `select id from  packing_list ORDER BY id DESC LIMIT 1`;

    try {
        const [get_data] = await pool.query(packingQuery)
        return { success: true, message: "Fetched Successfully", data: get_data }
    } catch (error) {

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}


export const UpdatePackingService = async (fields,values, company_id,packing_id) => {
    const setClause = fields.map((field, i) => `${field} = ?`)
    const final_values = [...values, company_id,packing_id]
    const PackingQuery = `update packing_list set ${setClause} where  company_id =? and packing_id =?`;
    try {
        const [update_data] = await pool.query(PackingQuery, final_values)
        if (update_data.affectedRows === 0) {
            return { success: false, message: "packing Id is Not Available on Database", data: update_data }
        }
        return { success: true, message: "Updated Successfully", data: update_data }
    } catch (error) {

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}