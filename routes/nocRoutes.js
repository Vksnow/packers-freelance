import express from "express";
import {  AddNocReceiptValidation, Validator, GetNocReceiptValidation, UpdateNocReceiptValidation } from "../utils/validation.js";
import { AddNocController, GetNocController, UpdateNocController } from "../controller/nocController.js";

const route = express.Router()

route.post('/add-noc',AddNocReceiptValidation,Validator,AddNocController)
route.post('/get-noc',GetNocReceiptValidation,Validator,GetNocController)
// route.get('/get-lrbill-id',GetLrBillIDController)
route.patch('/update-noc',UpdateNocReceiptValidation,Validator,UpdateNocController)



export default route