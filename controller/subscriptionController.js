import { v4 as UUID } from "uuid"
import { AddSubscriptionService, DeleteSubscriptionService, GetSubscriptionService, updateSubscriptionService } from "../service/subscriptionService.js";


export const AddSubscriptionController = async (req, res, next) => {
    try {
        const { data } = req.body
        const uuid = UUID().split('-')[0]
        const subscription_id = `subscription_${uuid}`

        const subscription_data = await AddSubscriptionService(data, subscription_id)
        res.send(subscription_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}


export const GetSubscriptionController = async (req, res, next) => {
    try {
        const subscription_data = await GetSubscriptionService()
        res.send(subscription_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const updateSubscriptionController = async (req, res, next) => {
    try {
        const { data } = req.body
        const allowedField = ["subscription_amount","supscription_type","status"];

        const fields = Object.keys(data).filter(field => allowedField.includes(field))
        const values = fields.map(field => data[field])
        const subscription_id = data.subscription_id

        const customer_data = await updateSubscriptionService( fields, values,subscription_id)

        res.send(customer_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}


export const DeleteSubscriptionController = async (req, res, next) => {
    try {
        const { data } = req.body
        const subscription_data = await DeleteSubscriptionService(data, data.subscription_id)
        res.send(subscription_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}


