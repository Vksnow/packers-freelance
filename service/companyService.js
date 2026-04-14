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



export const CreateOrderService = async (data, company_id, order, start_date, end_date) => {

  const insertQuery = `INSERT INTO subscription (order_id,company_id,amount,status,subscription_id,subscription_start,subscription_end ) values (?,?,?,?,?,?,?)`;
  const values = [order.id, company_id, data.subscription_amount, order.status, data.subscription_id, start_date, end_date];
  try {
    const [inserted_data] = await pool.query(insertQuery, values)
    if (inserted_data.affectedRows === 0) {
      return { success: false, message: "Already Staff On Active", data: inserted_data }
    }
    return { success: true, message: "order created", data: { order_id: order.id } }
  } catch (error) {
    console.log(error, 'errr');
    if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
    return { message: "Internal Server Error", success: false, error: error }
  }
}

export const VerifyOrderService = async (data, company_id) => {

  const updateQuery = `update subscription set active = ? , status = ? where order_id= ?`;
  const update_values = [true, 'success',data.order_id];

  const companyQuery = `update company set subcription = ? where company_id= ?`;
  const company_values = [true, company_id];
  try {
    await pool.query("BEGIN")
    const [update_data] = await pool.query(updateQuery, update_values)
    if (update_data.affectedRows === 0) {
      await pool.query("ROLLBACK")
      return { success: false, message: "Failed to verify ", data: update_data }
    } else {
      const [company_data] = await pool.query(companyQuery, company_values)
      if (company_data.affectedRows === 0) {
        await pool.query("ROLLBACK")
        return { success: false, message: "Failed to upadte Company ", data: update_data }
      }
      await pool.query("COMMIT")
      return { success: true, message: "Suscription completed", data: company_data }
    }

  } catch (error) {
    await pool.query("ROLLBACK")
    console.log(error, 'errr');
    if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
    return { message: "Internal Server Error", success: false, error: error }
  }
}

export const FailedOrderService = async (data) => {

  const updateQuery = `update subscription status = ? where order_id= ?`;
  const update_values = ['failed',data.order_id];

  try {
    await pool.query("BEGIN")
    const [update_data] = await pool.query(updateQuery, update_values)
    if (update_data.affectedRows === 0) {
      return { success: false, message: "Failed to verify ", data: update_data }
    } else {
      await pool.query("COMMIT")
      return { success: true, message: "Suscription Failed", data: company_data }
    }

  } catch (error) {
    await pool.query("ROLLBACK")
    console.log(error, 'errr');
    if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
    return { message: "Internal Server Error", success: false, error: error }
  }
}


export const BuyPurchaseOrderService = async (data, company_id, order) => {

  const insertQuery = `INSERT INTO staff_purchase (order_id,company_id,price,status,purchase_id,staff_count ) values (?,?,?,?,?,?)`;
  const values = [order.id, company_id, data.price, order.status, data.purchase_id,data.staff_count];
  try {
    const [inserted_data] = await pool.query(insertQuery, values)
    if (inserted_data.affectedRows === 0) {
      return { success: false, message: "Already Order created", data: inserted_data }
    }
    return { success: true, message: "order created", data: { order_id: order.id } }
  } catch (error) {
    console.log(error, 'errr');
    if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
    return { message: "Internal Server Error", success: false, error: error }
  }
}

export const VerifyPurchaseOrderService = async (data, company_id) => {

  const updateQuery = `update staff_purchase set active = ? , status = ? where order_id= ?`;
  const update_values = [true, 'success',data.order_id];

  const companyQuery = `update company set employee_count = employee_count + ?  where company_id= ? and subcription = ?`;
  const company_values = [data?.staff_count, company_id,true];

  try {
    await pool.query("BEGIN")
    const [update_data] = await pool.query(updateQuery, update_values)
    if (update_data.affectedRows === 0) {
      await pool.query("ROLLBACK")
      return { success: false, message: "Failed to verify ", data: update_data }
    } else {
      const [company_data] = await pool.query(companyQuery, company_values)
      if (company_data.affectedRows === 0) {
        await pool.query("ROLLBACK")
        return { success: false, message: "Failed to upadte Company ", data: update_data }
      }
      await pool.query("COMMIT")
      return { success: true, message: "Suscription completed", data: company_data }
    }

  } catch (error) {
    await pool.query("ROLLBACK")
    console.log(error, 'errr');
    if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
    return { message: "Internal Server Error", success: false, error: error }
  }
}

export const FailedPurchaseOrderService = async (data) => {

  const updateQuery = `update staff_purchase status = ? where order_id= ?`;
  const update_values = ['failed',data.order_id];

  try {
    await pool.query("BEGIN")
    const [update_data] = await pool.query(updateQuery, update_values)
    if (update_data.affectedRows === 0) {
      return { success: false, message: "Failed to verify ", data: update_data }
    } else {
      await pool.query("COMMIT")
      return { success: true, message: "Suscription Failed", data: company_data }
    }

  } catch (error) {
    await pool.query("ROLLBACK")
    console.log(error, 'errr');
    if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
    return { message: "Internal Server Error", success: false, error: error }
  }
}