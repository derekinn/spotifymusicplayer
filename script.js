const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

//musicas aq
const VidaCara = {
    songName: 'Vida Cara',
    artist : 'Orochi, Domlaike e Chefin',
    file: 'vida_cara'
};
const Junho94 = {
    songName: 'Junho de 94',
    artist : 'Djonga',
    file: 'omqqsd'
};
const TTF = {
    songName: 'Trap The Fato',
    artist : 'Derek, Leviano e Brandão085',
    file: 'ttf'
};
const LX = {
    songName: 'Wiggle Wiggle',
    artist : 'LX',
    file: 'lx'
};
const BBL = {
    songName: 'Brasil Grime',
    artist : 'Bebelsite e Vercetti',
    file: 'bbl'
};
const MAL = {
    songName: 'Brasil Grime',
    artist : 'Malagueta e Oliveira',
    file: 'mal'
};
const SMTSD9 = {
    songName: 'Brasil Grime',
    artist : 'MC Smith e SD9',
    file: 'smtsd9'
};
const VND = {
    songName: 'Brasil Grime',
    artist : 'OG Britto e VND',
    file: 'vnd'
};
const RD = {
    songName: 'Brasil Grime',
    artist : 'Elicê e Major RD',
    file: 'rd'
};
const PUTO = {
    songName: 'Brasil Grime',
    artist : 'Putodiparis e TokioDK',
    file: 'puto'
};
const TRCS = {
    songName: 'Brasil Grime',
    artist : 'Tárcis e Thxuzz',
    file: 'trcs'
};
const FLSD9 = {
    songName: 'Brasil Grime',
    artist : 'Fleezus e SD9',
    file: 'flsd9'
};
const DRX = {
    songName: 'Brasil Grime',
    artist : 'Big Bllakk e Derxan',
    file: 'drx'
};
const LEALL = {
    songName: 'Brasil Grime',
    artist : 'Leall e ALD',
    file: 'leall'
};
const BIGSANT = {
    songName: 'Chove chuva',
    artist : 'Big Bllakk e Sant',
    file: 'bigsant'
};
const DUZZ = {
    songName: 'Deeabo',
    artist : 'Duzz',
    file: 'deeabo'
};
const GANNI = {
    songName: 'Não durmo',
    artist : 'Yong Ganni e FBC',
    file: 'ganni'
};
const LEALLVND = {
    songName: 'Poder Bélico',
    artist : 'Leall e VND',
    file: 'leallvnd'
};
const LIPTNT = {
    songName: 'Lip Tint',
    artist : 'Yunk Vino, Xamã, Ryan Realcria, Bielzin e Major RD',
    file: 'liptnt'
};
const MATUE1 = {
    songName: 'Xtranho',
    artist : 'Matuê e Brandão',
    file: 'matue1'
};
const MATUE2 = {
    songName: 'Japonês',
    artist : 'Matuê e Brandão',
    file: 'matue2'
};
const NILL = {
    songName: 'Regras da Loja',
    artist : 'niLL e BK',
    file: 'nill'
};
const PIOR = {
    songName: 'Medley',
    artist : 'Putodiparis e Piorversãodemim',
    file: 'pior'
};
const PUTO1 = {
    songName: 'Glock e 2 pentes',
    artist : 'Putodiparis',
    file: 'puto1'
};
const PUTO2 = {
    songName: 'Glock Gêmeas',
    artist : 'Putodiparis',
    file: 'puto2'
};
const TRANCE = {
    songName: 'Trance',
    artist : 'Travis Scott e Young Thug',
    file: 'trance'
};
const VIKVCT = {
    songName: 'Lil Top Flow',
    artist : 'Viktor Vercetti',
    file: 'vikvct'
}

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;

