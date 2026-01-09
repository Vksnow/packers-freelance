import { body, validationResult } from "express-validator";


export const Validator = (req, res, next) => {

  const error = validationResult(req)

  console.log(error, 'jj');

  if (!error.isEmpty()) {
    return res.status(422).json({ errors: error.array(), success: false })
  } else {
    next()
  }
}

export const quotationValidation = [

  body("data.quotation_num").notEmpty().withMessage("quotation number is required"),
  body("data.customer_id").notEmpty().withMessage("Customer ID is required"),
  body("data.qt_date").notEmpty().withMessage("Quotation date is required"),
  body("data.packing_date").notEmpty().withMessage("Packing date is required"),
  body("data.delivery_date").notEmpty().isString().withMessage("Delivery date is required"),
  body("data.load_type").notEmpty().withMessage("Load type is required"),
  body("data.shipping_cost").notEmpty().withMessage("Shipping cost is required").isFloat({ min: 0 }).withMessage("Shipping cost must be a positive number"),
  body("data.advance_paid").optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage("Advance paid must be a positive number"),
  body("data.packing_charge").optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage("Packing charge must be a positive number"),
  body("data.unpacking_charge").optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage("Unpacking charge must be a positive number"),
  body("data.loading_charge").optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage("Loading charge must be a positive number"),
  body("data.unloading_charge").optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage("Unloading charge must be a positive number"),
  body("data.pac_material_charge").optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage("Packing material charge must be a positive number"),
  body("data.storage_charge").optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage("Storage charge must be a positive number"),
  body("data.pcharge_type").optional().isInt({ min: 0 }).withMessage("Packing charge type must be a number"),
  body("data.iunpcharge_type").optional().isInt({ min: 0 }).withMessage("Unpacking charge type must be a number"),
  body("data.locharge_type").optional().isInt({ min: 0 }).withMessage("Loading charge type must be a number"),
  body("data.stcharge_type").optional().isInt({ min: 0 }).withMessage("Storage charge type must be a number"),
  body("data.unlocharge_type").optional().isInt({ min: 0 }).withMessage("Unloading charge type must be a number"),
  body("data.matecharge_type").optional().isInt({ min: 0 }).withMessage("Material charge type must be a number"),
  body("data.remarks").optional().trim().isLength({ max: 500 }).withMessage("Remarks must not exceed 500 characters"),
  body("data.concerns").optional().trim().isLength({ max: 500 }).withMessage("Concerns must not exceed 500 characters"),
  body("data.gst_show_amt").optional().isFloat({ min: 0 }).withMessage("GST amount must be a positive number"),
  body("data.insurance_type").optional().trim(),
  body("data.other_easy_access").optional().isBoolean().withMessage("Other easy access must be true or false"),
  body("data.balcony_access").optional().isBoolean().withMessage("Balcony access must be true or false"),
  body("data.access_restriction").optional().isBoolean().withMessage("Access restriction must be true or false"),
  body("data.qt_gst_mode").optional().isString().withMessage("GST mode must be a string")
];

export const UpdateQuotationValidation = [
  body("data.quotation_id").notEmpty().withMessage("Customer ID is required"),
  body("data.qt_date").notEmpty().withMessage("Quotation date is required"),
  body("data.packing_date").notEmpty().withMessage("Packing date is required"),
  body("data.delivery_date").notEmpty().isString().withMessage("Delivery date is required"),
  body("data.load_type").notEmpty().withMessage("Load type is required"),
  body("data.shipping_cost").notEmpty().withMessage("Shipping cost is required").isFloat({ min: 0 }).withMessage("Shipping cost must be a positive number"),
  body("data.advance_paid").optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage("Advance paid must be a positive number"),
  body("data.packing_charge").optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage("Packing charge must be a positive number"),
  body("data.unpacking_charge").optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage("Unpacking charge must be a positive number"),
  body("data.loading_charge").optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage("Loading charge must be a positive number"),
  body("data.unloading_charge").optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage("Unloading charge must be a positive number"),
  body("data.pac_material_charge").optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage("Packing material charge must be a positive number"),
  body("data.storage_charge").optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage("Storage charge must be a positive number"),
  body("data.pcharge_type").optional().isInt({ min: 0 }).withMessage("Packing charge type must be a number"),
  body("data.iunpcharge_type").optional().isInt({ min: 0 }).withMessage("Unpacking charge type must be a number"),
  body("data.locharge_type").optional().isInt({ min: 0 }).withMessage("Loading charge type must be a number"),
  body("data.stcharge_type").optional().isInt({ min: 0 }).withMessage("Storage charge type must be a number"),
  body("data.unlocharge_type").optional().isInt({ min: 0 }).withMessage("Unloading charge type must be a number"),
  body("data.matecharge_type").optional().isInt({ min: 0 }).withMessage("Material charge type must be a number"),
  body("data.remarks").optional().trim().isLength({ max: 500 }).withMessage("Remarks must not exceed 500 characters"),
  body("data.concerns").optional().trim().isLength({ max: 500 }).withMessage("Concerns must not exceed 500 characters"),
  body("data.gst_show_amt").optional().isFloat({ min: 0 }).withMessage("GST amount must be a positive number"),
  body("data.insurance_type").optional().trim(),
  body("data.other_easy_access").optional().isBoolean().withMessage("Other easy access must be true or false"),
  body("data.balcony_access").optional().isBoolean().withMessage("Balcony access must be true or false"),
  body("data.access_restriction").optional().isBoolean().withMessage("Access restriction must be true or false"),
  body("data.qt_gst_mode").optional().isString().withMessage("GST mode must be a string")
];

