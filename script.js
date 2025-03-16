// Initialize Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let previous = document.getElementById('previous');
let next = document.getElementById('next');
let songItemContainer = document.querySelector('.songItemContainer');

// Songs Array
let songs = [
    { songName: "On & On", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Invincible", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Mortals", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Shine", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Why We Lose", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" }
];

// Function to load the song list dynamically
const initializeSongItems = () => {
    songItemContainer.innerHTML = ''; // Clear existing song items

    songs.forEach((song, index) => {
        let songItem = document.createElement('div');
        songItem.classList.add('songItem');
        songItem.innerHTML = `
            <img src="${song.coverPath}" alt="Cover">
            <span class="songName">${song.songName}</span>
            <span class="timestamp">
                <i id="${index}" class="far songItemPlay fa-play-circle"></i>
            </span>
        `;
        songItemContainer.appendChild(songItem);

        songItem.addEventListener('click', () => {
            playSelectedSong(index);
        });
    });
};

// Function to play the selected song
const playSelectedSong = (index) => {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;

    audioElement.play().then(() => {
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
        gif.style.opacity = 1;
    }).catch(error => {
        console.error("Error playing the audio:", error);
    });
};

// Play/Pause Button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSelectedSong(songIndex);
    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Next & Previous Buttons
next.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSelectedSong(songIndex);
});

previous.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSelectedSong(songIndex);
});

// Update Progress Bar
audioElement.addEventListener('timeupdate', () => {
    myProgressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
});

// Seek Song when Progress Bar is Changed
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Initialize Songs List
initializeSongItems();
