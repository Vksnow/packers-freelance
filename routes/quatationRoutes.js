import express from "express";
import { AddQuatationController } from "../controller/quatattionController.js";
import { QuatationValidation, Validator } from "../utils/validation.js";
const route = express.Router()

route.post('/add-quatation',QuatationValidation,Validator,AddQuatationController)



export default route