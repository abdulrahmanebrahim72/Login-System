var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");
var signupBtn = document.getElementById("signupBtn");
var myDiv = document.querySelector(".myDiv");
var myDiv1 = document.querySelector(".myDiv1");

var allUsers;
if(localStorage.getItem("usersInLocalStorage") == null){
    allUsers = [];
}
else{
    allUsers = JSON.parse(localStorage.getItem("usersInLocalStorage"));
}

function validation(){
    var validateName = /^[a-z]{1,15}$/i;
    var validateEmail = /^\w{3,30}@\w{3,10}.\w{2,3}$/i;
    var validatePassword = /^\w{1,20}$/;

    return validateName.test(signupName.value) &&
    validateEmail.test(signupEmail.value) &&
    validatePassword.test(signupPassword.value);
}


function addUser(){
    if(validation()){
        var singleUser = {
            uName: signupName.value,
            uEmail: signupEmail.value,
            uPassword: signupPassword.value
        }

        if(isEmailExist() != false){
            allUsers.push(singleUser);
            localStorage.setItem("usersInLocalStorage" , JSON.stringify(allUsers));
            console.log(allUsers);
            myDiv.innerHTML = `<span class="text-success">Success</span>`;
            setTimeout(function(){location.href = "../index.html";} , 500);
        }
        else{
            myDiv.innerHTML = `<span class="text-danger">Email already exists.</span>`;
        }

        

    }
    else{
        myDiv.innerHTML = `<span class="text-danger">All inputs is required.</span>`;
    }
}


function isEmailExist(){
    for(var i=0;i<allUsers.length;i++){
        if(allUsers[i].uEmail.toLowerCase() == signupEmail.value.toLowerCase()){
            return false;
        }
    }
}





function signin(){
    for(let i=0;i<allUsers.length;i++){
        if(signinEmail.value.toLowerCase() == allUsers[i].uEmail.toLowerCase() && signinPassword.value == allUsers[i].uPassword){
            let Name = allUsers[i].uName;
            sessionStorage.setItem("userName" , Name);
            location.replace("./home.html");
            break;
        }
        else{
            myDiv1.innerHTML = `<span class="text-danger">incorrect email or password</span>`;
        }
    }
};

function logOut(){
    location.replace("../index.html");
    sessionStorage.removeItem("userName")
}
