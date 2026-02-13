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


export const AddStaffService = async (data, staff_id, company_id) => {
  const insertQuery = `INSERT INTO staff (staff_name,staff_user_name,staff_user_pass,role,company_id,staff_id ) values (?,?,?,?,?,?)`;
  const values = [data.staff_name, data.staff_user_name, data.staff_user_pass, data.role, company_id, staff_id];
  try {
    const [inserted_data] = await pool.query(insertQuery, values)
    if (inserted_data.affectedRows === 0) {
      return { success: false, message: "Already Staff On Active", data: inserted_data }
    }
    const updateQuery = `update  company set  created_employee = created_employee + 1  where company_id =? `;
    await pool.query(updateQuery, [company_id])
   
    return { success: true, message: "Inserted Successfully", data: inserted_data }
  } catch (error) {
    console.log(error, 'errr');
    if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
    return { message: "Internal Server Error", success: false, error: error }
  }
}


export const GetCompanyService = async (company_id) => {
  const quotationQuery = `
    select  *  from company as c1 
    where c1.company_status = ? and c1.company_id=?`;
  const values = [true, company_id];
  try {
    const [get_data] = await pool.query(quotationQuery, values)
    return { success: true, message: "Fetched Successfully", data: get_data }
  } catch (error) {
    console.log(error, 'errr');

    if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
    return { message: "Internal Server Error", success: false, error: error }
  }
}

export const GetCompanyStaffService = async (company_id) => {
  const quotationQuery = `
    select 
    c1.created_employee,
    c1.employee_count,
    c1.company_name,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'staff_id', s1.staff_id,
            'staff_name', s1.staff_name,
            'mobile_num', s1.mobile_num,
            'role', s1.role,
            'status', s1.status
        )
    ) AS staff_list
    from company as c1 
    inner join staff as s1 ON 
    s1.company_id = c1.company_id and  s1.status = ?
    where c1.company_status = ? and c1.company_id=?`;

  const values = [true, true, company_id];
  try {
    const [get_data] = await pool.query(quotationQuery, values)
    return { success: true, message: "Fetched Successfully", data: get_data }
  } catch (error) {
    console.log(error, 'errr');

    if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
    return { message: "Internal Server Error", success: false, error: error }
  }
}
export const GetCompanyDashboardService = async (company_id) => {
  const quotationQuery = `
    SELECT 
    c1.company_name,c1.user_name,c1.logo,subcription,
    COUNT(DISTINCT c2.customer_id) AS customer_count,
    COUNT(DISTINCT q1.quotation_id) AS quotation_count
    FROM company AS c1
    INNER JOIN quotation AS q1
      ON q1.company_id = c1.company_id
    INNER JOIN customer AS c2
      ON c2.company_id = c1.company_id
    WHERE c1.company_status = ?
      AND c1.company_id = ?;
    `
  const values = [true, company_id];
  try {
    const [get_data] = await pool.query(quotationQuery, values)
    return { success: true, message: "Fetched Successfully", data: get_data }
  } catch (error) {
    console.log(error, 'errr');

    if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
    return { message: "Internal Server Error", success: false, error: error }
  }
}