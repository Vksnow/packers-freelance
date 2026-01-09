import pool from "../config/dbConfig.js";

export const AddSurveyService = async (data, survey_id, company_id) => {
    const insertQuery = `insert into survey_list (survey_id,survey_no,item_details,customer_id,company_id)
    values  (?,?,?,?,?)`;
    const values = [survey_id, data?.survey_no, JSON.stringify(data.item_details), data.customer_id, company_id];

    try {
        const inserted_data = await pool.query(insertQuery, values)
        return { success: true, message: "Inserted Successfully", data: inserted_data }
    } catch (error) {
        console.log(error, 'errr');

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}


export const GetsurveyService = async (customer_id, company_id,survey_id) => {
    const surveyQuery = `
    select s1.*,
    c1.email,c1.mf_city,c1.mt_city,c1.shift_date,c1.shift_time,c1.mf_country,c1.mf_state,c1.mf_pincode,
    c1.mf_address,c1.mf_floor,c1.mf_lift_status,c1.mt_state,c1.mt_pincode,c1.mt_address,
    c1.mt_floor,c1.mt_lift_status,c1.party_company,c1.party_company_gst,c1.moving_type,c1.customer_status 
    from survey_list as s1
    inner join customer as c1 ON 
    c1.customer_id = s1.customer_id and
    c1.customer_status = ?
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
export const GetsurveyIDService = async (customer_id, company_id) => {
    const surveyQuery = `select id from  survey_list ORDER BY id DESC LIMIT 1`;
    const values = [customer_id, company_id];
    try {
        const [get_data] = await pool.query(surveyQuery, values)
        return { success: true, message: "Fetched Successfully", data: get_data }
    } catch (error) {
        console.log(error, 'errr');

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}

export const UpdateSurveyService = async (fields,values,survey_id, company_id) => {
    const setClause = fields.map((field, i) => `${field} = ?`)
    const final_values = [...values, survey_id, company_id]
    const SurveyQuery = `update survey_list set ${setClause} where survey_id =? and company_id =?`;
    try {
        const [update_data] = await pool.query(SurveyQuery, final_values)
        if (update_data.affectedRows === 0) {
            return { success: false, message: "survey Id is Not Available on Database", data: update_data }
        }
        return { success: true, message: "Updated Successfully", data: update_data }
    } catch (error) {

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}