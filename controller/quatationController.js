import { AddQuotationService, GetQuotationIDService } from "../service/quatationService.js"
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