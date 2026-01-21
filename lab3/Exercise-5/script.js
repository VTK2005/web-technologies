const stages = document.querySelectorAll(".stage");
const progress = document.getElementById("progress");
const form = document.getElementById("multiForm");
const status = document.getElementById("status");
const reviewBox = document.getElementById("reviewBox");
const submitBtn = document.getElementById("submitBtn");

let currentStage = 0;

let userData = {
  name:"",
  email:"",
  password:"",
  age:"",
  city:""
};

function showStage(index){
  stages.forEach(s=>s.classList.remove("active"));
  stages[index].classList.add("active");

  progress.style.width = ((index+1)/stages.length)*100 + "%";

  submitBtn.style.display = (index === stages.length-1) ? "inline-block" : "none";
}

function nextStage(){
  if(!validateStage()){
    alert("Please complete this stage correctly ❌");
    return;
  }

  if(currentStage < stages.length-1){
    currentStage++;
    if(currentStage === stages.length-1) populateReview();
    showStage(currentStage);
  }
}

function prevStage(){
  if(currentStage>0){
    currentStage--;
    showStage(currentStage);
  }
}

function validateStage(){
  switch(currentStage){
    case 0: return nameInput() && emailInput();
    case 1: return passwordInput() && confirmInput();
    case 2: return ageInput() && cityInput();
    default: return true;
  }
}

/* ===== VALIDATIONS & STORAGE ===== */

function nameInput(){
  const v=document.getElementById("name").value.trim();
  if(v.length<3) return false;
  userData.name=v;
  return true;
}

function emailInput(){
  const v=document.getElementById("email").value;
  if(!v.includes("@")) return false;
  userData.email=v;
  return true;
}

function passwordInput(){
  const v=document.getElementById("password").value;
  if(v.length<6) return false;
  userData.password=v;
  return true;
}

function confirmInput(){
  const c=document.getElementById("confirm").value;
  return c===userData.password;
}

function ageInput(){
  const v=parseInt(document.getElementById("age").value);
  if(v<18) return false;
  userData.age=v;
  return true;
}

function cityInput(){
  const v=document.getElementById("city").value.trim();
  if(v==="") return false;
  userData.city=v;
  return true;
}

/* ===== REVIEW STAGE ===== */

function populateReview(){
  reviewBox.innerHTML = `
    <b>Name:</b> ${userData.name}<br>
    <b>Email:</b> ${userData.email}<br>
    <b>Age:</b> ${userData.age}<br>
    <b>City:</b> ${userData.city}
  `;
}

/* ===== FINAL SUBMISSION ===== */

form.addEventListener("submit",e=>{
  e.preventDefault();

  if(currentStage !== stages.length-1){
    alert("Reach final stage to submit ❌");
    return;
  }

  status.textContent="Form submitted successfully ✅";
  console.log("User Data:",userData);

  form.reset();
  currentStage=0;
  userData={name:"",email:"",password:"",age:"",city:""};
  showStage(0);
});

showStage(0);
