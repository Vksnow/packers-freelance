import pool from "../config/dbConfig.js";

export const AddSurveyService = async (data,survey_id,company_id) => {
    const insertQuery = `insert into survey_list (survey_id,survey_no,item_details,customer_id,company_id)
    values  (?,?,?,?,?)`;
    const values = [survey_id,data?.survey_no,JSON.stringify(data.item_details),data.customer_id,company_id ];

    try {
        const inserted_data = await pool.query(insertQuery, values)
        return { success: true, message: "Inserted Successfully", data: inserted_data }
    } catch (error) {
        console.log(error,'errr');
        
        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}