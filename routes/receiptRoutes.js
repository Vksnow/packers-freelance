import express from "express";
import {  AddReceiptValidation,  GetReceiptValidation,  UpdateReceiptValidation,  Validator } from "../utils/validation.js";
import { AddReceiptController, GetReceiptController, GetReceiptIDController, UpdateReceiptController } from "../controller/receiptController.js";

const route = express.Router()

route.post('/add-receipt',AddReceiptValidation,Validator,AddReceiptController)
route.post('/get-receipt',GetReceiptValidation,Validator,GetReceiptController)
route.get('/get-receipt-id',GetReceiptIDController)
route.patch('/update-receipt',UpdateReceiptValidation,Validator,UpdateReceiptController)



export default route