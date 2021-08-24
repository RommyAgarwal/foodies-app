let buyPlansButtons = document.querySelectorAll(".signup-button a");
let allLis = document.querySelectorAll(".showcase-ul li");
var stripe = Stripe("pk_test_51JQ5p9SBZlr3xrhg3OsGxvSyVOazLhY3dClzXkkLsvRCSDxZkAauXc7RqFTowzknxBSUtBeZNJK6V18ivkuxT47l002CHS0eS9");

for(let i = 0;i<buyPlansButtons.length ;i++){
    buyPlansButtons[i].addEventListener("click" , async function(){
        try{
            if(allLis.length < 6){
                window.location.href = "/login";
            }
            else{
                let planId = buyPlansButtons[i].getAttribute("planid");
                let session = await axios.post("http://foodiesssss.herokuapp.com/api/booking/createPaymentSession", {planId:planId});
                let sessId = session.data.session.id;
                let result = await stripe.redirectToCheckout({sessionId: sessId});
            }
        }
        catch(error){
            alert(error.message);
        }
     //   e.preventDefault();
    })
}