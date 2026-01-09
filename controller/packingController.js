import { v4 as UUID } from "uuid"
import { AddPackingService, GetPackingIDService, GetPackingService, UpdatePackingService } from "../service/packingService.js";

export const AddPackingController = async (req, res, next) => {
    const { data } = req.body
    const { company_id } = req.user
    
    try {
        const uuid = UUID().split('-')[0]
        const packing_id = `packing_${uuid}`
        const packing_data = await AddPackingService(data, packing_id,company_id)

        return res.status(200).send(packing_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next()
    }
}
export const GetPackingController = async (req, res, next) => {
    const { data } = req.body
    const { company_id } = req.user
    try {
        const packing_data = await GetPackingService(data.customer_id,company_id,data.packing_id)
        return res.status(200).send(packing_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next()
    }
}
export const GetPackingIDController = async (req, res, next) => {
    
    try {
        const packing_data = await GetPackingIDService()

        return res.status(200).send(packing_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next()
    }
}

export const UpdatePackingController = async (req, res, next) => {
    const { data } = req.body
    const { company_id } = req.user
    try {
         const allowedFields = ["item_details"]
        const fields = Object.keys(data).filter(f=>allowedFields.includes(f))
        const values =fields.map(f=> f === "item_details" ? JSON.stringify(data[f]) : data[f])
        const packing_data = await UpdatePackingService(fields,values,company_id,data.packing_id)
        return res.status(200).send(packing_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next(error)
    }
}