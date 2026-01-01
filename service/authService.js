import { configDotenv } from "dotenv";
import pool from "../config/dbConfig.js"
import jwt from "jsonwebtoken";
configDotenv()

export const AuthLoginService = async (data) => {
    try {
        const getCompanyQuery = `select * from company where ph_num = ? `
        let [company_data] = await pool.query(getCompanyQuery, [data.ph_num])

        if (company_data.length > 0) {
            const payload = company_data[0]
            const token = jwt.sign(payload, process.env.JWT_TOKEN, { algorithm: "HS512", expiresIn: "1D" })

            return { success: true, message: "Mobile number Found", token: token, data: company_data }
        } else {
            return { success: false, message: "Mobile number not found", token: null, data: company_data }
        }
    } catch (error) {
        return { success: false, message: "Internal Server Error", err: error?.sqlMessage }
    }
}
export const AuthStaffLoginService = async (data) => {
    try {
        const getCompanyQuery = `select * from staff where staff_user_pass = ? and staff_user_name = ? and status = ?`
        let [staff_data] = await pool.query(getCompanyQuery, [data.staff_user_pass,data.staff_user_name,true])

        if (staff_data.length > 0) {
            const payload = staff_data[0]
            const token = jwt.sign(payload, process.env.JWT_TOKEN, { algorithm: "HS512", expiresIn: "1D" })
            return { success: true, message: "Staff Found", token: token, data: staff_data }
        } else {
            return { success: false, message: "Staff not found", token: null, data: staff_data }
        }
    } catch (error) {
        return { success: false, message: "Internal Server Error", err: error?.sqlMessage }
    }
}