import express from "express";
import { AddlrBillController, GetLrBillController, GetLrBillIDController, UpdateLrbillController } from "../controller/lrController.js";
import { AddLrBillValidation, GetLrBillValidation, UpdateLrBillValidation, Validator } from "../utils/validation.js";

const route = express.Router()

route.post('/add-lrbill',AddLrBillValidation,Validator,AddlrBillController)
route.post('/get-lrbill',GetLrBillValidation,Validator,GetLrBillController)
route.get('/get-lrbill-id',GetLrBillIDController)
route.patch('/update-lrbill',UpdateLrBillValidation,Validator,UpdateLrbillController)



export default route