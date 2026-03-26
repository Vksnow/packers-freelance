import { v4 as UUID } from "uuid"
import { AddStaffService, CreateOrderOrderService, GetCompanyDashboardService, GetCompanyService, GetCompanyStaffService, UpdateCompanyService, VerifyOrderOrderService } from "../service/companyService.js";
import { RazorPay } from "../utils/razorpay.js";
import crypto from 'crypto'
export const UpdateCompanyController = async (req, res, next) => {
    const { data = {} } = req.body
    const logo = req.files?.logo?.[0];
    const signature = req.files?.signature?.[0];
    const qr_code_1 = req.files?.qr_code_1?.[0];
    const qr_code_2 = req.files?.qr_code_2?.[0];

    try {
        const allowedField = ["company_name", "user_email", "user_name",
            "tagline", "website", "whatsapp", "contact1", "contact2", "gst", "pan",
            "address", "state", "city", "jurisdiction",
            "beneficiary_name", "bank_name", "account_no", "ifsc", "branch",
            "upi_id_1", "upi_id_2", "upi_mobile", "qr_beneficiary_name",
            "logo", "signature", "qr_code_1", "qr_code_2",
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

export const AddStaffController = async (req, res, next) => {
    try {
        const { data } = req.body
        const uuid = UUID().split('-')[0]
        const staff_id = `staff_${uuid}`
        const { company_id } = req.user

        const staff_data = await AddStaffService(data, staff_id, company_id)
        res.send(staff_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}


export const GetCompanyController = async (req, res, next) => {
    try {
        const { company_id } = req.user
        const Company_data = await GetCompanyService(company_id,)
        res.send(Company_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const GetCompanyStaffController = async (req, res, next) => {
    try {
        const { company_id } = req.user
        const Company_data = await GetCompanyStaffService(company_id,)
        res.send(Company_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}
export const GetCompanyDashboardController = async (req, res, next) => {
    try {
        const { company_id } = req.user
        const Company_data = await GetCompanyDashboardService(company_id,)
        res.send(Company_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const CreateOrderStaffController = async (req, res, next) => {
    try {
        const { data } = req.body
        const { company_id } = req.user
        const order = await RazorPay.orders.create({
            amount: parseInt(data?.amount) * 100,
            currency: "INR",
            receipt: "Subscription"
        })
        const order_data = await CreateOrderOrderService(data, company_id, order)
        res.send(order_data)
    } catch (error) {
        // console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const VerifyOrderStaffController = async (req, res, next) => {
    try {
        const { data } = req.body
        const { company_id } = req.user
        const body = data.razorpay_order_id + "|" + data.razorpay_payment_id;
    
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");
        const order_data = await VerifyOrderOrderService(data, company_id, order)
        res.send(order_data)
    } catch (error) {
        // console.log(error, 'kjkdj');
        next(error.message)
    }
}