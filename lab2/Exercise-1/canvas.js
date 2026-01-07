const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Adjusted Filled Square (left-center)
ctx.fillStyle = "#4CAF50";
ctx.fillRect(40, 40, 100, 100);

// Adjusted Filled Circle (right-center)
ctx.beginPath();
ctx.arc(360, 90, 45, 0, Math.PI * 2);
ctx.fillStyle = "#2196F3";
ctx.fill();

// Straight Line (bottom)
ctx.beginPath();
ctx.moveTo(50, 220);
ctx.lineTo(450, 220);
ctx.strokeStyle = "#000000";
ctx.lineWidth = 2;
ctx.stroke();

// Text (center)
ctx.font = "24px Arial";
ctx.fillStyle = "#E91E63";
ctx.fillText("HTML5 Canvas", 160, 170);
