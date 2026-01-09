import express from "express";
import { CustomerValidation, GetCustomerByIdValidation, Validator } from "../utils/validation.js";
import { AddCustomerController, GetCustomerByIdController, GetCustomerController, updateCustomerController } from "../controller/customerController.js";
const route = express.Router()

route.post('/add-customer',CustomerValidation,Validator,AddCustomerController)
route.post('/get-customer',GetCustomerController)
route.post('/get-customer-byId',GetCustomerByIdValidation,Validator,GetCustomerByIdController)
route.patch('/update-customer',updateCustomerController)


export default route