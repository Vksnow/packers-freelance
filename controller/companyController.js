import { v4 as UUID } from "uuid"
import { CompanyRegistrationService } from "../service/companyService.js"

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