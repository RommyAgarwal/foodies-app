
let username = document.querySelector("#name");
let email = document.querySelector("#email");
let pw = document.querySelector("#pw");
let signupBtn = document.querySelector(".signupBtn");


signupBtn.addEventListener("click" , async function(e){
    try{
        e.preventDefault();
        if(username.value && email.value && pw.value && cpw.value){
            let signupObject = {
                "name" : username.value,
                "email" : email.value,
                "password" : pw.value,
                "confirmPassword" : cpw.value
            }
            let obj = await axios.post("https://foodiesssss.herokuapp.com/api/user/signup" , signupObject);
            console.log(obj);
            if(obj.data.data){
                window.location.href= "/login";
            }
        }
    }
    catch(error){
        console.log(error);
    }
})