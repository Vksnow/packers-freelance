import { v4 as UUID } from "uuid"
import { AddPackingService, GetPackingIDService, GetPackingService } from "../service/packingService.js";

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
        const packing_data = await GetPackingService(data.customer_id,company_id)

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