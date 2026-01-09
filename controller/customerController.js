import { v4 as UUID } from "uuid"
import { AddCustomerService, GetCustomerByIdService, GetCustomerService, updateCustomerService } from "../service/customerService.js"

export const AddCustomerController = async (req, res, next) => {
    try {
        const { data } = req.body
        const uuid = UUID().split('-')[0]
        const customer_id = `customer_${uuid}`
        const { company_id } = req.user

        const customer_data = await AddCustomerService(data, customer_id, data.create_type, company_id)
        res.send(customer_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const GetCustomerController = async (req, res, next) => {
    try {
        const { company_id } = req.user
        const {data}= req.body

        console.log(data,'jkjk');
        
        const customer_data = await GetCustomerService(company_id,data.limit,data.page,data.search_item)

        console.log(customer_data, 'cisjn');

        res.send(customer_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}
export const GetCustomerByIdController = async (req, res, next) => {
    try {
        const { company_id } = req.user
        const {data}= req.body
        const customer_data = await GetCustomerByIdService(company_id,data.customer_id)

        console.log(customer_data, 'cisjn');

        res.send(customer_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const updateCustomerController = async (req, res, next) => {
    try {
        const { data } = req.body
        const allowedField = [
            "mt_remark","mf_remark","advance_paid","advance_amount","remark","approval_type","reminder_time",'approval_date',"reminder_date",
            "shift_date","shift_time", "mf_country", "mf_state", "mf_pincode", "mf_address", "mf_floor", "mf_lift_status", 
            "mt_state","mt_pincode", "mt_address", "mt_floor", "mt_lift_status", "party_company", "party_company_gst","moving_type","email"
        ];

        const fields = Object.keys(data).filter(field => allowedField.includes(field))
        const values = fields.map(field => data[field])
        const { company_id } = req.user
        const custoner_id = data.customer_id
        console.log(company_id, fields, values);

        const customer_data = await updateCustomerService(company_id, fields, values,custoner_id)

        res.send(customer_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}