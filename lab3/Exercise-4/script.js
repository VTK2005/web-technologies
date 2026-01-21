const logContainer = document.getElementById("logContainer");
const warningBox = document.getElementById("warningBox");

let activityLog = [];
let clickCount = 0;
const CLICK_THRESHOLD = 10;

function recordActivity(type, target, phase){
  const entry = {
    type,
    target,
    phase,
    time: new Date().toLocaleTimeString()
  };

  activityLog.push(entry);
  displayEntry(entry);

  if(type === "click"){
    clickCount++;
    checkSuspicious();
  }
}

function displayEntry(entry){
  const div = document.createElement("div");
  div.className = "log-entry";
  div.textContent = `[${entry.time}] ${entry.type.toUpperCase()} on <${entry.target}> (${entry.phase})`;
  logContainer.prepend(div);
}

function checkSuspicious(){
  if(clickCount >= CLICK_THRESHOLD){
    warningBox.textContent = "⚠ Suspicious Activity: Too many clicks!";
  }
}

function resetLog(){
  activityLog = [];
  clickCount = 0;
  logContainer.innerHTML = "";
  warningBox.textContent = "";
}

function exportLog(){
  if(activityLog.length === 0){
    alert("No activity to export.");
    return;
  }

  let text = "USER ACTIVITY LOG\n\n";

  activityLog.forEach((a,i)=>{
    text += `${i+1}. ${a.time} | ${a.type} | ${a.target} | ${a.phase}\n`;
  });

  const blob = new Blob([text],{type:"text/plain"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "activity_log.txt";
  link.click();
}


document.addEventListener("click", e=>{
  recordActivity("click", e.target.tagName, "capturing");
}, true);

document.addEventListener("click", e=>{
  recordActivity("click", e.target.tagName, "bubbling");
}, false);

document.addEventListener("keydown", e=>{
  recordActivity("keypress", e.key, "bubbling");
});

document.addEventListener("focusin", e=>{
  recordActivity("focus", e.target.tagName, "bubbling");
});
