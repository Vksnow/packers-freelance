import pool from "../config/dbConfig.js";

export const AddCustomerService = async (data, customer_id, creation_type = "web", company_id) => {
    const insertQuery = `
    INSERT INTO customer ( customer_id, party_company, party_company_gst, party_name,party_ph, email, mf_city, mt_city,shift_date,creation_type,company_id) 
    VALUES ( ?,?,?,?,?,?,?,?,?,?,?); `;
    const values = [
        customer_id, data.party_company, data.party_company_gst, data.party_name,
        data.party_ph, data.email, data.mf_city, data.mt_city, data.shift_date, creation_type, company_id
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
export const GetCustomerService = async (company_id) => {
    const getQuery = `
    select * from customer where company_id =?`;
    const values = [ company_id];
    try {
        const [get_data] = await pool.query(getQuery, values)
        return { success: true, message: "Fetched Successfully", data: get_data }
    } catch (error) {
        console.log(error, 'errr');

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}