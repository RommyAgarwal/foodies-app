const profileImage = document.querySelector("#profileImage");
const edit = document.querySelector('.Editable');
const save = document.querySelector('.Save');
const username = document.querySelector('#name');
const useremail = document.querySelector('#email');



profileImage.addEventListener("change" , async function(e){
    e.preventDefault();
    let file = profileImage.files[0];
    console.log(file);
    let formData = new FormData();
    formData.append("user" , file);
    let obj = await axios.patch("https://foodiesssss.herokuapp.com/api/user/updateProfilePhoto" , formData);
    console.log(obj);
    if(obj.data.message){
        window.location.reload();
    }
})

edit.addEventListener("click" , function(e){
    e.preventDefault();
    username.removeAttribute("readOnly");
    useremail.removeAttribute('readOnly');
})

save.addEventListener("click" , async function(e){
    try{
        e.preventDefault();
        if(username.value && useremail.value){
            // let id = user["_id"];
            let updateObject = {
                "name" : username.value,
                "email" : useremail.value
            }
            let obj = await axios.patch("https://foodiesssss.herokuapp.com/api/user" , {updateObj:updateObject});
            console.log(obj);
            if(obj.data.data){
                window.location.reload();
            }
        }
    }
    catch(error){
        console.log(error);
    }
})


