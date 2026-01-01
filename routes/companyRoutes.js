import express from "express";
import { CompanyRegistrationController } from "../controller/companyController.js";

const route = express.Router()

route.post('/rigistration',CompanyRegistrationController)


export default route