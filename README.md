# One Last Time — Audio & Deploy Instructions

This README explains how to add the audio file used by the music card and how to push the site to GitHub and connect it to Render for automatic deploys.

1) Add your audio file
- Create a folder `audio` at the repository root (same level as `index.html`).
- Put your MP3 file there and name it `enna_sona.mp3` (or update the `data-src` attribute accordingly).

Example structure:
```
/ (repo root)
  index.html
  styles.css
  script.js
  audio/
    enna_sona.mp3
```

2) How the site finds the file
- The Play button has a `data-src` attribute set to `/audio/enna_sona.mp3`.
- The script will read that `data-src`, set it on the `<audio>` element when the user clicks Play, and then attempt to play (this satisfies browser user-gesture autoplay policies).
- If you prefer to configure in JS, open `script.js` and set the `AUDIO_SRC` constant to the file path (e.g., `/audio/enna_sona.mp3`).

3) Commit & push to GitHub
Replace `<your-username>` and `<repo>` with your values.

```bash
git add .
git commit -m "Add audio instructions and play behavior"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

4) Connect to Render for auto-deploy
- Sign in to Render (https://render.com) and go to Dashboard → New → Static Site.
- Connect your GitHub account and select the repository.
- Settings:
  - Branch: `main` (or the branch you pushed)
  - Build Command: leave empty (static)
  - Publish Directory: `/` (root)
- Click Create. Render will build and deploy automatically when you push to the chosen branch.

5) Notes and Licensing
- Do not add copyrighted audio unless you own rights or have a license.
- If you want to stream from a service (Spotify, YouTube) prefer embedding provided players/links rather than hosting copyrighted files.

6) If you'd like me to push the repo and connect Render
- I can run the `git` commands here and help connect Render if you provide the GitHub repo URL and confirm you want me to push.
