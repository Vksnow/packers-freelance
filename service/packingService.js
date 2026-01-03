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

export const GetPackingService = async (customer_id, company_id) => {
    const packingQuery = `select * from packing_list where customer_id =? and company_id =?`;
    const surveyQuery = `select * from survey_list where customer_id =? and company_id =?`;
    const values = [customer_id, company_id];

    try {
        const [get_data] = await pool.query(packingQuery, values)
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