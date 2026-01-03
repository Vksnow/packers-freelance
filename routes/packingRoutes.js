import express from "express";
import {  GetPackingValidation, PackingValidation, Validator } from "../utils/validation.js";

import { AddPackingController, GetPackingController, GetPackingIDController } from "../controller/packingController.js";
const route = express.Router()

route.post('/add-packing',PackingValidation,Validator,AddPackingController)
route.post('/get-packing',GetPackingValidation,Validator,GetPackingController)
route.get('/get-packing-id',GetPackingIDController)



export default route