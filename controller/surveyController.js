import { v4 as UUID } from "uuid"
import { AddSurveyService, GetsurveyIDService, GetsurveyService, UpdateSurveyService } from "../service/surveyService.js";

export const AddSurveyController = async (req, res, next) => {
    const { data } = req.body
    const { company_id } = req.user
    
    try {
        const uuid = UUID().split('-')[0]
        const survey_id = `survey_${uuid}`
        const survey_data = await AddSurveyService(data, survey_id,company_id)

        return res.status(200).send(survey_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next(error)
    }
}

export const GetSurveyController = async (req, res, next) => {
    const { data } = req.body
    const { company_id } = req.user
    try {
        const survey_data = await GetsurveyService(data.customer_id,company_id,data.survey_id)
        return res.status(200).send(survey_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next(error)
    }
}
export const GetSurveyIDController = async (req, res, next) => {
    try {
        const survey_data = await GetsurveyIDService()
        return res.status(200).send(survey_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next(error)
    }
}

export const UpdateSurveyController = async (req, res, next) => {
    const { data } = req.body
    const { company_id } = req.user
    try {
         const allowedFields = ["item_details"]
        const fields = Object.keys(data).filter(f=>allowedFields.includes(f))
        const values =fields.map(f=> f === "item_details" ? JSON.stringify(data[f]) : data[f])
        const survey_data = await UpdateSurveyService(fields,values,data.survey_id,company_id)
        return res.status(200).send(survey_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next(error)
    }
}