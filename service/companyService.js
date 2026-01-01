import { configDotenv } from "dotenv";
import pool from "../config/dbConfig.js"
import jwt from "jsonwebtoken";
configDotenv()
export const CompanyRegistrationService = async (data, company_id) => {
    try {
        const query = `insert into company (company_id,company_name,user_name,user_email,ph_num) values (?,?,?,?,?); `
        const getCompanyQuery = `select * from company where company_id = ? `
        const values = [company_id, data.companyName, data.name, data.email, data.mobile]
        const [company_data] = await pool.query(query, values)
        if (company_data.affectedRows > 0) {
            let [company_data] = await pool.query(getCompanyQuery, [company_id])
            
            const payload = company_data[0]
            const token = jwt.sign(payload, process.env.JWT_TOKEN, { algorithm: "HS512", expiresIn: "1D" })

            return { success: true, message: "Company Profile Created", token: token ,data: company_data  }
        } else {
            return { success: false, message: "Company Profile Failed", data: company_data.affectedRows }
        }
    } catch (error) {
        return { success: false, message: "Internal Server Error", err: error?.sqlMessage }
    }
}