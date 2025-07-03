import { songs } from './data.js';


let currentSong = 0;

window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("song");
  const ctrlIcon = document.getElementById("ctrlIcon");
  const progress = document.getElementById("progress");
  const playlistDiv = document.getElementById("playlist");
  const volumeSlider = document.getElementById("volumeSlider");
  const title = document.querySelector("h1");
  const artist = document.querySelector("p");
  const img = document.querySelector(".song-img");

  function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    title.innerText = song.name;
    artist.innerText = song.artist;
    img.src = song.image;
    highlightCurrent(index);
  }

  function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
      audio.pause();
      ctrlIcon.classList.remove("fa-pause");
      ctrlIcon.classList.add("fa-play");
    } else {
      audio.play();
      ctrlIcon.classList.add("fa-pause");
      ctrlIcon.classList.remove("fa-play");
    }
  }

  function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  }

  function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  }

  function renderPlaylist() {
    songs.forEach((song, index) => {
      const songDiv = document.createElement("div");
      songDiv.classList.add("playlist-item");
      songDiv.innerText = `${song.name} – ${song.artist}`;
      songDiv.addEventListener("click", () => {
        currentSong = index;
        loadSong(currentSong);
        audio.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
      });
      playlistDiv.appendChild(songDiv);
    });
  }

  function highlightCurrent(index) {
    const items = document.querySelectorAll(".playlist-item");
    items.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });
  }

  // Sync Progress
  setInterval(() => {
    progress.value = audio.currentTime;
  }, 500);

  audio.onloadedmetadata = () => {
    progress.max = audio.duration;
  };

  progress.onchange = () => {
    audio.currentTime = progress.value;
  };

  audio.addEventListener("ended", () => {
    nextSong();
  });

  // Volume Slider
  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
  });

  // Menu toggle
  document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("dropdownPlaylist").classList.toggle("hidden");
  });

  // Button Listeners
  document.getElementById("playPause").addEventListener("click", playPause);
  document.getElementById("next").addEventListener("click", nextSong);
  document.getElementById("prev").addEventListener("click", prevSong);

  renderPlaylist();
  loadSong(currentSong);
});