const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [
  VidaCara,
  Junho94,
  TTF,
  LX,
  BBL,
  MAL,
  SMTSD9,
  VND,
  RD,
  PUTO,
  TRCS,
  FLSD9,
  DRX,
  LEALL,
  BIGSANT,
  DUZZ,
  GANNI,
  LEALLVND,
  LIPTNT,
  MATUE2,
  MATUE1,
  NILL,
  PIOR,
  PUTO1,
  PUTO2,
  TRANCE,
  VIKVCT
];
let sortedPlaylist = [...originalPlaylist];
let index = 0;

function playSong() {
  play.querySelector('.bi').classList.remove('bi-play-circle-fill');
  play.querySelector('.bi').classList.add('bi-pause-circle-fill');
  song.play();
  isPlaying = true;
}

function pauseSong() {
  play.querySelector('.bi').classList.add('bi-play-circle-fill');
  play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
  song.pause();
  isPlaying = false;
}

function playPauseDecider() {
  if (isPlaying === true) {
    pauseSong();
  } else {
    playSong();
  }
}

function likeButtonRender() {
  if (sortedPlaylist[index].liked === true) {
    likeButton.querySelector('.bi').classList.remove('bi-heart');
    likeButton.querySelector('.bi').classList.add('bi-heart-fill');
    likeButton.classList.add('button-active');
  } else {
    likeButton.querySelector('.bi').classList.add('bi-heart');
    likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
    likeButton.classList.remove('button-active');
  }
}

function initializeSong() {
  cover.src = `imgs/${sortedPlaylist[index].file}.jpg`;
  song.src = `songs/${sortedPlaylist[index].file}.mp3`;
  song.load(); 
  songName.innerText = sortedPlaylist[index].songName;
  bandName.innerText = sortedPlaylist[index].artist;
  likeButtonRender();
}

function previousSong() {
  if (index === 0) {
    index = sortedPlaylist.length - 1;
  } else {
    index -= 1;
  }
  initializeSong();
  playSong();
}

function nextSong() {
  if (index === sortedPlaylist.length - 1) {
    index = 0;
  } else {
    index += 1;
  }
  initializeSong();
  playSong();
}

function updateProgress() {
  const barWidth = (song.currentTime / song.duration) * 100;
  currentProgress.style.setProperty('--progress', `${barWidth}%`);
  songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event) {
  const width = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition / width) * song.duration;
  song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray) {
  let currentIndex = preShuffleArray.length;
  let temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = preShuffleArray[currentIndex];
    preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
    preShuffleArray[randomIndex] = temporaryValue;
  }
  if (preShuffleArray[0] === sortedPlaylist[index]) {
    temporaryValue = preShuffleArray[0];
    preShuffleArray[0] = preShuffleArray[preShuffleArray.length - 1];
    preShuffleArray[preShuffleArray.length - 1] = temporaryValue;
  }
}

function shuffleButtonClicked() {
  if (isShuffled === false) {
    isShuffled = true;
    shuffleArray(sortedPlaylist);
    shuffleButton.classList.add('button-active');
  } else {
    isShuffled = false;
    sortedPlaylist = [...originalPlaylist];
    shuffleButton.classList.remove('button-active');
  }
}

function repeatButtonClicked() {
  if (repeatOn === false) {
    repeatOn = true;
    repeatButton.classList.add('button-active');
  } else {
    repeatOn = false;
    repeatButton.classList.remove('button-active');
  }
}

function nextOrRepeat() {
  if (repeatOn === false) {
    nextSong();
  } else {
    playSong();
  }
}

function toHHMMSS(originalNumber) {
  let hours = Math.floor(originalNumber / 3600);
  let min = Math.floor((originalNumber - hours * 3600) / 60);
  let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

  console.log('hours: ', hours);

  return `${hours !== 0 ? hours.toString().padStart(2, '0') + ':' : ''}${min
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTotalTime() {
  totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonClicked() {
  if (sortedPlaylist[index].liked === false) {
    sortedPlaylist[index].liked = true;
  } else {
    sortedPlaylist[index].liked = false;
  }
  likeButtonRender();
  localStorage.setItem('playlist', JSON.stringify(originalPlaylist));
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);
