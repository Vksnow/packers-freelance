import { v4 as UUID } from "uuid"
import { AddCustomerService, GetCustomerService } from "../service/customerService.js"

export const AddCustomerController = async (req, res, next) => {
    try {
        const { data } = req.body
        const uuid = UUID().split('-')[0]
        const customer_id = `customer_${uuid}`
        const {company_id} = req.user

        
        const customer_data = await AddCustomerService(data, customer_id,"web",company_id)
        res.send(customer_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}
export const GetCustomerController = async (req, res, next) => {
    try {
        const {company_id} = req.user
        const customer_data = await GetCustomerService(company_id)

        console.log(customer_data,'cisjn');
        
        res.send(customer_data)
    } catch (error ) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}