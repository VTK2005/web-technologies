const questions = [
  {
    id:1,
    text:"What is your name?",
    type:"text",
    required:true,
    maxLength:20
  },
  {
    id:2,
    text:"Select your gender:",
    type:"radio",
    options:["Male","Female","Other"],
    required:true
  },
  {
    id:3,
    text:"Select your skills (max 2):",
    type:"checkbox",
    options:["HTML","CSS","JavaScript","Python"],
    required:true,
    maxSelect:2
  }
];

const container = document.getElementById("surveyContainer");
const form = document.getElementById("surveyForm");
const result = document.getElementById("result");

function buildSurvey(){
  questions.forEach(q=>{
    const div = document.createElement("div");
    div.className = "question";
    div.dataset.id = q.id;

    let html = `<label>${q.text}</label>`;

    if(q.type==="text"){
      html += `<input type="text" data-type="text">`;
    }

    if(q.type==="radio"){
      q.options.forEach(opt=>{
        html += `
        <div class="option">
          <input type="radio" name="q${q.id}" value="${opt}">
          ${opt}
        </div>`;
      });
    }

    if(q.type==="checkbox"){
      q.options.forEach(opt=>{
        html += `
        <div class="option">
          <input type="checkbox" value="${opt}">
          ${opt}
        </div>`;
      });
    }

    html += `<div class="error"></div>`;
    div.innerHTML = html;
    container.appendChild(div);
  });
}

function validateQuestion(div,q){
  const errorBox = div.querySelector(".error");
  errorBox.textContent = "";
  div.classList.remove("invalid");

  if(q.type==="text"){
    const input = div.querySelector("input");
    const value = input.value.trim();

    if(q.required && value===""){
      return showError(div,errorBox,"This field is required");
    }
    if(value.length > q.maxLength){
      return showError(div,errorBox,"Max "+q.maxLength+" characters allowed");
    }
  }

  if(q.type==="radio"){
    const checked = div.querySelector("input:checked");
    if(q.required && !checked){
      return showError(div,errorBox,"Please select one option");
    }
  }

  if(q.type==="checkbox"){
    const checked = div.querySelectorAll("input:checked");
    if(q.required && checked.length===0){
      return showError(div,errorBox,"Select at least one option");
    }
    if(checked.length > q.maxSelect){
      return showError(div,errorBox,"Select maximum "+q.maxSelect);
    }
  }

  return true;
}

function showError(div,box,msg){
  box.textContent = msg;
  div.classList.add("invalid");
  return false;
}

function validateSurvey(){
  let valid = true;

  questions.forEach(q=>{
    const div = document.querySelector(`.question[data-id="${q.id}"]`);
    if(!validateQuestion(div,q)) valid=false;
  });

  return valid;
}

form.addEventListener("submit",e=>{
  e.preventDefault();

  if(validateSurvey()){
    result.textContent="Survey Submitted Successfully ✅";
    form.reset();
  }
  else{
    result.textContent="";
  }
});

buildSurvey();
