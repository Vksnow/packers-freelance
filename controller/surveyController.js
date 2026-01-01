import { v4 as UUID } from "uuid"
import { CompanyRegistrationService } from "../service/companyService.js"
import { AddSurveyService } from "../service/surveyService.js";

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
        next()
    }
}