import { configDotenv } from "dotenv";
import pool from "../config/dbConfig.js"
configDotenv()

export const UpdateCompanyService = async (fields, values, company_id) => {
    try {
         const setClause = fields.map((field, i) => `${field} = ? `)
        const final_values = [...values, company_id]
        const updateQuery = `update  company set  ${setClause} where company_id =? `;
       
        const [update_data] = await pool.query(updateQuery, final_values)
         if (update_data.affectedRows === 0) {
            return { success: false, message: "company Id is Not Available on Database", data: update_data }
        }
         return { success: true, message: "Update Successfully", data: update_data }
    } catch (error) {
        return { success: false, message: "Internal Server Error", err: error?.sqlMessage }
    }
}