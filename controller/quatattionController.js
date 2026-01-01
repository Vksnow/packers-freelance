import { AddQuatationService } from "../service/quatationService.js"
import { v4 as UUID } from "uuid"

export const AddQuatationController = async (req, res, next) => {
    try {
        const { data } = req.body
        const { company_id } = req.user
        const uuid = UUID().split('-')[0]
        const quatation_id = `Quatation_${uuid}`
        const customer_id = `customer_${uuid}`

        const quatation_data = await AddQuatationService(data, quatation_id, company_id,customer_id)
        res.send(quatation_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)

    }
}