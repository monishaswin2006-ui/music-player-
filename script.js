// Music Player System
class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('audioPlayer');
        this.playBtn = document.getElementById('playBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.repeatBtn = document.getElementById('repeatBtn');
        this.progressSlider = document.getElementById('progressSlider');
        this.progress = document.getElementById('progress');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.currentTimeEl = document.querySelector('.current-time');
        this.totalTimeEl = document.querySelector('.total-time');
        this.songTitle = document.querySelector('.song-title');
        this.songArtist = document.querySelector('.song-artist');
        this.playlistEl = document.getElementById('playlist');
        this.artContainer = document.querySelector('.art-container');

        this.currentIndex = 0;
        this.isPlaying = false;
        this.isShuffled = false;
        this.repeatMode = 'none'; // 'none', 'one', 'all'
        this.shuffledIndices = [];

        // Sample Tamil songs playlist
        // Replace these with your actual Tamil song file paths
        this.playlist = [
            {
                title: 'Sample Tamil Song 1',
                artist: 'Tamil Artist',
                src: 'songs/song1.mp3'
            },
            {
                title: 'Sample Tamil Song 2',
                artist: 'Tamil Artist',
                src: 'songs/song2.mp3'
            },
            {
                title: 'Sample Tamil Song 3',
                artist: 'Tamil Artist',
                src: 'songs/song3.mp3'
            }
        ];

        this.init();
    }

    init() {
        this.renderPlaylist();
        this.setupEventListeners();
        this.loadSong(this.currentIndex);
        this.audio.volume = 0.7;
    }

    setupEventListeners() {
        // Play/Pause button
        this.playBtn.addEventListener('click', () => this.togglePlay());

        // Previous button
        this.prevBtn.addEventListener('click', () => this.prevSong());

        // Next button
        this.nextBtn.addEventListener('click', () => this.nextSong());

        // Shuffle button
        this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());

        // Repeat button
        this.repeatBtn.addEventListener('click', () => this.toggleRepeat());

        // Progress slider
        this.progressSlider.addEventListener('input', (e) => {
            const seekTime = (e.target.value / 100) * this.audio.duration;
            this.audio.currentTime = seekTime;
        });

        // Volume slider
        this.volumeSlider.addEventListener('input', (e) => {
            this.audio.volume = e.target.value / 100;
        });

        // Audio events
        this.audio.addEventListener('loadedmetadata', () => {
            this.updateTotalTime();
        });

        this.audio.addEventListener('timeupdate', () => {
            this.updateProgress();
        });

        this.audio.addEventListener('ended', () => {
            this.handleSongEnd();
        });

        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            this.updatePlayButton();
            this.artContainer.classList.add('playing');
        });

        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            this.updatePlayButton();
            this.artContainer.classList.remove('playing');
        });
    }

    loadSong(index) {
        if (index < 0 || index >= this.playlist.length) return;

        const song = this.playlist[index];
        this.audio.src = song.src;
        this.songTitle.textContent = song.title;
        this.songArtist.textContent = song.artist;
        this.currentIndex = index;

        this.updatePlaylistUI();
        this.audio.load();
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play().catch(err => {
                console.error('Error playing audio:', err);
                alert('Error playing song. Please check if the audio file exists.');
            });
        }
    }

    prevSong() {
        let newIndex;
        
        if (this.isShuffled) {
            const currentShuffledIndex = this.shuffledIndices.indexOf(this.currentIndex);
            newIndex = currentShuffledIndex > 0 
                ? this.shuffledIndices[currentShuffledIndex - 1]
                : this.shuffledIndices[this.shuffledIndices.length - 1];
        } else {
            newIndex = this.currentIndex > 0 
                ? this.currentIndex - 1 
                : this.playlist.length - 1;
        }

        this.loadSong(newIndex);
        if (this.isPlaying) {
            this.audio.play();
        }
    }

    nextSong() {
        let newIndex;
        
        if (this.isShuffled) {
            const currentShuffledIndex = this.shuffledIndices.indexOf(this.currentIndex);
            newIndex = currentShuffledIndex < this.shuffledIndices.length - 1
                ? this.shuffledIndices[currentShuffledIndex + 1]
                : this.shuffledIndices[0];
        } else {
            newIndex = this.currentIndex < this.playlist.length - 1
                ? this.currentIndex + 1
                : 0;
        }

        this.loadSong(newIndex);
        if (this.isPlaying) {
            this.audio.play();
        }
    }

    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        this.shuffleBtn.classList.toggle('active', this.isShuffled);

        if (this.isShuffled) {
            this.createShuffledIndices();
        }
    }

    toggleRepeat() {
        const modes = ['none', 'one', 'all'];
        const currentModeIndex = modes.indexOf(this.repeatMode);
        this.repeatMode = modes[(currentModeIndex + 1) % modes.length];

        this.repeatBtn.classList.toggle('active', this.repeatMode !== 'none');
        
        // Update icon based on repeat mode
        if (this.repeatMode === 'one') {
            this.repeatBtn.innerHTML = '<i class="fas fa-redo-alt"></i>';
            this.repeatBtn.title = 'Repeat One';
        } else if (this.repeatMode === 'all') {
            this.repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
            this.repeatBtn.title = 'Repeat All';
        } else {
            this.repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
            this.repeatBtn.title = 'Repeat';
        }
    }

    createShuffledIndices() {
        this.shuffledIndices = [...Array(this.playlist.length).keys()];
        // Fisher-Yates shuffle
        for (let i = this.shuffledIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shuffledIndices[i], this.shuffledIndices[j]] = [this.shuffledIndices[j], this.shuffledIndices[i]];
        }
    }

    handleSongEnd() {
        if (this.repeatMode === 'one') {
            this.audio.currentTime = 0;
            this.audio.play();
        } else if (this.repeatMode === 'all') {
            this.nextSong();
            if (this.isPlaying) {
                this.audio.play();
            }
        } else {
            this.nextSong();
            if (this.isPlaying) {
                this.audio.play();
            }
        }
    }

    updateProgress() {
        if (this.audio.duration) {
            const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
            this.progress.style.width = progressPercent + '%';
            this.progressSlider.value = progressPercent;
            this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
        }
    }

    updateTotalTime() {
        this.totalTimeEl.textContent = this.formatTime(this.audio.duration);
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    updatePlayButton() {
        if (this.isPlaying) {
            this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            this.playBtn.title = 'Pause';
        } else {
            this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
            this.playBtn.title = 'Play';
        }
    }

    renderPlaylist() {
        this.playlistEl.innerHTML = '';
        this.playlist.forEach((song, index) => {
            const item = document.createElement('div');
            item.className = 'playlist-item';
            if (index === this.currentIndex) {
                item.classList.add('active');
            }
            item.innerHTML = `
                <i class="fas fa-music"></i>
                <div class="playlist-item-info">
                    <div class="playlist-item-title">${song.title}</div>
                    <div class="playlist-item-artist">${song.artist}</div>
                </div>
            `;
            item.addEventListener('click', () => {
                this.loadSong(index);
                if (this.isPlaying) {
                    this.audio.play();
                }
            });
            this.playlistEl.appendChild(item);
        });
    }

    updatePlaylistUI() {
        const items = this.playlistEl.querySelectorAll('.playlist-item');
        items.forEach((item, index) => {
            if (index === this.currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Method to add songs to playlist
    addSong(song) {
        this.playlist.push(song);
        this.renderPlaylist();
    }

    // Method to remove song from playlist
    removeSong(index) {
        if (index >= 0 && index < this.playlist.length) {
            this.playlist.splice(index, 1);
            if (this.currentIndex >= this.playlist.length) {
                this.currentIndex = 0;
            }
            this.renderPlaylist();
            this.loadSong(this.currentIndex);
        }
    }
}

// Initialize the music player when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.musicPlayer = new MusicPlayer();
});

