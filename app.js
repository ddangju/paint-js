const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#2c2c2c";
///canvas에 그릴색을지정
ctx.lineWidth = 2.5;
//너비가 2.5다

canvas.width = 600;
canvas.height = 600;
let painting = false;
function mouseMove(event) {
  // console.log(event.offsetX);
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    console.log("move", !painting);
  } else {
    ctx.lineTo(x, y);
    // ctx.stroke();
    console.log("클릭시", painting);
  }
  // console.log(x, y);
}

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

if (canvas) {
  canvas.addEventListener("mousemove", mouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
