import { v4 as UUID } from "uuid"
import { AuthLoginService, AuthStaffLoginService, CompanyRegistrationService } from "../service/authService.js";

export const AuthLoginController = async (req,res,next) => {
    const { data } = req.body
    try {
        const company_data = await AuthLoginService(data)
        return res.status(200).send(company_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next()
    }
}

export const AuthStaffLoginController = async (req,res,next) => {
    const { data } = req.body
    try {
        const company_data = await AuthStaffLoginService(data)
        return res.status(200).send(company_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next()
    }
}

export const CompanyRegistrationController = async (req, res, next) => {
    const { data } = req.body

    console.log('dkjd',req.body);
    
    try {
        const uuid = UUID().split('-')[0]
        const company_id = `${data?.companyName?.substring(0, 4)}_${uuid}`
        const company_data = await CompanyRegistrationService(data, company_id)

        return res.status(200).send(company_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next()
    }
}