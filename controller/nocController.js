import { v4 as UUID } from "uuid"
import { AddNocService, GetNocService, UpdateNocService } from "../service/nocService.js"

export const AddNocController = async (req, res, next) => {
    try {
        const { data } = req.body
        const uuid = UUID().split('-')[0]
        const noc_id = `noc_${uuid}`
        const { company_id } = req.user

        const noc_data = await AddNocService(data, noc_id, company_id)
        res.send(noc_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const GetNocController = async (req, res, next) => {
    try {
        const { company_id } = req.user
        const { data } = req.body
        const noc_data = await GetNocService(company_id, data.customer_id, data.noc_id)
        console.log(noc_data, 'cisjn');

        res.send(noc_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}


export const UpdateNocController = async (req, res, next) => {
    const { data } = req.body
    const { company_id } = req.user
    try {
        const allowedFields = [ "noc_type", "noc_date", "lr_num", "lr_date" ];

        const fields = Object.keys(data).filter(f => allowedFields.includes(f))
        const values = fields.map(f => data[f])
        const noc_data = await UpdateNocService(fields, values, company_id, data.noc_id)
        return res.status(200).send(noc_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next(error)
    }
}