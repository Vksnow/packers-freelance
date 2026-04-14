import pool from "../config/dbConfig.js";

export const AddInvoiceBillService = async (data, invoicebill_id, company_id) => {
    const insertQuery = `
INSERT INTO invoice_bill (
  invoice_bill_id,customer_id,company_id,invoice_num,invoice_date,delevery_date,lr_num,vehicle_num,
  shipment_type,moving_path_type,moving_path_remark,company_name,moving_from,moving_to,name_bill,phone_bill,gst_in_bill,country_bill,
  city_bill,state_bill,pincode_bill,address_bill,consignor_name,consignor_phone,consignor_gst,
  consignor_address,consignor_city,consignor_state, consignor_pincode, consignee_name,consignee_phone,consignee_gst,
  consignee_address,consignee_city,consignee_state,consignee_pincode,package,description,total_weight,hsnsaccode, remark_package,
  frieght_charge,advanced_paid,packing_charge_option,packing_charge_amount,unpacking_charge_option,unpacking_charge_amount,loading_charge_option,loading_charge_amount,
  unloading_charge_option,unloading_charge_amount,packing_material_charge,storage_charge,car_bike_tpt,miscellaneous_charges,
  other_charges,surcharge,gst_show_hide,gst_type,gst_percent, remark_payment, discount,insurance_type,insurance_percent,
  insurance_gst_percent,declaration_value,vehicle_Insurance_type,vehicle_insurance_percent,vehicle_insurance_gst_percent
) VALUES (
  ?,?,?,?,?,?,?,?,?,?,
  ?,?,?,?,?,?,?,?,?,?,
  ?,?,?,?,?,?,?,?,?,?,
  ?,?,?,?,?,?,?,?,?,?,
  ?,?,?,?,?,?,?,?,?,?,
  ?,?,?,?,?,?,?,?,?,?,
  ?,?,?,?,?,?,?,?,?
);
`;
    const values = [
        invoicebill_id, data.customer_id, company_id,
        data.invoice_num, data.invoice_date, data.delevery_date, data.lr_num, data.vehicle_num, data.shipment_type, data.moving_path_type,
        data.moving_path_remark, data.company_name, data.moving_from, data.moving_to, data.name_bill, data.phone_bill, data.gst_in_bill,
        data.country_bill, data.city_bill, data.state_bill, data.pincode_bill, data.address_bill, data.consignor_name, data.consignor_phone,
        data.consignor_gst, data.consignor_address, data.consignor_city, data.consignor_state, data.consignor_pincode, data.consignee_name,
        data.consignee_phone, data.consignee_gst, data.consignee_address, data.consignee_city, data.consignee_state, data.consignee_pincode,
        data.package, data.description, data.total_weight, data.hsnsaccode, data.remark_package, data.frieght_charge, data.advanced_paid,
        data.packing_charge_option, data.packing_charge_amount, data.unpacking_charge_option, data.unpacking_charge_amount, data.loading_charge_option,
        data.loading_charge_amount, data.unloading_charge_option, data.unloading_charge_amount, data.packing_material_charge, data.storage_charge,
        data.car_bike_tpt, data.miscellaneous_charges, data.other_charges, data.surcharge, data.gst_show_hide, data.gst_type, data.gst_percent,
        data.remark_payment, data.discount, data.insurance_type, data.insurance_percent, data.insurance_gst_percent, data.declaration_value,
        data.vehicle_Insurance_type, data.vehicle_insurance_percent, data.vehicle_insurance_gst_percent
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



export const GetInvoiceBillIDService = async (company_id, customer_id, invoice_bill_id) => {
    const getQuery = `
    select
    ib1.*,
    c1.email,
    c1.mf_city,c1.mt_city,c1.shift_date,c1.shift_time,c1.mf_country,c1.mf_state,c1.mf_pincode,c1.mf_address,c1.mf_floor,
    c1.mf_lift_status,c1.mt_state,c1.mt_pincode,c1.mt_address,c1.mt_floor,
    c1.mt_lift_status,c1.party_company,c1.party_company_gst,c1.moving_type,c1.customer_status
    from invoice_bill as ib1
    inner join customer as c1 ON
    c1.customer_id = ib1.customer_id and
    c1.customer_status = ?
    where ib1.company_id =?  and ib1.customer_id =? and ib1.invoice_bill_id =?`;
    const values = [true,company_id,  customer_id, invoice_bill_id];
    try {
        const [get_data] = await pool.query(getQuery, values)
        return { success: true, message: "Fetched Successfully", data: get_data }
    } catch (error) {

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}

export const GetInvoiceBillService = async (company_id) => {
    const InvoiceBillQuery = `select
    ib1.invoice_bill_id,
    c1.email,
    c1.mf_city,c1.mt_city,c1.shift_date,c1.shift_time,c1.mf_country,c1.mf_state,c1.mf_pincode,c1.mf_address,c1.mf_floor,
    c1.mf_lift_status,c1.mt_state,c1.mt_pincode,c1.mt_address,c1.mt_floor,
    c1.mt_lift_status,c1.party_company,c1.party_company_gst,c1.moving_type,c1.customer_status
    from invoice_bill as ib1
    inner join customer as c1 ON
    c1.customer_id = ib1.customer_id and
    c1.customer_status = ?
    where ib1.company_id =?  ORDER BY ib1.id DESC `;

    try {
        const [get_data] = await pool.query(InvoiceBillQuery,[true,company_id])
        return { success: true, message: "Fetched Successfully", data: get_data }
    } catch (error) {

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}


export const UpdateInvoiceBillService = async (fields,values, company_id,invoice_bill_id) => {
    const setClause = fields.map((field, i) => `${field} = ?`)
    const final_values = [...values, company_id,invoice_bill_id]
    const invoiceBillQuery = `update invoice_bill set ${setClause} where  company_id =? and invoice_bill_id =?`;
    try {
        const [update_data] = await pool.query(invoiceBillQuery, final_values)
        if (update_data.affectedRows === 0) {
            return { success: false, message: "Lr Id is Not Available on Database", data: update_data }
        }
        return { success: true, message: "Updated Successfully", data: update_data }
    } catch (error) {

        if (error.code === "23505") return { message: "Duplicate Entry Not Accepted", success: false, error: error }
        return { message: "Internal Server Error", success: false, error: error }
    }
}