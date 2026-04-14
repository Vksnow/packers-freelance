import { v4 as UUID } from "uuid"
import { AddlrBillService, GetLrbillIDService, GetLrBillService, UpdateLrbillService } from "../service/lrService.js"
import { AddInvoiceBillService, GetInvoiceBillIDService, GetInvoiceBillService, UpdateInvoiceBillService } from "../service/invoiceBillService.js"

export const AddInvoiceBillController = async (req, res, next) => {
    try {
        const { data } = req.body
        const uuid = UUID().split('-')[0]
        const invoicebill_id = `invoiceBill_${uuid}`
        const { company_id } = req.user

        const lrBill_data = await AddInvoiceBillService(data, invoicebill_id, company_id)
        res.send(lrBill_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const GetInvoiceBillIDController = async (req, res, next) => {
    try {
        const { company_id } = req.user
        const { data } = req.body
        const InvoiceBill_data = await GetInvoiceBillIDService(company_id, data.customer_id, data.invoice_bill_id)
        console.log(InvoiceBill_data, 'cisjn');
        res.send(InvoiceBill_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const GetInvoiceBillController = async (req, res, next) => {

    try {
        const { company_id } = req.user
        const InvoiceBill_data = await GetInvoiceBillService(company_id)
        return res.status(200).send(InvoiceBill_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next()
    }
}

export const UpdateInvoiceBillController = async (req, res, next) => {
    const { data } = req.body
    const { company_id } = req.user
    try {
        const allowedFields = [
            "invoice_num", "invoice_date", "delevery_date", "lr_num", "vehicle_num",
            "shipment_type", "moving_path_type", "moving_path_remark", "company_name",
            "moving_from", "moving_to", "name_bill", "phone_bill", "gst_in_bill", "country_bill", "city_bill", "state_bill", "pincode_bill",
            "address_bill", "consignor_name", "consignor_phone", "consignor_gst", "consignor_address", "consignor_city", "consignor_state", "consignor_pincode",
            "consignee_name", "consignee_phone", "consignee_gst", "consignee_address", "consignee_city", "consignee_state", "consignee_pincode",
            "package", "description", "total_weight", "hsnsaccode", "remark_package",
            "frieght_charge", "advanced_paid", "packing_charge_option", "packing_charge_amount", "unpacking_charge_option",
            "unpacking_charge_amount", "loading_charge_option", "loading_charge_amount", "unloading_charge_option", "unloading_charge_amount",
            "packing_material_charge", "storage_charge", "car_bike_tpt", "miscellaneous_charges", "other_charges", "surcharge",
            "gst_show_hide", "gst_type", "gst_percent", "remark_payment", "discount",
            "insurance_type", "insurance_percent", "insurance_gst_percent", "declaration_value", "vehicle_Insurance_type",
            "vehicle_insurance_percent", "vehicle_insurance_gst_percent"
        ];
        const fields = Object.keys(data).filter(f => allowedFields.includes(f))
        const values = fields.map(f => data[f])
        const lrbill_data = await UpdateInvoiceBillService(fields, values, company_id, data.invoice_bill_id)
        return res.status(200).send(lrbill_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next(error)
    }
}