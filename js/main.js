import { Vector, KochSegment } from "./classes.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resetButton = document.getElementById("resetButton");
const switchInput = document.getElementById("switchInput")
const width = Math.min(window.innerWidth, window.innerHeight) / 1.6;
const height = width;

const MAX_ITERATIONS = 10;
const snowFlakeSize = width / 2;
let curveAngle = Math.PI / 3;
let kochSnowFlake = [];
let iterationCount = 0;

function setupSnowFlake() {
  let max_height = (2 / 3) * Math.sin(curveAngle) * snowFlakeSize;
  kochSnowFlake = [
    new KochSegment(new Vector((width - snowFlakeSize) / 2, (height - max_height) / 2), new Vector(snowFlakeSize, 0).rotate(curveAngle), -(switchInput.checked*2 -1)*-curveAngle),
    new KochSegment(new Vector(snowFlakeSize, 0).rotate(curveAngle).add(new Vector((width - snowFlakeSize) / 2, (height - max_height) / 2)), new Vector(snowFlakeSize, 0).rotate(-curveAngle),-(switchInput.checked*2 -1)*-curveAngle), 
    new KochSegment(new Vector(width-snowFlakeSize/2,(height - max_height) / 2), new Vector(-snowFlakeSize, 0),  (switchInput.checked*2 -1)*curveAngle),
  ];
}
function setup() {
  canvas.width = width;
  canvas.height = height;
  ctx.font = `${width / 30}px Arial`;
  ctx.strokeStyle = ctx.fillStyle = "#f92672";
  ctx.lineWidth = 1;
  resetButton.addEventListener("click", reset);
  switchInput.addEventListener("change", (evt)=>{
    reset();
  })
  canvas.addEventListener("click", click);
  setupSnowFlake();
}

function clear() {
  ctx.clearRect(0, 0, width, height);
}

function draw() {
  ctx.beginPath();
  ctx.moveTo(kochSnowFlake[0].pos.x,kochSnowFlake[0].pos.y)
   for (let i = 1; i < kochSnowFlake.length; i++) {
    ctx.lineTo(kochSnowFlake[i].pos.x,kochSnowFlake[i].pos.y);
  } 
  let lastIndex = kochSnowFlake.length -1;
  ctx.lineTo(kochSnowFlake[lastIndex].pos.x+kochSnowFlake[lastIndex].dir.x,kochSnowFlake[lastIndex].pos.y+kochSnowFlake[lastIndex].dir.y);
  ctx.stroke();
  ctx.fillText("nIterations: " + iterationCount + ", nSegments: " + 3*Math.pow(4,iterationCount), width / 50, width / 25);
}

function animate() {
  clear();
  draw();
}

function reset() {
  setupSnowFlake();
  iterationCount = 0;
  animate();
}

function click() {
  if (iterationCount++ < MAX_ITERATIONS) {
    const newSegments = [];
    for (const segment of kochSnowFlake) {
      for (const child of segment.children()) {
        newSegments.push(child);
      }
    }
    kochSnowFlake = newSegments;
    animate();
  }
}

setup();
animate();
