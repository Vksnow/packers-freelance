import { AddQuotationService, GetQuotationIDService, GetQuotationService, UpdateQuotationService } from "../service/quatationService.js"
import { v4 as UUID } from "uuid"

export const AddQuotationController = async (req, res, next) => {
    try {
        const { data } = req.body
        const { company_id } = req.user
        const uuid = UUID().split('-')[0]
        const quotation_id = `quotation_${uuid}`

        const quotation_data = await AddQuotationService(data, quotation_id, company_id)
        res.send(quotation_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}
export const GetQuotationIDController = async (req, res, next) => {
    try {
        const quotation_data = await GetQuotationIDService()
        res.send(quotation_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const GetQuotationController = async (req, res, next) => {
    const { data } = req.body
    const { company_id } = req.user
    try {
        const quotation_data = await GetQuotationService(data.customer_id,data.quotation_id, company_id)
        return res.status(200).send(quotation_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next()
    }
}

export const UpdateQuotationController = async (req, res, next) => {
    const { data } = req.body
    const { company_id } = req.user
    try {
        const allowedFields = ["delivery_date",
            "qt_date", "packing_date", "load_type", "shipping_cost",
            "packing_charge", "advance_paid", "unpacking_charge", "loading_charge", "unloading_charge", "pac_material_charge", "storage_charge",
            "pcharge_type", "iunpcharge_type", "locharge_type", "stcharge_type", "unlocharge_type", "matecharge_type", "remarks", "gst_show_amt",
            "insurance_type", "other_easy_access", "balcony_access", "access_restriction", "concerns", "qt_gst_mode"]
        const fields = Object.keys(data).filter(f=>allowedFields.includes(f))
        const values =fields.map(f=> data[f])
        const quotation_data = await UpdateQuotationService(data.quotation_id,fields,values, company_id)
        return res.status(200).send(quotation_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next()
    }
}