export const GetQuotationValidation = [
  body("data.customer_id").notEmpty().withMessage("Customer ID is required"),
  body("data.quotation_id").notEmpty().withMessage("Customer ID is required"),
];

export const CustomerValidation = [
  body("data.create_type").trim().notEmpty().isString().withMessage("Create Type is Important"),
  body("data.party_name").trim().notEmpty().withMessage("Party name is required"),
  body("data.party_ph").trim().notEmpty().withMessage("Phone number is required").isLength({ min: 10, max: 15 }).withMessage("Invalid phone number"),
  body("data.email").trim().optional({ checkFalsy: true }).isEmail().withMessage("Invalid email address"),
  body("data.shift_date").notEmpty().withMessage("Shift date is required").isString().withMessage("Invalid date format"),
  body("data.shift_time").notEmpty().withMessage("Shift date is required").isString().withMessage("Invalid date format"),
  body("data.mf_city").trim().notEmpty().withMessage("From city is required"),
  body("data.mt_city").trim().notEmpty().withMessage("To city is required"),
];

export const LoginValidation = [
  body("data.ph_num").trim().notEmpty().withMessage("Phone number is required").isLength({ min: 10, max: 10 }).withMessage("Invalid phone number"),
];
export const LoginStaffValidation = [
  body("data.staff_user_name").trim().notEmpty().withMessage("user name not found"),
  body("data.staff_user_pass").trim().notEmpty().withMessage("user Password not found"),
];


export const SurveyValidation = [
  body("data.item_details").notEmpty().isArray({ min: 0 }).withMessage("Add minimum one item details"),
  body("data.survey_no").trim().notEmpty().withMessage("survey_no not found"),
  body("data.customer_id").trim().notEmpty().withMessage("customer_id not found")
]
export const UpdateSurveyValidation = [
  body("data.item_details").notEmpty().isArray({ min: 0 }).withMessage("Add minimum one item details"),
  body("data.survey_id").trim().notEmpty().withMessage("survey_id not found")
]
export const GetSurveyValidation = [
  body("data.customer_id").trim().notEmpty().withMessage("customer_id not found"),
  body("data.survey_id").trim().notEmpty().withMessage("survey_id not found")
]
export const PackingValidation = [
  body("data.item_details").notEmpty().isArray({ min: 0 }).withMessage("Add minimum one item details"),
  body("data.packing_no").trim().notEmpty().withMessage("packking_no not found"),
  body("data.customer_id").trim().notEmpty().withMessage("customer_id not found")
]
export const UpdatePackingValidation = [
  body("data.item_details").notEmpty().isArray({ min: 0 }).withMessage("Add minimum one item details"),
  body("data.packing_id").trim().notEmpty().withMessage("packing_id not found")
]
export const GetPackingValidation = [
  body("data.customer_id").trim().notEmpty().withMessage("customer_id not found"),
  body("data.packing_id").trim().notEmpty().withMessage("packing_id not found")
]


