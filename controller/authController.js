import { v4 as UUID } from "uuid"
import { AuthLoginService, AuthStaffLoginService } from "../service/authService.js";


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