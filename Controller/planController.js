const planModel = require("../Model/plansModel");





// const plans = require("../Model/plansModel.json");
// const { v4 : uuidv4} = require("uuid");
// const fs = require("fs");
// let path = require("path");

async function getAllPlan(req, res){

    try{
        let plans = await planModel.find({});
        res.status(200).json({
            message:"Got all plans Successfully",
            data:plans
        })
    }
    catch(error){
        res.status(501).json({
        message:"Failed to get all Plan",
        error:error
    })
    }

    // if(plans.length){
    //     res.status(200).json({
    //         message: "Succesfully got all plans",
    //         data: plans
    //     })
    // }
    // else{
    //     res.status(200).json({
    //         message: "No Food Plans Found"
    //     })
    // }
    
}

async function createPlan(req, res){
    try{
        let sentPlan = req.body;
        let plan = await planModel.create(sentPlan);
        res.status(200).json({
                    message:"Plan Created Successfully",
                    data:plan
        })
    }
    catch(error){
        res.status(501).json({
            message:"Failed to create a Plan",
            error:error.errors.discount.message
        })
    }


    //alternate methd
    // let plan = req.body; 
    // planModel.create(plan).then( (plan)=>{
    //     res.status(200).json({
    //         message:"Plan Created Successfully",
    //         data:plan
    //     })
    // }).catch(error=>{
    //     res.status(501).json({
    //         message:"Failed to create a Plan",
    //         error:error.errors.discount.message
    //     })
    // })
    
    // res.status(201).json({
    //     message : "Successfully create a plan 1",
    //     data : plans
    // })

}
async function getPlanById(req,res){

    try{
        let {id} = req.params;
        let plan = await planModel.findById(id);
        res.status(200).json({
            message : "Successfully get plan by id",
            data: plan
        })
    }
    catch(error){
        res.status(404).json({
            message : "Plan not found !!!",
            error:error
        })
    }


    // let {id} = req.params;
    // let filteredPlans = plans.filter(function(plan){
    //     return plan.id == id;
    // })

    // if(filteredPlans.length){
    //     res.status(200).json({
    //         message : "Successfully get plan by id",
    //         data: filteredPlans[0]
    //     })
    // }
    // else{
    //     res.status(404).json({
    //         message : "Plan not found !!!",
    //     })
    // }
}
async function deletePlanById(req,res){


    try{
        let {id} = req.params;
        let deletedPlan = await planModel.findByIdAndDelete(id);
        res.status(200).json({
            message : "Plan deleted",
            data:deletedPlan
        })
    }
    catch(error){
        res.status(501).json({
            message : "Plan failed to delete",
            error
        })
    }
    // let filteredPlans = plans.filter(function(plan){
    //     return plan.id != id;
    // })
    // let plansPath = path.join(__dirname,"..",'Model','plansModel.json');
    // if(filteredPlans.length == plans.length){
    //     res.status(404).json({
    //         message : "Plan not found"
    //     })
    // }

    // else{
    //     fs.writeFileSync(plansPath, JSON.stringify(filteredPlans));
    //     res.status(200).json({
    //         message : "Successfully deleted plan"
    //     })
    // }
    

}
async function updatePlanById(req,res){

    try{
        let id = req.params.id;
        let {updateObj} = req.body;
        //let updatedPlan = await planModel.findByIdAndUpdate(id , updateObj, {new:true});
        let plan = await planModel.findById(id);
        for(key in updateObj){
            plan[key] = updateObj[key];
        }
        let updatedPlan = await plan.save();
        res.status(200).json({
                    message : "Plan updated",
                    data:updatedPlan
        })
    }
    catch(error){
        res.status(501).json({
            message : "failed to update plan",
            error:error.errors.discount.message
        })
    }
    // let filteredPlan = plans.filter(function(plan){
    //     return plan.id == id;
    // })
    // let plansPath = path.join(__dirname,"..",'Model','plansModel.json');
    // if(filteredPlan.length){
    //     let plan = filteredPlan[0];
    //     for(key in updateObj){
    //         plan[key] = updateObj[key];
    //     }
    //     fs.writeFileSync(plansPath , JSON.stringify(plans));
    //     res.status(200).json({
    //         message : "Plan updated"
    //     })
    // }
    // else{
    //     res.status(404).json({
    //         message : "Plan not found"
    //     })
    // }
}


module.exports.getAllPlan = getAllPlan;
module.exports.getPlanById = getPlanById;
module.exports.updatePlanById = updatePlanById;
module.exports.createPlan = createPlan;
module.exports.deletePlanById = deletePlanById