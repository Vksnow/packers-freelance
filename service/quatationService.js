import pool from "../config/dbConfig.js";

export const AddQuotationService = async (data, quotation_id, company_id) => {
    const insertQuery = `
    INSERT INTO quotation (
    customer_id,quotation_id, company_id,quotation_num,qt_date,packing_date,delevery_date,load_type,shipping_cost,
    packing_charge,advance_paid,unpacking_charge,loading_charge,unloading_charge,pac_material_charge,storage_charge,
    pcharge_type,iunpcharge_type,locharge_type,stcharge_type,unlocharge_type,matecharge_type,remarks,gst_show_amt,
    insurance_type,other_easy_access,balcony_access,access_restriction,concerns,qt_gst_mode)
     VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?);
    `;
    const values = [data.customer_id, quotation_id, company_id, data.quotation_num, data.qt_date, data.packing_date, data.delivery_date,
    data.load_type, data.shipping_cost, data.packing_charge, data.advance_paid, data.unpacking_charge, data.loading_charge,
    data.unloading_charge, data.pac_material_charge, data.storage_charge, data.pcharge_type, data.iunpcharge_type, data.locharge_type,
    data.stcharge_type, data.unlocharge_type, data.matecharge_type, data.remarks, data.gst_show_amt, data.insurance_type,
    data.other_easy_access, data.balcony_access, data.access_restriction, data.concerns, data.qt_gst_mode
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

export const GetQuotationIDService = async (data, quotation_id, company_id) => {
    const getQuery = `select id from  quotation ORDER BY id DESC LIMIT 1;`;


    try {
        const [get_data] = await pool.query(getQuery)
        return { success: true, message: "fetched Successfully", data: get_data }
    } catch (error) {
        console.log(error, 'errr');

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}