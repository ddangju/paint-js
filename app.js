const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementsByClassName("jsMode");

ctx.strokeStyle = "#2c2c2c";
///canvas에 그릴색을지정
ctx.lineWidth = 2.5;
//너비가 2.5다

canvas.width = 600;
canvas.height = 600;

ctx.fillStyle = "red";
ctx.fillRect(50, 20, 100, 49);

let painting = false;
let filling = false;

function mouseMove(event) {
  // console.log(event.offsetX);
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    //새로운선을 그리겠다고 선언함
    ctx.moveTo(x, y);
    ///시작좌표를 시작점나타냄
    // console.log("move", !painting);
  } else {
    ctx.lineTo(x, y);
    // 좌표로 얻까지 그리는지 나타낸다
    ctx.stroke();
    console.log("클릭시", painting);
  }
  // console.log(x, y);
}

function startPainting() {
  painting = true;
  //z클릭했을때
}

function stopPainting() {
  painting = false;
  ///클릭 손을 떼었을때, 캔버스밖을나갔을때
}

function changeColor(event) {
  // console.log(event.target.style);
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  //strokeStyle을 오버라이드한다.
}

function rangeChange(event) {
  // console.log(event.target.values);
  const size = event.target.value;
  ctx.lineWidth = size;
}

function modeChange(event) {
  // console.log(event);
  if (filling === true) {
    filling = false;
    mode[0].innerText = "FILL";
  } else {
    filling = true;
    mode[0].innerText = "Paint";
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", mouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

// console.log(Array.from(colors));
Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", rangeChange);
}

// console.log(mode[0].innerText, "버튼");

if (mode) {
  mode[0].addEventListener("click", modeChange);
}
