let npw = document.querySelector("#npw");
let cnpw = document.querySelector("#cnpw");
let resetBtn = document.querySelector(".resetBtn");
let resetmessage = document.querySelector("#resetmessage");

resetBtn.addEventListener("click" , async function(e){
    try{
        e.preventDefault();
        if(npw.value && cnpw.value){
            let token = (window.location.href).split("Password/")[1];
            let obj = await axios.patch("http://localhost:3000/api/user/resetPassword/:token" , { password:npw.value , confirmPassword:cnpw.value , token: token});
            if(obj.data.user){
                window.location.href= "/login";
            }
            else{
                resetmessage.innerHTML = obj.data.message;
                npw.value = "";
                cnpw.value="";
            }
        }
    }
    catch(error){
        console.log(error);
    }
})
