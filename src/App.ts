document.body.innerHTML = `
    <canvas id="canvas" width="760" height="250" style="border: 2px solid black"></canvas>
`;

const canvas: HTMLCanvasElement = 
    document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

window.addEventListener("keydown", (event: KeyboardEvent) => {
    // console.log("key down event", event.keyCode);
    if (event.keyCode === 38) { // Up Arrow
        if (girlState === "idle") {
            girlState = "jumping";
        }
    }
});

const imageUrl = "./images/ninja-girl/Idle__000.png";
const image = new Image();
image.src = imageUrl;
const canvasWidth = 760;
const canvasHeight = 250;
const girlWidth = 96.66;
const girlHeight = 166.66;
let girlX = 0;
let girlY = canvasHeight - girlHeight;
let girlState = "idle" // "idle" | "jumping";
let jumpOffsetIndex = 0;
let jumpOffsets = [
    -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5
];

requestAnimationFrame(gameLoop);

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

function update() {
    if (girlState === "jumping") {
        girlY += jumpOffsets[jumpOffsetIndex] * 4;
        jumpOffsetIndex += 1;
        if (jumpOffsetIndex >= jumpOffsets.length) {
            girlState = "idle";
            jumpOffsetIndex = 0;
        }
    }
}

function render() {
    ctx.fillStyle = "#202020";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(image, girlX, girlY, girlWidth, girlHeight);
}

