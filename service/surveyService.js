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


export const GetsurveyService = async (customer_id, company_id) => {
    const surveyQuery = `select * from survey_list where customer_id =? and company_id =?`;
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