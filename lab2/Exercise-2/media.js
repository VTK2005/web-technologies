document.addEventListener("DOMContentLoaded", () => {

    const audio = document.getElementById("audioPlayer");
    const video = document.getElementById("videoPlayer");

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    }

    audio.addEventListener("loadedmetadata", () => {
        document.getElementById("audioTime").innerText = "Current Time: 0:00";
    });

    video.addEventListener("loadedmetadata", () => {
        document.getElementById("videoTime").innerText = "Current Time: 0:00";
    });

    audio.addEventListener("timeupdate", () => {
        document.getElementById("audioTime").innerText =
            "Current Time: " + formatTime(audio.currentTime);
    });

    video.addEventListener("timeupdate", () => {
        document.getElementById("videoTime").innerText =
            "Current Time: " + formatTime(video.currentTime);
    });

});
