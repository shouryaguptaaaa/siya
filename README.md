# A Little Question for Siya ❤️

## 1. Add your four photos
Copy your JPG files into `assets/images/` using these exact names:
- `s.jpg`
- `i.jpg`
- `y.jpg`
- `a.jpg`

The image files were not included in this starter ZIP because they were not attached to the chat.

## 2. Configure Firebase
1. Open https://console.firebase.google.com/ and create a project.
2. Add a Web App and copy its Firebase config into `firebase-config.js`.
3. In Firebase Console → Build → Firestore Database, create a database.
4. Open Firestore Rules and publish the contents of `firestore.rules`.
5. In Authentication → Sign-in method, enable Email/Password.
6. In Authentication → Users, add your own admin email and a strong password.
7. Deploy the site on Firebase Hosting (recommended) or another HTTPS static host.

The web config values are intended to be public. Never put service-account JSON, private keys, or admin credentials in frontend files.

## 3. Run locally
Because the site uses JavaScript modules, run it through a local web server, not by double-clicking `index.html`.
For example, in VS Code install/use Live Server and open `index.html`.

## 4. Admin dashboard
After deployment, open `/admin.html` and sign in with the admin user you created in Firebase Authentication.

## Important privacy / security note
The proposal page does not force a choice. NO remains available, and the page records each submitted YES/NO click. Firestore rules allow public creation of minimal response records and authenticated reads. For a production deployment, consider adding App Check and stricter abuse protection. Do not share the admin login.

## Optional music
Add a royalty-free MP3 as `assets/music.mp3`. Music starts only after the visitor taps the music control.
