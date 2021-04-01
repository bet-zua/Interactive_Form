// On page load, the first text field has the focus state
document.getElementById('name').focus();

// "other" job role field hidden by default, only shown if user selects "other"
const otherJobRole = document.getElementById('other-job-role');
otherJobRole.hidden = true;
const selectJob = document.getElementById('title');
selectJob.addEventListener('change', (e)=>{
    if(e.target.value === 'other'){
        otherJobRole.hidden = false;
    } else {
        otherJobRole.hidden = true;
    }
});

// User is only shown color options after selecting a design
const color = document.getElementById('color');
color.disabled = true;
const colorOptions = document.querySelectorAll('#color option');
const design = document.getElementById('design');
design.addEventListener('change', (e)=>{
    color.disabled = false;
    if(e.target.value === 'js puns'){
        colorOptions[1].selected = true;
        for(let i  = 1; i < colorOptions.length; i++){
            if(colorOptions[i].dataset.theme === 'js puns'){
                colorOptions[i].hidden = false;
            } else {
                colorOptions[i].hidden = true;
            }
        }
    } else {
        colorOptions[4].selected = true;
        for(let i  = 1; i < colorOptions.length; i++){
            if(colorOptions[i].dataset.theme === 'heart js'){
                colorOptions[i].hidden = false;
            } else {
                colorOptions[i].hidden = true;
            }
        }
    }
});

// Total conference cost updates as user selects activities
const activitiesBox = document.getElementById('activities-box');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const totalCost = document.getElementById('activities-cost');
let cost = 0;
activitiesBox.addEventListener('change',(e)=>{
    activitiesConflict(e.target);
    if(e.target.checked){
        cost += parseInt(e.target.dataset.cost);
        totalCost.innerHTML = `Total: $${cost}`;
    } else if(!e.target.checked){
        cost -= parseInt(e.target.dataset.cost);
        totalCost.innerHTML = `Total: $${cost}`;
    }
});
/* Extra Credit Part 1: 
   Prevents users from registering for conflicting activities */
function activitiesConflict(selectedActivity){
    for (let i = 1; i < checkboxes.length; i++){
        let activity = checkboxes[i];
        if ( selectedActivity!== activity 
            && activity.dataset.dayAndTime == selectedActivity.dataset.dayAndTime ){
                if (selectedActivity.checked){
                    activity.disabled = true;
                    activity.parentElement.classList.add("disabled");
                } else if (!selectedActivity.checked){
                    activity.disabled = false;
                    activity.parentElement.classList.remove("disabled");
                }
        }
    }
    return false;
}

// Accessibility: makes focus states of activities obvious to all users
for (let i = 0; i < checkboxes.length; i+=1){
    checkboxes[i].addEventListener( 'focus', (e)=>{
        e.target.parentElement.setAttribute("class", "focus");
    });
    checkboxes[i].addEventListener( 'blur', (e)=>{
        e.target.parentElement.classList.remove("focus"); 
    });
};

// Payment option is Credit Card by default, and updates depending on user selection
const paymentOptions = document.querySelectorAll('#payment option');
const creditCard = document.getElementById('credit-card');
const payPal = document.getElementById('paypal');
const bitCoin = document.getElementById('bitcoin');
paymentOptions[1].selected = true;
creditCard.hidden = false;
payPal.hidden = true;
bitCoin.hidden = true;
document.getElementById('payment').addEventListener('change', (e)=>{
    if(e.target.value === 'credit-card'){
        creditCard.hidden = false;
        paymentOptions[1].selected = true;
        payPal.hidden = true;
        bitCoin.hidden = true;
    }
    else if(e.target.value === 'paypal'){
        creditCard.hidden = true;
        payPal.hidden = false;
        paymentOptions[2].selected = true;
        bitCoin.hidden = true;
    }
    else if(e.target.value === 'bitcoin'){
        creditCard.hidden = true;
        payPal.hidden = true;
        bitCoin.hidden = false;
        paymentOptions[3].selected = true;
    }
});

