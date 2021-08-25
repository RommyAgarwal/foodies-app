// const { response } = require("express");
const stripe = require("stripe");
const bookingModel = require("../Model/bookingModel");
const planModel = require("../Model/plansModel");
const userModel = require("../Model/usersModel");
const stripeObj = stripe('sk_test_51JQ5p9SBZlr3xrhgo8rLUiVfKeklf9foDsFwfAD6FlzLObakl40EJED5Mcsex7O2b7XVYwILYnO2mMsRe2TaeI3F00DFTpEaaw');


async function createPaymentSession(req,res){
    try{
        const userId = req["id"];
        const {planId} = req.body;
        // console.log("req=> " , userId);
        const plan = await planModel.findById(planId);
        const user = await userModel.findById(userId);
        // console.log(user);
        const session = await stripeObj.checkout.sessions.create({
            payment_method_types: [
                'card',
            ],
            customer_email: user["email"],
            client_reference_id: planId,
            // customer:user.name,
            // customer_email: user.email,
            // client_reference_id: planId,
            line_items: [
            {
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:plan.name,
                    },
                    unit_amount: plan.price*100,
                },
                quantity:1,
                  // TODO: replace this with the `price` of the product you want to sell
                //   price: '{{PRICE_ID}}',
                //   quantity: 1,
            },
            ],
            mode: 'payment',
            success_url: 'https://foodiesssss.herokuapp.com/',
            cancel_url: 'https://foodiesssss.herokuapp.com/',
        });
        res.json({
            session
        })

    }
    catch(error){
        res.json({
            message:"failed to create payment session",
            error
        })
    }
}

async function checkoutComplete(req,res){
    try{
        const END_POINT_KEY = process.env.END_POINT_KEY;
        const stripeSignature = req.headers['stripe-signature'];
        // console.log("payment done");
        // console.log( "req body=> " , req.body);
        if(req.body.type == "checkout.session.completed"){
            const userEmail = req.body.data.object.customer_email;
            const planId = req.body.data.object.client_reference_id;
            await createNewBooking(userEmail,planId);
        }

    }
    catch(error){
        res.json({
            error
        })
    }
    // let event;
    // try{
    //      event = stripeObj.webhooks.constructEvent(req.body,stripeSignature,END_POINT_KEY);
    //     }
    // catch(err){
    //     res.status(400).send(`Webhook Error: ${err.message}`);
    // }
    // if(event.type == "checkout.session.object"){
    //     console.log(event.data.object);
    // }
    // else{
    //     console.log("event not created!!!");
    // }
};


async function createNewBooking(userEmail,planId){
    console.log(userEmail);
    console.log(planId);
}

module.exports.createPaymentSession = createPaymentSession;
module.exports.checkoutComplete = checkoutComplete;