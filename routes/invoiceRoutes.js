import express from "express";
import { AddInvoiceBillController, GetInvoiceBillController, GetInvoiceBillIDController, UpdateInvoiceBillController } from "../controller/invoiceBillController.js";
// import { AddInvoiceBillValidation, GetInvoiceBillValidation, UpdateInvoiceBillValidation, Validator } from "../utils/validation.js";

const route = express.Router()

route.post('/add-invoice-bill',AddInvoiceBillController)
route.post('/get-invoice-bill-id',GetInvoiceBillIDController)
// route.get('/get-InvoiceBill',GetInvoiceBillController)
route.patch('/update-invoice-bill',UpdateInvoiceBillController)



export default route