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
export const GetSurveyValidation = [
  body("data.customer_id").trim().notEmpty().withMessage("customer_id not found")
]
export const PackingValidation = [
  body("data.item_details").notEmpty().isArray({ min: 0 }).withMessage("Add minimum one item details"),
  body("data.packing_no").trim().notEmpty().withMessage("packking_no not found"),
  body("data.customer_id").trim().notEmpty().withMessage("customer_id not found")
]
export const GetPackingValidation = [
  body("data.customer_id").trim().notEmpty().withMessage("customer_id not found")
]