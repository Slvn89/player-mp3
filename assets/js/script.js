// lorsque j'importe un ou plusieurs élémentHTML je le fais yjs en début de script
// import { playlist_hiphop } from "./lib/playlist_hiphop.js";
// console.dir(playlist_hiphop); 
// console.log("Hello");
const audioPlayer = document.getElementById('audio-player');
const progressIndicator = document.querySelector('.progress-indicator');
const progressBar = document.querySelector('.progress-bar');
const startTime = document.querySelector('.start-time');
const endTime = document.querySelector('.end-time');
const shuffleBtn = document.querySelector('.shuffle');
const previousBtn = document.querySelector('.previous');
const playPauseBtn = document.querySelector('.play-pause');
const nextBtn = document.querySelector('.next');
const playlistBtn = document.querySelector('.playlist-btn');
const playlistDropdown = document.querySelector('.playlist-dropdown');







let isPlaying = false;
let currentTrackIndex = 0;
let tracks = [
  { title: 'Titre 1', file: './assets/mp3s/1. Worldline.mp3' },
  { title: 'Titre 2', file: './assets/mp3s/2. Ephemeron.mp3' },
  { title: 'Titre 2', file: './assets/mp3s/2. Persuasion System.mp3' }

];


playlistBtn.addEventListener('click', () => {
  playlistDropdown.classList.toggle('navbar-expanded');
});
function togglePlayPause() {
  if (isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
}

function playAudio() {
  isPlaying = true;
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  audioPlayer.play();
}

function pauseAudio() {
  isPlaying = false;
  playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  audioPlayer.pause();
}

function updateProgress() {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressIndicator.style.width = `${progress}%`;
  startTime.textContent = formatTime(audioPlayer.currentTime);
  endTime.textContent = formatTime(audioPlayer.duration);
}

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function shuffleTracks() {
  shuffleBtn.classList.toggle('active');
  if (shuffleBtn.classList.contains('active')) {
    // Logique pour activer le mode shuffle
  } else {
    // Logique pour désactiver le mode shuffle
  }
}


function playPreviousTrack() {
  if (shuffleBtn.classList.contains('active')) {
    currentTrackIndex = getRandomTrackIndex();
  } else {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  }
  playSelectedTrack();
}

function playNextTrack() {
  if (shuffleBtn.classList.contains('active')) {
    currentTrackIndex = getRandomTrackIndex();
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  }
  playSelectedTrack();
}

function getRandomTrackIndex() {
  const currentIndex = currentTrackIndex;
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * tracks.length);
  } while (randomIndex === currentIndex);
  return randomIndex;
}

function playSelectedTrack() {
  const selectedTrack = tracks[currentTrackIndex];
  audioPlayer.src = selectedTrack.file;
  audioPlayer.play();
}

function setProgress(event) {
  const progressBarWidth = progressBar.clientWidth;
  const clickPosition = event.offsetX;
  const progress = (clickPosition / progressBarWidth) * 100;
  const currentTime = (progress / 100) * audioPlayer.duration;
  audioPlayer.currentTime = currentTime;
}

let ledElement;
let playlistButton;
let isPlaylistOpen = false;

function togglePlaylist() {
  isPlaylistOpen = !isPlaylistOpen;

  if (isPlaylistOpen) {
    ledElement.classList.add('active');
  } else {
    ledElement.classList.remove('active');
  }
}


let forwardInterval;
let rewindInterval;
let keyPressStartTime;

const longPressThreshold = 500; // Temps en millisecondes pour considérer un appui comme un appui long

document.addEventListener('keydown', (event) => {
  if (event.repeat) return; // Ignorer les événements de répétition de la touche enfoncée

  keyPressStartTime = Date.now();

  switch (event.keyCode) {
    case 32: // Touche espace
      if (audioPlayer.paused) {
        playPauseBtn.classList.add('playing');

        audioPlayer.play();
      } else {
        playPauseBtn.classList.remove('playing');

        audioPlayer.pause();
      }
      break;
    case 37: // Flèche gauche
      rewindInterval = setInterval(() => {
        audioPlayer.currentTime -= 5; // Réglez la valeur de recul rapide souhaitée
      }, 100);
      break;
    case 39: // Flèche droite
      forwardInterval = setInterval(() => {
        audioPlayer.currentTime += 5; // Réglez la valeur d'avance rapide souhaitée
      }, 100);
      break;
    default:
      break;
  }
});

document.addEventListener('keyup', (event) => {
  const keyPressEndTime = Date.now();
  const keyPressDuration = keyPressEndTime - keyPressStartTime;

  switch (event.keyCode) {
    case 37: // Flèche gauche
      if (keyPressDuration < longPressThreshold) {
        // Logique pour previous (appui court)
      }
      clearInterval(rewindInterval);
      break;
    case 39: // Flèche droite
      if (keyPressDuration < longPressThreshold) {
        // Logique pour next (appui court)
      }
      clearInterval(forwardInterval);
      break;
    default:
      break;
  }
});


document.addEventListener('DOMContentLoaded', () => {
  ledElement = document.querySelector('.led');
  playlistButton = document.querySelector('.playlist-btn');
  playlistButton.addEventListener('click', togglePlaylist);
});
shuffleBtn.addEventListener('click', shuffleTracks);
previousBtn.addEventListener('click', playPreviousTrack);
playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', playNextTrack);
progressBar.addEventListener('click', setProgress);
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', playNextTrack);

