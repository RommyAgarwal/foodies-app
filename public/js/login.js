let email = document.querySelector("#email");
let pw = document.querySelector("#pw");
let loginBtn = document.querySelector(".loginBtn");
let message = document.querySelector("#message");
let forgetPassword = document.querySelector(".forgetPassword");


forgetPassword.addEventListener("click" , async function(e){
    try{
        // hiuhooijoo
        e.preventDefault();
        if(email.value){
            let obj = await axios.post("https://foodiesssss.herokuapp.com/api/user/forgetPassword" , {email:email.value});
            console.log(obj);
        }
    }
    catch(error){
        console.log(error);
    }
})


loginBtn.addEventListener("click" , async function(e){
    try{
        e.preventDefault();
        if(email.value && pw.value){
            let obj = await axios.post("https://foodiesssss.herokuapp.com/api/user/login" , {email:email.value , password:pw.value});
            console.log(obj);
            if(obj.data.data){
                window.location.href= "/";
            }
            else{
                message.innerHTML = obj.data.message;
            }
        }
    }
    catch(error){
        console.log(error);
    }
    // e.preventDefault();
    // if(email.value && pw.value){
    //     axios.post("http://localhost:3000/api/user/login" , {email:email.value , password:pw.value}).then( (obj)=>{
    //         alert(obj);
    //         console.log(obj);

    //     })
    //     .catch(error=>{
    //         alert(error);
    //     })
    // }
})