export const UpdateCompanyValidation = [
  body("data.company_id").optional().trim().notEmpty().withMessage("company_id is required"),
  body("data.company_name").optional().trim().notEmpty().withMessage("company_name is required"),
  body("data.user_email").optional().isEmail().withMessage("user_email must be a valid email"),
  body("data.ph_num").optional().trim().notEmpty().withMessage("ph_num cannot be empty"),
  body("data.company_status").optional().isInt().withMessage("company_status must be a number"),
  body("data.role").optional().trim().notEmpty().withMessage("role cannot be empty"),
  body("data.user_name").optional().trim().notEmpty().withMessage("user_name cannot be empty"),
  body("data.tagline").optional().trim().notEmpty().withMessage("tagline cannot be empty"),
  body("data.website").optional().isURL().withMessage("website must be a valid URL"),
  body("data.whatsapp").optional().trim().notEmpty().withMessage("whatsapp cannot be empty"),
  body("data.contact1").optional().trim().notEmpty().withMessage("contact1 cannot be empty"),
  body("data.contact2").optional().trim().notEmpty().withMessage("contact2 cannot be empty"),
  body("data.gst").optional().trim().notEmpty().withMessage("gst cannot be empty"),
  body("data.pan").optional().trim().notEmpty().withMessage("pan cannot be empty"),
  body("data.state").optional().trim().notEmpty().withMessage("state cannot be empty"),
  body("data.city").optional().trim().notEmpty().withMessage("city cannot be empty"),
  body("data.beneficiary_name").optional().trim().notEmpty().withMessage("beneficiary_name cannot be empty"),
  body("data.jurisdiction").optional().trim().notEmpty().withMessage("jurisdiction cannot be empty"),
  body("data.bank_name").optional().trim().notEmpty().withMessage("bank_name cannot be empty"),
  body("data.account_no").optional().isInt().withMessage("account_no must be a number"),
  body("data.ifsc").optional().trim().notEmpty().withMessage("ifsc cannot be empty"),
  body("data.branch").optional().trim().notEmpty().withMessage("branch cannot be empty"),
  body("data.upi_id_1").optional().trim().notEmpty().withMessage("upi_id_1 cannot be empty"),
  body("data.upi_id_2").optional().trim().notEmpty().withMessage("upi_id_2 cannot be empty"),
  body("data.upi_mobile").optional().trim().notEmpty().withMessage("upi_mobile cannot be empty"),
  body("data.qr_beneficiary_name").optional().trim().notEmpty().withMessage("qr_beneficiary_name cannot be empty"),
  body("data.subcription").optional().isBoolean().withMessage("subcription must be a number"),
  body("data.address").optional().trim().notEmpty().withMessage("address cannot be empty"),
  body("data.employee_count").optional().isInt().withMessage("employee_count must be a number"),
  body("data.logo").optional().isBoolean().withMessage("created_employee must be a number"),
  body("data.signature").optional().isBoolean().withMessage("created_employee must be a number"),
  body("data.qr_code_1").optional().isBoolean().withMessage("created_employee must be a number"),
  body("data.qr_code_2").optional().isBoolean().withMessage("created_employee must be a number"),
];

export const AddLrBillValidation = [
  body("data.customer_id").trim().notEmpty().withMessage("customer_id not found"),
  body("data.lr_no").trim().notEmpty().withMessage("lr_no not found"),
  body("data.risk_type").trim().notEmpty().withMessage("risk_type not found"),
  body("data.vehicle_no").trim().notEmpty().withMessage("vehicle_no not found"),
  body("data.v_move_from").trim().notEmpty().withMessage("v_move_from not found"),
  body("data.v_move_to").trim().notEmpty().withMessage("v_move_to not found"),
  body("data.dr_name").trim().notEmpty().withMessage("dr_name not found"),
  body("data.dr_mobile").trim().notEmpty().withMessage("dr_mobile not found"),
  body("data.dr_licence").trim().notEmpty().withMessage("dr_licence not found"),
  body("data.total_pack").notEmpty().withMessage("total_pack not found"),
  body("data.description").trim().notEmpty().withMessage("description not found"),
  body("data.actual_weight").notEmpty().withMessage("actual_weight not found"),
  body("data.charge_weight").notEmpty().withMessage("charge_weight not found"),
  body("data.charge_weight_type").trim().notEmpty().withMessage("charge_weight_type not found"),
  body("data.actual_weight_type").trim().notEmpty().withMessage("actual_weight_type not found"),
  body("data.pack_condition").trim().notEmpty().withMessage("pack_condition not found"),
  body("data.pack_remark").trim().notEmpty().withMessage("pack_remark not found"),
  body("data.freight_bill").notEmpty().withMessage("freight_bill not found"),
  body("data.freight_paid").notEmpty().withMessage("freight_paid not found"),
  body("data.freight_to_pay").notEmpty().withMessage("freight_to_pay not found"),
  body("data.total_freight").notEmpty().withMessage("total_freight not found"),
  body("data.loading_charge").notEmpty().withMessage("loading_charge not found"),
  body("data.unloading_charge").notEmpty().withMessage("unloading_charge not found"),
  body("data.st_charge").notEmpty().withMessage("st_charge not found"),
  body("data.other_charge").notEmpty().withMessage("other_charge not found"),
  body("data.lr_charge").notEmpty().withMessage("lr_charge not found"),
  body("data.gst").notEmpty().withMessage("gst not found"),
  body("data.gst_paid_type").trim().notEmpty().withMessage("gst_paid_type not found"),
  body("data.mate_insurance_type").optional().trim().notEmpty().withMessage("mate_insurance_type not found"),
  body("data.insurance_company").optional().trim().trim().notEmpty().withMessage("insurance_company not found"),
  body("data.policy_num").optional().trim().trim().notEmpty().withMessage("policy_num not found"),
  body("data.insurance_date").trim().notEmpty().withMessage("insurance_date not found"),
  body("data.insur_amount").notEmpty().withMessage("insur_amount not found"),
  body("data.incur_risk").trim().notEmpty().withMessage("incur_risk not found"),
  body("data.demurrage_charge").notEmpty().withMessage("demurrage_charge not found"),
  body("data.demurrage_type").trim().notEmpty().withMessage("demurrage_type not found"),
  body("data.applicable_after").trim().notEmpty().withMessage("applicable_after not found"),
  body("data.good_value").notEmpty().withMessage("good_value not found"),
  body("data.invoice_num").trim().notEmpty().withMessage("invoice_num not found"),
  body("data.invoice_date").trim().notEmpty().withMessage("invoice_date not found"),
  body("data.e_way_num").trim().notEmpty().withMessage("e_way_num not found"),
  body("data.e_way_generate_date").trim().notEmpty().withMessage("e_way_generate_date not found"),
  body("data.e_way_extended").trim().notEmpty().withMessage("e_way_extended not found"),
]

