import express from "express";
import { AuthLoginController, AuthStaffLoginController, CompanyRegistrationController } from "../controller/authController.js";
import { LoginStaffValidation, LoginValidation, Validator } from "../utils/validation.js";

const route = express.Router()

route.post('/admin_login',LoginValidation,Validator,AuthLoginController)

route.post('/staff_login',LoginStaffValidation,Validator,AuthStaffLoginController)

route.post('/company-registration',CompanyRegistrationController)


export default route