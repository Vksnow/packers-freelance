import express from "express";
import { AddQuotationController, GetQuotationController, GetQuotationIDController, UpdateQuotationController } from "../controller/quatationController.js";
import { GetQuotationValidation, quotationValidation, UpdateQuotationValidation, Validator } from "../utils/validation.js";
const route = express.Router()

route.post('/add-quotation',quotationValidation,Validator,AddQuotationController)
route.get('/get-quotation-id',GetQuotationIDController)
route.post('/get-quotation',GetQuotationValidation,Validator,GetQuotationController)
route.post('/get-quotation',GetQuotationValidation,Validator,GetQuotationController)
route.patch('/update-quotation',UpdateQuotationValidation,Validator,UpdateQuotationController)


export default route