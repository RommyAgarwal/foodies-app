const express = require("express");
const { protectRouter, isAuthorized } = require("../Controller/authController");


const planRouter = express.Router();

const {getAllPlan, createPlan, getPlanById,updatePlanById,deletePlanById} = require("../Controller/planController");


planRouter.route("").get(protectRouter ,getAllPlan).post(createPlan);
planRouter.route("/:id").get(protectRouter , getPlanById).patch(protectRouter , isAuthorized ,updatePlanById).delete(protectRouter , isAuthorized ,deletePlanById);

module.exports = planRouter; 