import { Vector, KochSegment } from "./classes.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resetButton = document.getElementById("resetButton");
const width = Math.min(window.innerWidth, window.innerHeight) / 1.6;
const height = width;

const MAX_ITERATIONS = 8;
const snowFlakeSize = width / 2;
let curveAngle = Math.PI / 3;
let kochSnowFlake = [];
let iterationCount = 0;

function setupSnowFlake() {
  let max_height = (2 / 3) * Math.sin(curveAngle) * snowFlakeSize;
  kochSnowFlake = [
    new KochSegment(new Vector((width - snowFlakeSize) / 2, (height - max_height) / 2), new Vector(snowFlakeSize, 0), curveAngle),
    new KochSegment(new Vector((width - snowFlakeSize) / 2, (height - max_height) / 2), new Vector(snowFlakeSize, 0).rotate(curveAngle), -curveAngle),
    new KochSegment(new Vector(snowFlakeSize, 0).rotate(curveAngle).add(new Vector((width - snowFlakeSize) / 2, (height - max_height) / 2)), new Vector(snowFlakeSize, 0).rotate(-curveAngle),-curveAngle),
  ];
}

function setup() {
  canvas.width = width;
  canvas.height = height;
  ctx.font = `${width / 30}px Arial`;
  ctx.strokeStyle = ctx.fillStyle = "#f92672";
  ctx.lineWidth = 1;
  resetButton.addEventListener("click", reset);
  canvas.addEventListener("click", click);
  setupSnowFlake();
}

function clear() {
  ctx.clearRect(0, 0, width, height);
}

function draw() {
  for (const segment of kochSnowFlake) {
    segment.draw(ctx);
  }
  ctx.fillText("nIterations: " + iterationCount + ", nSegments: " + kochSnowFlake.length, width / 50, width / 25);
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
