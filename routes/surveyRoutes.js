import express from "express";
import { GetSurveyValidation, SurveyValidation, UpdateSurveyValidation, Validator } from "../utils/validation.js";
import { AddSurveyController, GetSurveyController, GetSurveyIDController, UpdateSurveyController } from "../controller/surveyController.js";
const route = express.Router()

route.post('/add-survey',SurveyValidation,Validator,AddSurveyController)
route.post('/get-survey',GetSurveyValidation,Validator,GetSurveyController)

route.get('/get-survey-id',GetSurveyIDController)
route.patch('/update-survey',UpdateSurveyValidation,Validator,UpdateSurveyController)



export default route