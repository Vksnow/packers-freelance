import express from "express";
import { CustomerValidation, Validator } from "../utils/validation.js";
import { AddCustomerController, GetCustomerController } from "../controller/customerController.js";
const route = express.Router()

route.post('/add-customer',CustomerValidation,Validator,AddCustomerController)

route.get('/get-customer',GetCustomerController)

export default route