export const GetLrBillValidation = [
  body("data.customer_id").trim().notEmpty().withMessage("customer_id not found"),
  body("data.lr_id").trim().notEmpty().withMessage("lr_id not found")
]



export const UpdateLrBillValidation = [
  body("data.lr_id").notEmpty().withMessage("lr_ID not found"),
  body("data.risk_type").optional().trim().notEmpty().withMessage("risk_type not found"),
  body("data.vehicle_no").optional().trim().notEmpty().withMessage("vehicle_no not found"),
  body("data.v_move_from").optional().trim().notEmpty().withMessage("v_move_from not found"),
  body("data.v_move_to").optional().trim().notEmpty().withMessage("v_move_to not found"),
  body("data.dr_name").optional().trim().notEmpty().withMessage("dr_name not found"),
  body("data.dr_mobile").optional().trim().notEmpty().withMessage("dr_mobile not found"),
  body("data.dr_licence").optional().trim().notEmpty().withMessage("dr_licence not found"),
  body("data.total_pack").optional().notEmpty().withMessage("total_pack not found"),
  body("data.description").optional().trim().notEmpty().withMessage("description not found"),
  body("data.actual_weight").optional().notEmpty().withMessage("actual_weight not found"),
  body("data.charge_weight").optional().notEmpty().withMessage("charge_weight not found"),
  body("data.charge_weight_type").optional().trim().notEmpty().withMessage("charge_weight_type not found"),
  body("data.actual_weight_type").optional().trim().notEmpty().withMessage("actual_weight_type not found"),
  body("data.pack_condition").optional().trim().notEmpty().withMessage("pack_condition not found"),
  body("data.pack_remark").optional().trim().notEmpty().withMessage("pack_remark not found"),
  body("data.freight_bill").optional().notEmpty().withMessage("freight_bill not found"),
  body("data.freight_paid").optional().notEmpty().withMessage("freight_paid not found"),
  body("data.freight_to_pay").optional().notEmpty().withMessage("freight_to_pay not found"),
  body("data.total_freight").optional().notEmpty().withMessage("total_freight not found"),
  body("data.loading_charge").optional().notEmpty().withMessage("loading_charge not found"),
  body("data.unloading_charge").optional().notEmpty().withMessage("unloading_charge not found"),
  body("data.st_charge").optional().notEmpty().withMessage("st_charge not found"),
  body("data.other_charge").optional().notEmpty().withMessage("other_charge not found"),
  body("data.lr_charge").optional().notEmpty().withMessage("lr_charge not found"),
  body("data.gst").optional().notEmpty().withMessage("gst not found"),
  body("data.gst_paid_type").optional().trim().notEmpty().withMessage("gst_paid_type not found"),
  body("data.mate_insurance_type").optional().trim().notEmpty().withMessage("mate_insurance_type not found"),
  body("data.insurance_company").optional().trim().notEmpty().withMessage("insurance_company not found"),
  body("data.policy_num").optional().trim().notEmpty().withMessage("policy_num not found"),
  body("data.insurance_date").optional().trim().notEmpty().withMessage("insurance_date not found"),
  body("data.insur_amount").optional().notEmpty().withMessage("insur_amount not found"),
  body("data.incur_risk").optional().trim().notEmpty().withMessage("incur_risk not found"),
  body("data.demurrage_charge").optional().notEmpty().withMessage("demurrage_charge not found"),
  body("data.demurrage_type").optional().trim().notEmpty().withMessage("demurrage_type not found"),
  body("data.applicable_after").optional().trim().notEmpty().withMessage("applicable_after not found"),
  body("data.good_value").optional().notEmpty().withMessage("good_value not found"),
  body("data.invoice_num").optional().trim().notEmpty().withMessage("invoice_num not found"),
  body("data.invoice_date").optional().trim().notEmpty().withMessage("invoice_date not found"),
  body("data.e_way_num").optional().trim().notEmpty().withMessage("e_way_num not found"),
  body("data.e_way_generate_date").optional().trim().notEmpty().withMessage("e_way_generate_date not found"),
  body("data.e_way_extended").optional().trim().notEmpty().withMessage("e_way_extended not found"),

]

