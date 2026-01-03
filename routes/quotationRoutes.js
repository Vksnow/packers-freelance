import express from "express";
import { AddQuotationController, GetQuotationIDController } from "../controller/quatationController.js";
import { quotationValidation, Validator } from "../utils/validation.js";
const route = express.Router()

route.post('/add-quotation',quotationValidation,Validator,AddQuotationController)
route.get('/get-quotation-id',GetQuotationIDController)



export default route