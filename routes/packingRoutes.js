import express from "express";
import {  PackingValidation, SurveyValidation, Validator } from "../utils/validation.js";

import { AddPackingController } from "../controller/packingController.js";
const route = express.Router()

route.post('/add-packing',PackingValidation,Validator,AddPackingController)



export default route