import express from "express";
import { AddSubscriptionController, DeleteSubscriptionController, GetSubscriptionController, updateSubscriptionController,  } from "../controller/subscriptionController.js";
import { AddSubscriptionValidation, UpdateSubscriptionValidation, Validator } from "../utils/validation.js";

const route = express.Router()


route.post('/add-subscription',AddSubscriptionValidation,Validator,AddSubscriptionController)
route.get('/get-subscription',GetSubscriptionController)
route.patch('/update-subscription',UpdateSubscriptionValidation,Validator,updateSubscriptionController)
route.post('/delete-subscription',UpdateSubscriptionValidation,Validator,DeleteSubscriptionController)

export default route