import express from "express";
import { GetSurveyValidation, SurveyValidation, Validator } from "../utils/validation.js";
import { AddSurveyController, GetSurveyController, GetSurveyIDController } from "../controller/surveyController.js";
const route = express.Router()

route.post('/add-survey',SurveyValidation,Validator,AddSurveyController)
route.post('/get-survey',GetSurveyValidation,Validator,GetSurveyController)

route.get('/get-survey-id',GetSurveyIDController)



export default route