// Form Validation: prevents submission if any required fields are not valid
const form = document.querySelector('form');
form.addEventListener('submit', e => {
    let allValid = 0;
    allValid += validName() ? 0 : 1;
    allValid += validEmail() ? 0 : 1;
    allValid += validActivities() ? 0 : 1;
    if(paymentOptions[1].selected){
        allValid += validCard() ? 0 : 1;
        allValid += validZip() ? 0 : 1;
        allValid += validCVV() ? 0 : 1;
    }
    if (allValid != 0){ 
        e.preventDefault(); 
    }
});
// Extra Credit Part 2: Provides real-time form validation error indications 
const nameInput = document.getElementById('name');
nameInput.addEventListener('blur', (e)=>{
    validName();
});
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', (e)=>{
    validEmail();
});
const cardInput = document.getElementById('cc-num');
cardInput.addEventListener('blur', (e)=>{
    validCard();
});
const zipInput = document.getElementById('zip');
zipInput.addEventListener('blur', (e)=>{
    validZip();
});
const cvvInput = document.getElementById('cvv');
cvvInput.addEventListener('blur', (e)=>{
    validCVV();
});
//Extra Credit Part 3: offers conditional error messaging in validation helper functions
function validName(){
    if(nameInput.value.length < 1){
        addValidationErrors(nameInput);
        nameInput.parentElement.lastElementChild.innerHTML = "Name field must not be blank"
        return false;
    }
    if(/^\s*$/.test(nameInput.value)){
        addValidationErrors(nameInput);
        nameInput.parentElement.lastElementChild.innerHTML = "Name field must not only contain whitespace"
        return false;
    }
    if(!/\w/.test(nameInput.value)){
        addValidationErrors(nameInput);
        nameInput.parentElement.lastElementChild.innerHTML = "Name field must contain characters"
        return false;
    }
    removeValidationErrors(nameInput);
    return true;
}
function validEmail(){
    if(emailInput.value.length < 1 ){
        addValidationErrors(emailInput);
        emailInput.parentElement.lastElementChild.innerHTML = "Email field must not be blank";
        return false;
    } 
    if(!/^\w*\@/.test(emailInput.value)){
        addValidationErrors(emailInput);
        emailInput.parentElement.lastElementChild.innerHTML = "Email must contain an '@' symbol";
        return false;
    } 
    if(!/(\.com)$/.test(emailInput.value)){
        addValidationErrors(emailInput);
        emailInput.parentElement.lastElementChild.innerHTML = "Email must end in '.com'";
        return false;
    } 
    if(!/^\w*\@\w+(\.com)$/.test(emailInput.value)){
        addValidationErrors(emailInput);
        emailInput.parentElement.lastElementChild.innerHTML = "Email must be formatted correctly";
        return false;
    } 
    removeValidationErrors(emailInput);
    return true;
}
function validActivities(){
    if( cost > 0){
        removeValidationErrors(activitiesBox);
        return true;
    } 
    addValidationErrors(activitiesBox);
    return false;
    
}
function validCard(){
    if(cardInput.value.length < 1){
        addValidationErrors(cardInput);
        cardInput.parentElement.lastElementChild.innerHTML = "Please enter a card number";
        return false;
    } 
    if(!/^\d{13,16}$/.test(cardInput.value)){
        addValidationErrors(cardInput);
        cardInput.parentElement.lastElementChild.innerHTML = "Card number must contain 13-16 digits";
        return false;
    } else {
        removeValidationErrors(cardInput);
        return true;
    }
}
function validZip(){
    if(zipInput.value.length < 1){
        addValidationErrors(zipInput);
        zipInput.parentElement.lastElementChild.innerHTML = "Please enter a Zip Code";
        return false;
    } 
    if(!/^\d{5}$/.test(zipInput.value)){
        addValidationErrors(zipInput);
        zipInput.parentElement.lastElementChild.innerHTML = "Zip code must be 5 digits";
        return false;
    } else {
        removeValidationErrors(zipInput);
        return true;
    }
}
function validCVV(){
    if(cvvInput.value.length < 1 ){
        addValidationErrors(cvvInput);
        cvvInput.parentElement.lastElementChild.innerHTML = "Please enter a code";
        return false;
    } 
    if(!/^\d{3}$/.test(cvvInput.value)){
        addValidationErrors(cvvInput);
        cvvInput.parentElement.lastElementChild.innerHTML = "Code must be 3 digits";
        return false;
    } else {
        removeValidationErrors(cvvInput);
        return true;
    }
}
// Accessibility: helper functions make validation errors obvious to all users 
function addValidationErrors( currElement ){
    currElement.parentElement.classList.add("not-valid");
    currElement.parentElement.classList.remove("valid");
    currElement.parentElement.lastElementChild.style.display = "block";
}
function removeValidationErrors( currElement ){
    currElement.parentElement.classList.add("valid");
    currElement.parentElement.classList.remove("not-valid");
    currElement.parentElement.lastElementChild.style.display = "none";
}