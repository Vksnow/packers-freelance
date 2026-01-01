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

export const QuatationValidation = [
  body("data.quatation_num").notEmpty().withMessage("Quotation number is required"),
  body("data.moving_type").trim().notEmpty().withMessage("Moving type is required"),
  body("data.qt_date").notEmpty().withMessage("Quotation date is required").isISO8601().withMessage("Invalid date format"),
  body("data.packing_date").notEmpty().withMessage("Packing date is required").isISO8601().withMessage("Invalid date format"),
  body("data.delevery_date").notEmpty().withMessage("Delivery date is required").isISO8601().withMessage("Invalid date format"),
  body("data.load_type").trim().notEmpty().withMessage("Load type is required"),
  body("data.mf_country").trim().notEmpty().withMessage("From country is required"),
  body("data.mf_state").trim().notEmpty().withMessage("From state is required"),
  body("data.mf_pincode").notEmpty().withMessage("From pincode is required").isInt().withMessage("Invalid pincode"),
  body("data.mf_address").trim().notEmpty().withMessage("From address is required"),
  body("data.mf_floor").trim().notEmpty().withMessage("From floor is required"),
  body("data.mf_lift_status").notEmpty().withMessage("From lift status is required").isBoolean().withMessage("Lift status must be 0 or 1"),
  body("data.mt_country").trim().notEmpty().withMessage("To country is required"),
  body("data.mt_state").trim().notEmpty().withMessage("To state is required"),
  body("data.mt_pincode").notEmpty().withMessage("To pincode is required").isInt().withMessage("Invalid pincode"),
  body("data.mt_address").trim().notEmpty().withMessage("To address is required"),
  body("data.mt_floor").trim().notEmpty().withMessage("To floor is required"),
  body("data.mt_lift_status").notEmpty().isBoolean().withMessage("Lift status must be 0 or 1"),
  body("data.shipping_cost").notEmpty().withMessage("Shipping cost is required").isFloat({ min: 0 }).withMessage("Invalid shipping cost"),
  body("data.advance_paid").optional().isFloat({ min: 0 }),
  body("data.packing_charge").notEmpty().withMessage("Packing charge is required").isFloat({ min: 0 }),
  body("data.unpacking_charge").optional().isFloat({ min: 0 }),
  body("data.loading_charge").optional().isFloat({ min: 0 }),
  body("data.unloading_charge").optional().isFloat({ min: 0 }),
  body("data.pac_material_charge").optional().isFloat({ min: 0 }),
  body("data.storage_charge").optional().isFloat({ min: 0 }),
  body("data.vechile_tpt").optional().isFloat({ min: 0 }),
  body("data.miscellaneous_charge").optional().isFloat({ min: 0 }),
  body("data.other_charge").optional().isFloat({ min: 0 }),
  body("data.st_charge").optional().isFloat({ min: 0 }),
  body("data.octroi_green_tax").optional().isFloat({ min: 0 }),
  body("data.sur_charge_type").optional().trim(),
  body("data.sur_charge_per").optional().isFloat({ min: 0 }),
  body("data.quatation_status").trim().optional(),
  body("data.gst").optional().isFloat({ min: 0 }),
  body("data.gst_type").optional().trim(),
  body("data.remarks").optional().trim(),
  body("data.dicount").optional().isFloat({ min: 0 }),
  body("data.insurance_type").optional().trim(),
  body("data.insurance_charge").optional().isFloat({ min: 0 }),
  body("data.insurance_gst").optional().isFloat({ min: 0 }),
  body("data.insurance_value").optional().isFloat({ min: 0 }),
  body("data.v_insurance_type").optional().trim(),
  body("data.v_insurance_charge").optional().isFloat({ min: 0 }),
  body("data.v_insurance_gst").optional().isFloat({ min: 0 }),
  body("data.v_insurance_value").optional().isFloat({ min: 0 }),
  body("data.other_easy_access").optional().trim(),
  body("data.other_items").optional().trim(),
  body("data.restriction_destination").optional().isBoolean().withMessage("Restriction destination must be boolean"),
  body("data.concerns").optional().trim(),
  body("data.item_details").optional().isArray({ min: 0 }).withMessage("Add minimum one item details")
];

export const CustomerValidation = [
  body("data.party_company").trim().optional(),
  body("data.party_company_gst").trim().optional(),
  body("data.party_name").trim().notEmpty().withMessage("Party name is required"),
  body("data.party_ph").trim().notEmpty().withMessage("Phone number is required").isLength({ min: 10, max: 15 }).withMessage("Invalid phone number"),
  body("data.email").trim().optional().isEmail().withMessage("Invalid email address"),
  body("data.shift_date").notEmpty().withMessage("Shift date is required").isISO8601().withMessage("Invalid date format"),
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
export const PackingValidation = [
  body("data.item_details").notEmpty().isArray({ min: 0 }).withMessage("Add minimum one item details"),
  body("data.packing_no").trim().notEmpty().withMessage("packking_no not found"),
  body("data.customer_id").trim().notEmpty().withMessage("customer_id not found")
]