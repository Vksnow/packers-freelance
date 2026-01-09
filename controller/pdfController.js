import { GetLrBillPdfService,  GetPdfPackingService, GetPdfQuotationService, GetPdfReceiptService, GetPdfsurveyService } from "../service/pdfService.js"

export const GetPdfQuotationController = async (req, res, next) => {
    const { data } = req.body
    const { company_id } = req.user
    try {
        const quotation_data = await GetPdfQuotationService(data.customer_id,data.quotation_id, company_id)
        return res.status(200).send(quotation_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next()
    }
}
export const GetLrBillPdfController = async (req, res, next) => {
    const { data } = req.body
    const { company_id } = req.user
    try {
        console.log(data.customer_id,data.lr_id, company_id);
        
        const pdf_data = await GetLrBillPdfService(data.customer_id,data.lr_id, company_id)
        return res.status(200).send(pdf_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next()
    }
}

export const GetPdfPackingController = async (req, res, next) => {
    const { data } = req.body
    const { company_id } = req.user
    try {
        const packing_data = await GetPdfPackingService(data.customer_id,company_id,data.packing_id)
        return res.status(200).send(packing_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next()
    }
}

export const GetPdfReceiptController = async (req, res, next) => {
    try {
        const { company_id } = req.user
        const { data } = req.body
        const receipt_data = await GetPdfReceiptService(company_id, data.customer_id, data.receipt_id)
        console.log(receipt_data, 'cisjn');

        res.send(receipt_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const GetPdfSurveyController = async (req, res, next) => {
    const { data } = req.body
    const { company_id } = req.user
    try {
        const survey_data = await GetPdfsurveyService(data.customer_id,company_id,data.survey_id)
        return res.status(200).send(survey_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next(error)
    }
}