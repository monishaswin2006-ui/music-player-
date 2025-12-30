# Tamil Music Player

A beautiful, modern web-based music player designed specifically for Tamil songs with a sleek UI and smooth user experience.

## Features

- 🎵 **Play/Pause Control** - Easy play and pause functionality
- ⏮️ **Previous/Next** - Navigate through your playlist
- 🔀 **Shuffle Mode** - Randomize your playlist
- 🔁 **Repeat Mode** - Repeat one song or entire playlist
- 🔊 **Volume Control** - Adjust volume with slider
- 📊 **Progress Bar** - Visual progress indicator with seek functionality
- 📋 **Playlist Management** - View and select songs from playlist
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Setup Instructions

### 1. Add Your Tamil Songs

1. Create a `songs` folder in the project directory
2. Add your Tamil song files (MP3 format) to the `songs` folder
3. Update the playlist in `script.js` with your actual song files

### 2. Update the Playlist

Open `script.js` and modify the `playlist` array in the `MusicPlayer` class constructor:

```javascript
this.playlist = [
    {
        title: 'Your Song Title 1',
        artist: 'Artist Name',
        src: 'songs/your-song-1.mp3'
    },
    {
        title: 'Your Song Title 2',
        artist: 'Artist Name',
        src: 'songs/your-song-2.mp3'
    },
    // Add more songs...
];
```

### 3. Run the Player

Simply open `index.html` in your web browser. No server required for local use!

For best experience, you can use a local web server:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js:**
```bash
npx http-server
```

Then open `http://localhost:8000` in your browser.

## File Structure

```
mounish music/
├── index.html          # Main HTML file
├── styles.css          # Styling and animations
├── script.js           # Music player logic
├── README.md           # This file
└── songs/              # Your Tamil song files (create this folder)
    ├── song1.mp3
    ├── song2.mp3
    └── ...
```

## Usage

1. **Play/Pause**: Click the play button in the center
2. **Next/Previous**: Use the arrow buttons to navigate
3. **Seek**: Click or drag on the progress bar
4. **Volume**: Adjust using the volume slider
5. **Shuffle**: Click the shuffle button to randomize playback
6. **Repeat**: Click the repeat button to cycle through repeat modes (none → one → all)
7. **Select Song**: Click any song in the playlist to play it

## Customization

### Changing Colors

Edit the gradient colors in `styles.css`:
- Main gradient: `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);`
- Button colors: `color: #667eea;`

### Adding More Features

The `MusicPlayer` class in `script.js` is extensible. You can add:
- Playlist import/export
- Favorites system
- Equalizer
- Lyrics display
- And more!

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Notes

- Audio files should be in MP3 format for best compatibility
- For large playlists, consider implementing pagination or search functionality
- Make sure audio file paths are correct relative to `index.html`

## License

Free to use and modify for personal projects.

Enjoy your Tamil music! 🎵