export const AddReceiptValidation = [
  body("data.receipt_no").trim().notEmpty().withMessage("receipt_no not found"),
  body("data.receipt_date").trim().notEmpty().withMessage("receipt_date not found"),
  body("data.customer_id").trim().notEmpty().withMessage("customer_id not found"),
  body("data.receipt_type").trim().notEmpty().withMessage("receipt_type not found"),
  body("data.receipt_type_no").trim().notEmpty().withMessage("receipt_type_no not found"),
  body("data.payment_type").trim().notEmpty().withMessage("payment_type not found"),
  body("data.receipt_amount").notEmpty().withMessage("receipt_amount not found").isInt().withMessage("receipt_amount must be a number"),
  body("data.payment_mode").trim().notEmpty().withMessage("payment_mode not found"),
  body("data.transaction_no").trim().notEmpty().withMessage("transaction_no not found"),
  body("data.branch").trim().notEmpty().withMessage("branch not found"),
  body("data.remark").trim().notEmpty().withMessage("remark not found"),
]
export const GetReceiptValidation = [
  body("data.receipt_id").trim().notEmpty().withMessage("receipt_id not found"),
  body("data.customer_id").trim().notEmpty().withMessage("customer_id not found"),
]

export const UpdateReceiptValidation = [body("data.receipt_date").optional().trim(),
  body("data.customer_id").optional().trim(),
  body("data.receipt_id").notEmpty().trim().withMessage("receipt_id not found"),
  body("data.receipt_type").optional().trim(),
  body("data.receipt_type_no").optional().trim(),
  body("data.payment_type").optional().trim(),
  body("data.receipt_amount").optional().isInt().withMessage("receipt_amount must be a number"),
  body("data.payment_mode").optional().trim(),
  body("data.transaction_no").optional().trim(),
  body("data.branch").optional().trim(),
  body("data.remark").optional().trim()
];

export const AddNocReceiptValidation = [
  body("data.customer_id").trim().notEmpty().withMessage("customer_id not found"),
  body("data.noc_type").trim().notEmpty().withMessage("noc_type not found"),
  body("data.noc_date").trim().notEmpty().withMessage("noc_date not found"),
  body("data.lr_num").trim().notEmpty().withMessage("lr_num not found"),
  body("data.lr_date").trim().notEmpty().withMessage("lr_date not found"),
]
export const UpdateNocReceiptValidation = [
  body("data.customer_id").trim().notEmpty().withMessage("customer_id not found"),
  body("data.noc_id").trim().notEmpty().withMessage("customer_id not found"),
  body("data.noc_type").trim().optional(),
  body("data.noc_date").trim().optional(),
  body("data.lr_num").trim().optional(), 
  body("data.lr_date").trim().optional(),
]
export const GetCustomerByIdValidation = [
  body("data.customer_id").trim().notEmpty().withMessage("customer_id not found"),
]
export const GetNocReceiptValidation = [
  body("data.customer_id").trim().notEmpty().withMessage("customer_id not found"),
  body("data.noc_id").trim().notEmpty().withMessage("noc_date not found"),
]