import express from "express";

import { AddPurchaseController, GetPurchaseController, updatePurchaseController } from "../controller/purchaseController.js";
import { AddStaffPurchaseValidation, UpdateStaffPurchaseValidation, Validator } from "../utils/validation.js";

const route = express.Router()


route.post('/add-staff-purchase',AddStaffPurchaseValidation,Validator,AddPurchaseController)
route.get('/get-staff-purchase',GetPurchaseController)
route.patch('/update-staff-purchase',UpdateStaffPurchaseValidation,Validator,updatePurchaseController)





export default route