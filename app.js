const form = document.getElementById("contactForm");
const username = document.getElementById("name");
const email = document.getElementById("email");
const phNumber = document.getElementById("ph-number");
const message = document.getElementById("message");

/* After successfully submit form */
const Thanksmsg = document.getElementById("alert");

form.addEventListener('submit', (e)=>{

    if(!validateForm()){
        e.preventDefault();
    }else{
        // alert("sdfsdf");
        Thanksmsg.innerText = "Thank you!!";
    }
    
});
// function validate(){
//     const nameValue = username.value.trim();
//     const emailValue = email.value.trim();
//     const phNumberValue = phNumber.value.trim();

//     validateForm();
//     e.preventDefault();

// }

function validateForm(){
    const nameValue = username.value.trim();
    const emailValue = email.value.trim();
    const phNumberValue = phNumber.value.trim();
    const messageValue = message.value.trim();
    let flag = true;

    if(nameValue === '' || nameValue.length < 3){
        flag=false;
        setError(username,'Name should not be empty or too short');
        Thanksmsg.innerText = '';
    }else{
        setSuccess(username);
    }

    if(!validateEmail(emailValue)){
        flag=false;
        setError(email,'Invaild Email ID');
        Thanksmsg.innerText = '';
    }else{
        setSuccess(email);
    }

    if(phNumberValue.length != 10){
        flag=false;
        setError(phNumber,'Invaild Phone Number');
        Thanksmsg.innerText = '';
    }else{
        setSuccess(phNumber);
    }

    if(messageValue.length < 30){
        flag=false;
        setError(message,'Message should be morethan 30 characters');
        Thanksmsg.innerText = '';
    }else{
        setSuccess(message);
    }

    return flag;

}

// This function set show error message and change input border color to red
function setError(element,message){
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector(".error");
    errorElement.innerText = message;
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
}

// This function set remove error message (if any) and change input border color to green
function setSuccess(element){
    const inputGroup = element.parentElement;
    console.log(inputGroup);
    const errorElement = inputGroup.querySelector(".error");
    errorElement.innerText = '';
    inputGroup.classList.remove('error');
    inputGroup.classList.add('success');
}

// Regular expressions for Email validation
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};