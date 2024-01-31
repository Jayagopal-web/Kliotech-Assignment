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

    if(nameValue === ''){
        setError(username,'Name should not be empty');
        Thanksmsg.innerText = '';
        return false;
    }else{
        setSuccess(username);
    }

    if(!validateEmail(emailValue)){
        setError(email,'Invaild Email ID');
        Thanksmsg.innerText = '';
        return false;
    }else{
        setSuccess(email);
    }

    if(phNumberValue.length != 10){
        setError(phNumber,'Invaild Phone Number');
        Thanksmsg.innerText = '';
        return false;
    }else{
        setSuccess(phNumber);
    }

    if(messageValue.length < 30){
        setError(message,'Message should be morethan 30 characters');
        Thanksmsg.innerText = '';
        return false;
    }else{
        setSuccess(message);
    }

    return true;

}

function setError(element,message){
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector(".error");
    errorElement.innerText = message;
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');

}
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