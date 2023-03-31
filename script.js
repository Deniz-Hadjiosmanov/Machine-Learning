const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

let stream;
let canvasContext;

// Start camera
startButton.addEventListener("click", async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        canvasContext = canvas.getContext("2d");
        video.addEventListener("loadedmetadata", () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        });
        video.addEventListener("play", drawVideoFrame);
    } catch (error) {
        console.error(error);
    }
});

// Stop camera
stopButton.addEventListener("click", () => {
    stream.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
    video.removeEventListener("play", drawVideoFrame);
});

// Display the video on the canvas
function drawVideoFrame() {
    if (video.paused || video.ended) {
        return;
    }
    canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(drawVideoFrame);
}
