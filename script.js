console.log("Wellcome to MyMusic");

let songIndex = 1;
let masterPlay = document.getElementById("masterPlay");
let myProgerssbar = document.getElementById("myprogressbar");
let opac = document.getElementById("opac");
let audioElement = new Audio("1.mp3");
let mastersonginfo = document.getElementById("mastersonginfo");
let songItems = Array.from(document.getElementsByClassName("songitem"));

let songs = [
  { songName: "Let Me Love you", filePath: "1.mp3", coverPath: "c1.jpg" },
  { songName: "Senorita", filePath: "2.mp3", coverPath: "c2.jpg" },
  { songName: "Bad Liar", filePath: "3.mp3", coverPath: "c3.jpg" },
  {
    songName: "The Heart Wants What It Wants",
    filePath: "4.mp3",
    coverPath: "c4.png",
  },
  { songName: "Ram Ram", filePath: "5.mp3", coverPath: "c5.jpg" },
  { songName: "Believer", filePath: "6.mp3", coverPath: "c6.jpg" },
  { songName: "Bones", filePath: "7.mp3", coverPath: "c7.webp" },
  { songName: "Shape Of You", filePath: "8.mp3", coverPath: "c8.jpg" },
  { songName: "GiveOn", filePath: "9.mp3", coverPath: "c9.jpg" },
  { songName: "Enemy", filePath: "10.mp3", coverPath: "c10.jpg" },
];

songItems.forEach((element, i) => {
  element.querySelector("img").src = songs[i].coverPath;
  element.querySelector(".songName").innerText = songs[i].songName;
});

//audioElement.play();
const playorpause = () => {
  if (audioElement.paused || audioElement.currentTime == 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    opac.style.opacity = 1;
    document.getElementById(songIndex).classList.remove("fa-play-circle");
    document.getElementById(songIndex).classList.add("fa-pause-circle");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    opac.style.opacity = 0;
    document.getElementById(songIndex).classList.remove("fa-pause-circle");
    document.getElementById(songIndex).classList.add("fa-play-circle");
  }
};
masterPlay.addEventListener("click", playorpause);
document.addEventListener("keydown", function (x) {
  if (x.key === " ") {
    playorpause();
  }
});

//listen to Events
audioElement.addEventListener("timeupdate", () => {
  //update seelbar
  myProgerssbar.value = 0;
  let progress = parseFloat(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgerssbar.value = progress;
});
myProgerssbar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgerssbar.value * audioElement.duration) / 100;
});

const makeallpause = () => {
  Array.from(document.getElementsByClassName("songitemplay2")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songitemplay2")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeallpause();
      songIndex = parseInt(e.target.id);
      if (audioElement.paused) {
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        opac.style.opacity = 1;
        audioElement.src = `${songIndex}.mp3`;
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        mastersonginfo.innerText = songs[songIndex - 1].songName;
        audioElement.currentTime = 0;
      } else {
        e.target.classList.add("fa-play-circle");
        e.target.classList.remove("fa-pause-circle");
        opac.style.opacity = 0;
        audioElement.src = `${songIndex}.mp3`;
        audioElement.pause();
        masterPlay.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");
        mastersonginfo.innerText = songs[songIndex - 1].songName;
        audioElement.currentTime = 0;
      }
    });
  }
);
let next = () => {
  if (songIndex > 9) {
    songIndex = 1;
  } else {
    songIndex += 1;
  }
  audioElement.src = `${songIndex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  makeallpause();
  document.getElementById(songIndex).classList.remove("fa-play-circle");
  document.getElementById(songIndex).classList.add("fa-pause-circle");
  mastersonginfo.innerText = songs[songIndex - 1].songName;
  opac.style.opacity = 1;
};
document.getElementById("next").addEventListener("click", next);
document.addEventListener("keydown", function (x) {
  if (x.key === "ArrowRight") {
    next();
  }
});

let previous = () => {
  if (songIndex <= 1) {
    songIndex = 10;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `${songIndex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  makeallpause();
  document.getElementById(songIndex).classList.remove("fa-play-circle");
  document.getElementById(songIndex).classList.add("fa-pause-circle");
  mastersonginfo.innerText = songs[songIndex - 1].songName;
  opac.style.opacity = 1;
};
document.getElementById("previous").addEventListener("click", previous);
document.addEventListener("keydown", function (x) {
  if (x.key === "ArrowLeft") {
    previous();
  }
});

audioElement.addEventListener("ended", () => {
  if (songIndex > 9) {
    songIndex = 1;
  } else {
    songIndex += 1;
  }
  audioElement.src = `${songIndex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  makeallpause();
  document.getElementById(songIndex).classList.remove("fa-play-circle");
  document.getElementById(songIndex).classList.add("fa-pause-circle");
  mastersonginfo.innerText = songs[songIndex - 1].songName;
  opac.style.opacity = 1;
});
