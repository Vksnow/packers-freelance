import { configDotenv } from "dotenv";
import pool from "../config/dbConfig.js"
configDotenv()


export const AddSubscriptionService = async (data, subscription_id) => {
  const insertQuery = `INSERT INTO subscription_plan (subscription_id,supscription_type,subscription_amount ) values (?,?,?)`;
  const values = [subscription_id,data.supscription_type,data.subscription_amount ];
  try {
    const [inserted_data] = await pool.query(insertQuery, values)
    if (inserted_data.affectedRows === 0) {
      return { success: false, message: "subcriptuin failed to insert", data: inserted_data }
    }

    return { success: true, message: "Inserted Successfully", data: inserted_data }
  } catch (error) {
    console.log(error, 'errr');
    if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
    return { message: "Internal Server Error", success: false, error: error }
  }
}

export const GetSubscriptionService = async () => {
  const quotationQuery = `select  *  from subscription_plan`;
  try {
    const [get_data] = await pool.query(quotationQuery)
    return { success: true, message: "Fetched Successfully", data: get_data }
  } catch (error) {
    console.log(error, 'errr');

    if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
    return { message: "Internal Server Error", success: false, error: error }
  }
}

export const updateSubscriptionService = async ( fields, values, subscription_id) => {
  const setClause = fields.map((field, i) => `${field} = ? `)
  const final_values = [...values, subscription_id]
  const updateQuery = `update  subscription_plan set  ${setClause} where  subscription_id =?`;

  console.log(values,'va');
  
  try {
    const [update_data] = await pool.query(updateQuery, final_values)
    if (update_data.affectedRows === 0) {
      return { success: false, message: "subscription Id is Not Available on Database", data: update_data }
    }
    return { success: true, message: "Updated Successfully", data: update_data }
  } catch (error) {

    if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
    return { message: "Internal Server Error", success: false, error: error }
  }
}

export const DeleteSubscriptionService = async (data, subscription_id) => {
  const insertQuery = `delete from subscription_plan where subscription_id = ?`;
  const values = [subscription_id ];
  try {
    const [inserted_data] = await pool.query(insertQuery, values)
    if (inserted_data.affectedRows === 0) {
      return { success: false, message: "subcriptuin failed to insert", data: inserted_data }
    }

    return { success: true, message: "Subscription Deleted Successfully", data: inserted_data }
  } catch (error) {
    console.log(error, 'errr');
    if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
    return { message: "Internal Server Error", success: false, error: error }
  }
}