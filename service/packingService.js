import pool from "../config/dbConfig.js";

export const AddPackingService = async (data, packing_id,company_id) => {
    const insertQuery = `insert into packing_list (packing_id,packing_no,item_details,customer_id,company_id)
    values  (?,?,?,?,?)`;
    const values = [packing_id,data?.packing_no,JSON.stringify(data.item_details),data.customer_id,company_id ];

    try {
        const inserted_data = await pool.query(insertQuery, values)
        return { success: true, message: "Inserted Successfully", data: inserted_data }
    } catch (error) {
        console.log(error,'errr');
        
        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}