import { v4 as UUID } from "uuid"
import { AddPurchaseService, GetPurchaseService, updatePurchaseService } from "../service/purchaseService.js";


export const AddPurchaseController = async (req, res, next) => {
    try {
        const { data } = req.body
        const uuid = UUID().split('-')[0]
        const Purchase_id = `purchase_${uuid}`

        const Purchase_data = await AddPurchaseService(data, Purchase_id)
        res.send(Purchase_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}


export const GetPurchaseController = async (req, res, next) => {
    try {
        const Purchase_data = await GetPurchaseService()
        res.send(Purchase_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const updatePurchaseController = async (req, res, next) => {
    try {
        const { data } = req.body
        const allowedField = ["staff_count","price","active"];

        const fields = Object.keys(data).filter(field => allowedField.includes(field))
        const values = fields.map(field => data[field])
        const Purchase_id = data.purchase_id

        const customer_data = await updatePurchaseService( fields, values,Purchase_id)

        res.send(customer_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}


// export const DeletePurchaseController = async (req, res, next) => {
//     try {
//         const { data } = req.body
//         const Purchase_data = await DeletePurchaseService(data, data.Purchase_id)
//         res.send(Purchase_data)
//     } catch (error) {
//         console.log(error, 'kjkdj');
//         next(error.message)
//     }
// }


