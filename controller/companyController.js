import { v4 as UUID } from "uuid"
import { UpdateCompanyService } from "../service/companyService.js";

export const UpdateCompanyController = async (req, res, next) => {
    const { data ={} } = req.body
    const logo = req.files?.logo?.[0];
    const signature = req.files?.signature?.[0];
    const qr_code_1 = req.files?.qr_code_1?.[0];
    const qr_code_2 = req.files?.qr_code_2?.[0];

    try {
        const allowedField = [
            "shift_date", "shift_time", "mf_country", "mf_state", "mf_pincode", "mf_address", "mf_floor", "mf_lift_status",
            "mt_state", "mt_pincode", "mt_address", "mt_floor", "mt_lift_status", "party_company", "party_company_gst", "moving_type", "email",
            "logo", "signature", "qr_code_1", "qr_code_2"
        ];

        const fields = Object.keys(data).filter(field => allowedField.includes(field))
        if (logo) fields.push("logo");
        if (signature) fields.push("signature");
        if (qr_code_1) fields.push("qr_code_1");
        if (qr_code_2) fields.push("qr_code_2");
        const values = fields.map(field => {
            switch (field) {
                case "logo": return `http://${process.env.IP}:5000/uploads/${logo?.filename}` || null;
                case "signature": return `http://${process.env.IP}:5000/uploads/${signature?.filename}` || null;
                case "qr_code_1": return `http://${process.env.IP}:5000/uploads/${qr_code_1?.filename}` || null;
                case "qr_code_2": return `http://${process.env.IP}:5000/uploads/${qr_code_2?.filename}` || null;
                default: return data[field] ?? null;
            }
        });
        const { company_id } = req.user
        const company_data = await UpdateCompanyService(fields, values, company_id)

        return res.status(200).send(company_data)
    } catch (error) {
        console.log(error, 'hshksks');
        next()
    }
}