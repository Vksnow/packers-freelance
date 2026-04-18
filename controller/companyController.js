import { v4 as UUID } from "uuid"
import { AddStaffService, BuyPurchaseOrderService, CreateOrderService, FailedOrderService, FailedPurchaseOrderService, GetCompanyDashboardService, GetCompanyService, GetCompanyStaffService, UpdateCompanyService, VerifyOrderService, VerifyPurchaseOrderService } from "../service/companyService.js";
import { RazorPay } from "../utils/razorpay.js";
import crypto from 'crypto'
export const UpdateCompanyController = async (req, res, next) => {

    let { data = {} } = req.body;

    // ✅ parse if string (VERY IMPORTANT)
    if (typeof data === "string") {
        try {
            data = JSON.parse(data);
        } catch (e) {
            return res.status(400).json({
                success: false,
                message: "Invalid JSON format in data"
            });
        }
    }
    const logo = req.files?.logo?.[0];
    const signature = req.files?.signature?.[0];
    const qr_code_1 = req.files?.qr_code_1?.[0];
    const qr_code_2 = req.files?.qr_code_2?.[0];

    try {
        console.log(data, logo, signature, qr_code_1, qr_code_2, 'dataaa');
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

        console.log(fields, values, company_id, 'controller');
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
            amount: parseInt(data?.subscription_amount) * 100,
            currency: "INR",
            receipt: "Subscription"
        })
        let subscription_start = new Date();

        let subscription_end = new Date(subscription_start);
        subscription_end.setDate(subscription_end.getDate() + Number(data.days));

        const formatDate = (date) =>
            date.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

        const start_date = formatDate(subscription_start);
        const end_date = formatDate(subscription_end);

        console.log(start_date, end_date);


        const order_data = await CreateOrderService(data, company_id, order, start_date, end_date)
        res.send(order_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const VerifyOrderStaffController = async (req, res, next) => {
    try {
        const { data } = req.body;
        const { company_id } = req.user;

        console.log(data);
        const body = data?.order_id + "|" + data?.payment_id;
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        console.log("Generated:", generated_signature);
        console.log("Received :", data.signature);

        if (generated_signature === data.signature) {
            const order_data = await VerifyOrderService(data, company_id);
            return res.status(200).json(order_data);
        } else {
            await FailedOrderService(data)
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        console.log(error);

        next(error);
    }
};

export const BuyStaffOrderStaffController = async (req, res, next) => {
    try {
        const { data } = req.body
        const { company_id } = req.user
        const order = await RazorPay.orders.create({
            amount: parseInt(data?.price) * 100,
            currency: "INR",
            receipt: "staff purchase"
        })

        const order_data = await BuyPurchaseOrderService(data, company_id, order)
        res.send(order_data)
    } catch (error) {
        console.log(error, 'kjkdj');
        next(error.message)
    }
}

export const VerifyPurchaseOrderStaffController = async (req, res, next) => {
    try {
        const { data } = req.body;
        const { company_id } = req.user;

        console.log(data);
        const body = data?.order_id + "|" + data?.payment_id;
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        console.log("Generated:", generated_signature);
        console.log("Received :", data.signature);

        if (generated_signature === data.signature) {
            const order_data = await VerifyPurchaseOrderService(data, company_id);
            return res.status(200).json(order_data);
        } else {
            await FailedPurchaseOrderService(data)
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        console.log(error);

        next(error);
    }
};