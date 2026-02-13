import pool from "../config/dbConfig.js";

export const AddCustomerService = async (data, customer_id, creation_type = "web", company_id, staff_id) => {
  const insertQuery = `
    INSERT INTO customer ( customer_id, party_name,party_ph, email, mf_city, mt_city,shift_date,creation_type,company_id,shift_time,created_by) 
    SELECT ?,?,?,?,?,?,?,?,?,?,?
    FROM dual
    WHERE
    NOT EXISTS (
        SELECT 1
        FROM customer
        WHERE party_ph = ?
          AND company_id = ?
          AND customer_status = 1 )`;
  const values = [
    customer_id, data.party_name,
    data.party_ph, data.email, data.mf_city, data.mt_city, data.shift_date, creation_type, company_id, data.shift_time, staff_id, data.party_ph, company_id,

  ];
  try {
    const [inserted_data] = await pool.query(insertQuery, values)
    if (inserted_data.affectedRows === 0) {
      return { success: false, message: "Already Customer On Active", data: inserted_data }
    }
    return { success: true, message: "Inserted Successfully", data: inserted_data }
  } catch (error) {
    console.log(error, 'errr');
    if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
    return { message: "Internal Server Error", success: false, error: error }
  }
}
export const GetCustomerService = async (
  company_id,
  limit = 5,
  page = 1,
  searchText = "",
  staff_id
) => {

  const offset = (page - 1) * limit;
  const search = `%${searchText.toLowerCase()}%`;

  let countQuery = `
    SELECT COUNT(*) AS totalRecords 
    FROM customer
    WHERE company_id = ? 
    AND customer_status = ?
    AND LOWER(party_name) LIKE ?
  `;

  let dataQuery = `
    SELECT *
    FROM customer  
    WHERE company_id = ? 
    AND customer_status = ?
    AND LOWER(party_name) LIKE ?
  `;

  let countValues = [company_id, true, search];
  let dataValues = [company_id, true, search];

  if (staff_id) {
    countQuery += ` AND created_by = ?`;
    dataQuery += ` AND created_by = ?`;

    countValues.push(staff_id);
    dataValues.push(staff_id);
  }

  dataQuery += ` ORDER BY id DESC LIMIT ? OFFSET ?`;
  dataValues.push(limit, offset);

  try {
    const [[countResult]] = await pool.query(countQuery, countValues);
    const totalRecords = countResult.totalRecords;
    const totalPages = Math.ceil(totalRecords / limit);

    const [data] = await pool.query(dataQuery, dataValues);

    return {
      success: true,
      message: "Fetched Successfully",
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalRecords,
        limit
      }
    };

  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
      error
    };
  }
};

export const GetCustomerByIdService = async (company_id, customer_id) => {

  const dataQuery = `
    SELECT 
    JSON_OBJECT(
    'survey_id', sl1.survey_id,
    'quotation_id' ,q1.quotation_id, 
    'packing_id',pl1.packing_id, 
    'noc_id',nl1.noc_id, 
    'receipt_id',mr1.receipt_id, 
    'lr_id',lr1.lr_id
    ) as list,
    JSON_OBJECT(
        'customer_id', c1.customer_id,
        'mf_country', c1.mf_country,
        'mf_state', c1.mf_state,
        'mf_pincode', c1.mf_pincode,
        'mf_address', c1.mf_address,
        'mf_floor', c1.mf_floor,
        'mf_lift_status', c1.mf_lift_status,
        'mf_remark', c1.mf_remark,
        'mt_state', c1.mt_state,
        'mt_pincode', c1.mt_pincode,
        'mt_address', c1.mt_address,
        'mt_floor', c1.mt_floor,
        'mt_lift_status', c1.mt_lift_status,
        'mt_remark', c1.mt_remark
    ) AS customer_details
    FROM customer  as c1 
    left join lr_bill as lr1 ON
    lr1.customer_id = c1.customer_id
    left join money_receipt as mr1 ON
    mr1.customer_id = c1.customer_id
    left join noc_letter as nl1 ON
    nl1.customer_id = c1.customer_id
    left join packing_list as pl1 ON
    pl1.customer_id = c1.customer_id
    left join quotation as q1 ON
    q1.customer_id = c1.customer_id
    left join survey_list as sl1 ON
    sl1.customer_id = c1.customer_id
    WHERE  c1.company_id = ? AND  c1.customer_status = ? And c1.customer_id=?;
  `;
  try {

    const [data] = await pool.query(dataQuery, [company_id, true, customer_id]);

    return { success: true, message: "Fetched Successfully", data: data, };
  } catch (error) {
    return { success: false, message: "Internal Server Error", error, };
  }
};

export const updateCustomerService = async (company_id, fields, values, customer_id) => {
  const setClause = fields.map((field, i) => `${field} = ? `)
  const final_values = [...values, company_id, customer_id]
  const updateQuery = `update  customer set  ${setClause} where company_id =? and customer_id =?`;

  console.log(updateQuery);
  try {
    const [update_data] = await pool.query(updateQuery, final_values)
    if (update_data.affectedRows === 0) {
      return { success: false, message: "custoner Id is Not Available on Database", data: update_data }
    }
    return { success: true, message: "Updated Successfully", data: update_data }
  } catch (error) {

    if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
    return { message: "Internal Server Error", success: false, error: error }
  }
}
export const GetReminderCustomerService = async (company_id, limit = 5, page = 1, searchText = "", staff_id) => {

  const offset = (page - 1) * limit;
  const search = `%${searchText.toLowerCase()}%`;

  let countQuery = `
    SELECT COUNT(*) AS totalRecords 
    FROM customer
    WHERE company_id = ?
    AND customer_status = ?
    AND reminder_status = ?
    AND LOWER(party_name) LIKE ?
  `;

  let dataQuery = `
    SELECT 
      id, customer_id, party_name, party_ph, email, 
      mf_city, mt_city, shift_date, creation_type,
      company_id, shift_time, advance_paid, advance_amount, 
      remark, approval_type, reminder_time, created_at, 
      approval_date, reminder_date
    FROM customer  
    WHERE company_id = ?
    AND customer_status = ?
    AND reminder_status = ?
    AND LOWER(party_name) LIKE ?
  `;

  let countValues = [company_id, true, true, search];
  let dataValues = [company_id, true, true, search];

  // ✅ Staff filter (same logic as before)
  if (staff_id) {
    countQuery += ` AND created_by = ?`;
    dataQuery += ` AND created_by = ?`;

    countValues.push(staff_id);
    dataValues.push(staff_id);
  }

  dataQuery += ` ORDER BY id DESC LIMIT ? OFFSET ?`;
  dataValues.push(limit, offset);

  try {
    const [[countResult]] = await pool.query(countQuery, countValues);
    const totalRecords = countResult.totalRecords;
    const totalPages = Math.ceil(totalRecords / limit);

    const [data] = await pool.query(dataQuery, dataValues);

    return {
      success: true,
      message: "Fetched Successfully",
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalRecords,
        limit
      }
    };

  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
      error
    };
  }
};
