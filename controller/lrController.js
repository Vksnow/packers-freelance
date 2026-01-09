import { v4 as UUID } from "uuid"
import { AddlrBillService, GetLrbillIDService, GetLrBillService, UpdateLrbillService } from "../service/lrService.js"

export const AddlrBillController = async (req, res, next) => {
    try {
        const { data } = req.body
        const uuid = UUID().split('-')[0]
        const lr_id = `lrBill_${uuid}`
        const { company_id } = req.user

        console.log(data);

        const lrBill_data = await AddlrBillService(data, lr_id, company_id)
        res.send(lrBill_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const GetLrBillController = async (req, res, next) => {
    try {
        const { company_id } = req.user
        const { data } = req.body
        const lrBill_data = await GetLrBillService(company_id, data.customer_id, data.lr_id)
        console.log(lrBill_data, 'cisjn');

        res.send(lrBill_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const GetLrBillIDController = async (req, res, next) => {

    try {
        const lrBill_data = await GetLrbillIDService()

        return res.status(200).send(lrBill_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next()
    }
}

export const UpdateLrbillController = async (req, res, next) => {
    const { data } = req.body
    const { company_id } = req.user
    try {
        const allowedFields = [
            "risk_type", "vehicle_no", "v_move_from", "v_move_to", "dr_name", "dr_mobile", "dr_licence", "total_pack",
            "description", "actual_weight", "charge_weight", "charge_weight_type", "actual_weight_type", "pack_condition", "pack_remark",
            "freight_bill", "freight_paid", "freight_to_pay", "total_freight", "loading_charge", "unloading_charge", "st_charge",
            "other_charge", "lr_charge", "gst", "gst_paid_type", "mate_insurance_type", "insurance_company", "policy_num", "insurance_date",
            "insur_amount", "incur_risk", "demurrage_charge", "demurrage_type", "applicable_after", "good_value", "invoice_num", "invoice_date",
            "e_way_num", "e_way_generate_date", "e_way_extended"
        ];

        const fields = Object.keys(data).filter(f => allowedFields.includes(f))
        const values = fields.map(f => f === "item_details" ? JSON.stringify(data[f]) : data[f])
        const lrbill_data = await UpdateLrbillService(fields, values, company_id, data.lr_id)
        return res.status(200).send(lrbill_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next(error)
    }
}