const noBtn = document.getElementById('no-btn');
const finalCard = document.getElementById('final-card');
const finalText = document.getElementById('final-text');
const rejectionMsg = document.getElementById('rejection-msg');
const actionBtns = document.getElementById('action-buttons');
const floatingTulips = document.querySelectorAll('.floating-tulip');

let escapeCount = 0;

noBtn.addEventListener('mouseover', () => {
    if (escapeCount < 5) {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
        escapeCount++;
    }
});

noBtn.addEventListener('click', () => {
    finalText.style.opacity = '0';
    finalText.style.transition = 'opacity 0.5s ease';
    actionBtns.style.opacity = '0';
    actionBtns.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        actionBtns.style.display = 'none';
        finalText.style.display = 'none';
    }, 500);
    
    rejectionMsg.classList.remove('hidden');
    rejectionMsg.style.opacity = '0';
    rejectionMsg.style.transition = 'opacity 0.8s ease 0.5s';
    
    setTimeout(() => {
        rejectionMsg.style.opacity = '1';
    }, 550);
    
    // Wither effect
    document.querySelectorAll('img[src*="IMAGE_1"]').forEach(img => {
        img.style.filter = 'grayscale(100%) brightness(0.4)';
        img.style.transition = 'filter 2s ease';
    });
    
    finalCard.classList.add('rejection-state');
});

// Intersection Observer for staggered fade
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.glass-card').forEach(card => {
    observer.observe(card);
});

// Music Player Functionality
const playMusicBtn = document.getElementById('play-music-btn');
const musicPlayer = document.getElementById('music-player');
const audioPlayer = document.getElementById('audio-player');
const musicMeta = document.getElementById('music-meta');

// Configure a source URL here or set a `data-src` attribute on the play button.
// Example: const AUDIO_SRC = 'https://example.com/audio/enna-song.mp3'
const AUDIO_SRC = '';

function showMusicMessage(msg) {
    let note = musicPlayer.querySelector('.music-note');
    if (!note) {
        note = document.createElement('div');
        note.className = 'music-note text-xs text-on-surface-variant mt-4 text-center';
        musicPlayer.appendChild(note);
    }
    note.textContent = msg;
}

playMusicBtn.addEventListener('click', async () => {
    // Reveal player if hidden
    if (musicPlayer.classList.contains('hidden')) {
        musicPlayer.classList.remove('hidden');
        musicPlayer.style.animation = 'fadeInUp 0.6s ease-out';

        // small fade-in for the audio controls
        audioPlayer.style.opacity = '0';
        audioPlayer.style.transition = 'opacity 0.45s ease';
        setTimeout(() => audioPlayer.style.opacity = '1', 80);

        // reveal song metadata
        if (musicMeta) {
            musicMeta.classList.remove('hidden');
            musicMeta.style.opacity = '0';
            musicMeta.style.transition = 'opacity 0.35s ease';
            setTimeout(() => { musicMeta.style.opacity = '1'; }, 80);
        }

        // decide audio source
        const srcFromAttr = playMusicBtn.getAttribute('data-src');
        const src = AUDIO_SRC || srcFromAttr || audioPlayer.querySelector('source')?.getAttribute('src') || '';

        if (!src) {
            showMusicMessage('No audio source configured. Add a URL to `AUDIO_SRC` in script.js or set `data-src` on the Play button.');
            playMusicBtn.style.transform = 'scale(1)';
            return;
        }

        // set src only once
        if (!audioPlayer.querySelector('source')?.getAttribute('src')) {
            const sourceEl = audioPlayer.querySelector('source');
            if (sourceEl) sourceEl.setAttribute('src', src);
            audioPlayer.load();
        }

        // user gesture: attempt to play
        try {
            await audioPlayer.play();
        } catch (err) {
            showMusicMessage('Playback blocked by browser. Click the audio controls to start playback.');
        }

        playMusicBtn.style.transform = 'scale(0.95)';
        // UI will update on audio events
        return;
    }

    // If player is visible, toggle playback
    if (audioPlayer.paused) {
        try {
            await audioPlayer.play();
        } catch (err) {
            showMusicMessage('Playback blocked. Use the controls to start the audio.');
        }
    } else {
        audioPlayer.pause();
    }
});

// Update button state from audio events
audioPlayer.addEventListener('play', () => {
    playMusicBtn.innerHTML = '<span class="material-symbols-outlined">pause</span><span>Playing</span>';
    playMusicBtn.style.transform = 'scale(0.95)';
});

audioPlayer.addEventListener('pause', () => {
    playMusicBtn.innerHTML = '<span class="material-symbols-outlined">play_arrow</span><span>Play</span>';
    playMusicBtn.style.transform = 'scale(1)';
});
