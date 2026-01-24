import express from "express";
import { AddStaffController, UpdateCompanyController } from "../controller/companyController.js";
import companyImgUpload from "../utils/imageHandling.js";
import { AddStaffValidation, UpdateCompanyValidation, Validator } from "../utils/validation.js";

const route = express.Router()

route.patch('/update-company',UpdateCompanyValidation,Validator,companyImgUpload.fields([
 { name: 'logo', maxCount: 1 },{ name: 'signature', maxCount: 1 },
 { name: 'qr_code_1', maxCount: 1 },{ name: 'qr_code_2', maxCount: 1 },
  ]),UpdateCompanyController)

route.post('/add-staff',AddStaffValidation,Validator,AddStaffController)
export default route