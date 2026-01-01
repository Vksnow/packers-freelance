import pool from "../config/dbConfig.js";

export const AddQuatationService = async (data, quatation_id, company_id,customer_id) => {
    const insertQuery = `
INSERT INTO quatation (
customer_id,
  company_id,quatation_id, quatation_num, moving_type,
   qt_date, packing_date,delevery_date,
  mf_country, mf_state,  mf_pincode,
  mf_address, mf_floor, mf_lift_status,

  mt_country, mt_state,  mt_pincode,
  mt_address, mt_floor, mt_lift_status,

  shipping_cost, advance_paid,
  packing_charge, unpacking_charge,
  loading_charge, unloading_charge,load_type, pac_material_charge,

  storage_charge, vechile_tpt, miscellaneous_charge, other_charge,
  st_charge, octroi_green_tax,

  sur_charge_type, sur_charge_per,
  quatation_status, gst, gst_type, remarks, dicount,

  insurance_type, insurance_charge, insurance_gst, insurance_value,
  v_insurance_type, v_insurance_charge, v_insurance_gst, v_insurance_value,

  other_easy_access, other_items, restriction_destination, concerns,item_details
) VALUES ( ?,?,?, ?,?,?,?,?, ?,?,?,?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?,?,?,?,?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?,?,?,?,? );
`;
    const values = [
        customer_id,company_id, quatation_id, data.quatation_num, data.moving_type,  data.qt_date, data.packing_date, data.delevery_date,
        data.mf_country, data.mf_state, 
        data.mf_pincode,
        data.mf_address, data.mf_floor, data.mf_lift_status, data.mt_country, data.mt_state,  data.mt_pincode,
        data.mt_address, data.mt_floor, data.mt_lift_status, data.shipping_cost, data.advance_paid,
        data.packing_charge, data.unpacking_charge, data.loading_charge, data.unloading_charge,data.load_type,
        data.pac_material_charge, data.storage_charge, data.vechile_tpt, data.miscellaneous_charge,
        data.other_charge, data.st_charge, data.octroi_green_tax, data.sur_charge_type, data.sur_charge_per,data.quatation_status,
        data.gst, data.gst_type, data.remarks, data.dicount, data.insurance_type, data.insurance_charge, data.insurance_gst,
        data.insurance_value, data.v_insurance_type, data.v_insurance_charge, data.v_insurance_gst, data.v_insurance_value,
        data.other_easy_access, data.other_items, data.restriction_destination, data.concerns,JSON.stringify(data.item_details)
    ];

    try {
        const inserted_data = await pool.query(insertQuery, values)
        return { success: true, message: "Inserted Successfully", data: inserted_data }
    } catch (error) {
        console.log(error,'errr');
        
        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}