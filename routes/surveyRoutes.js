import express from "express";
import { SurveyValidation, Validator } from "../utils/validation.js";
import { AddSurveyController } from "../controller/surveyController.js";
const route = express.Router()

route.post('/add-survey',SurveyValidation,Validator,AddSurveyController)



export default route