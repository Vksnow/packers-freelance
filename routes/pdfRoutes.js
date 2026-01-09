import express from "express";
import { GetLrBillValidation, GetPackingValidation, GetQuotationValidation,GetReceiptValidation,GetSurveyValidation,Validator } from "../utils/validation.js";
import { GetLrBillPdfController, GetPdfPackingController, GetPdfQuotationController, GetPdfReceiptController, GetPdfSurveyController } from "../controller/pdfController.js";
const route = express.Router()

route.post('/get-pdf-quotation',GetQuotationValidation,Validator,GetPdfQuotationController)
route.post('/get-pdf-lr_bill',GetLrBillValidation,Validator,GetLrBillPdfController)
route.post('/get-pdf-packing',GetPackingValidation,Validator,GetPdfPackingController)
route.post('/get-pdf-receipt',GetReceiptValidation,Validator,GetPdfReceiptController)
route.post('/get-pdf-survey',GetSurveyValidation,Validator,GetPdfSurveyController)


export default route