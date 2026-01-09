import { v4 as UUID } from "uuid"
import { GetLrbillIDService, GetLrBillService, UpdateLrbillService } from "../service/lrService.js"
import { AddReceiptService, GetReceiptIDService, GetReceiptService, UpdateReceiptService } from "../service/receiptService.js"

export const AddReceiptController = async (req, res, next) => {
    try {
        const { data } = req.body
        const uuid = UUID().split('-')[0]
        const receipt_id = `receipt_${uuid}`
        const { company_id } = req.user

        const receipt_data = await AddReceiptService(data, receipt_id, company_id)
        res.send(receipt_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const GetReceiptController = async (req, res, next) => {
    try {
        const { company_id } = req.user
        const { data } = req.body
        const receipt_data = await GetReceiptService(company_id, data.customer_id, data.receipt_id)
        console.log(receipt_data, 'cisjn');

        res.send(receipt_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const GetReceiptIDController = async (req, res, next) => {

    try {
        const receipt_data = await GetReceiptIDService()

        return res.status(200).send(receipt_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next()
    }
}

export const UpdateReceiptController = async (req, res, next) => {
    const { data } = req.body
    const { company_id } = req.user
    try {
        const allowedFields = [
            "receipt_no","receipt_date","receipt_type","receipt_type_no","payment_type",
            "receipt_amount","payment_mode","transaction_no","branch","remark"
        ];
        const fields = Object.keys(data).filter(f => allowedFields.includes(f))
        const values = fields.map(f => data[f])
        const receipt_data = await UpdateReceiptService(fields, values, company_id, data.receipt_id)
        return res.status(200).send(receipt_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next(error)
    }
}