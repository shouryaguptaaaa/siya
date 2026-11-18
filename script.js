
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

import { firebaseConfig } from "./firebase-config.js";

const $ = id => document.getElementById(id);

const sections = [
  "welcome",
  "memories",
  "letter",
  "proposal",
  "ending"
];

function show(id) {
  sections.forEach(section => {
    $(section).classList.toggle("hidden", section !== id);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Navigation
$("openBtn").onclick = () => show("memories");
$("letterBtn").onclick = () => show("letter");
$("questionBtn").onclick = () => show("proposal");
$("replayBtn").onclick = () => show("welcome");

// Firebase
let db = null;

try {
  if (
    firebaseConfig.apiKey &&
    !firebaseConfig.apiKey.startsWith("PASTE_")
  ) {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
} catch (error) {
  console.error("Firebase error:", error);
}

async function saveResponse(answer) {
  if (!db) {
    showToast("Firebase is not configured yet.");
    return;
  }

  try {
    await addDoc(collection(db, "proposal_responses"), {
      recipientName: "Siya",
      answer,
      proposalId: "siya-proposal-2026",
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error(error);
    showToast("Response could not be saved.");
  }
}

// NO BUTTON - unlimited playful messages
const noBtn = $("noBtn");
const reaction = $("reaction");

const flirtingLines = [
  "Siyaaa, ek baar aur socho na! 🥺❤️",
  "Tumhari smile meri favourite hai! 😘",
  "Arey madam, dil ka mamla hai! 💗",
  "Shourya ko itna bhi mat tadpao! 😂",
  "Ek YES se mera din ban jayega! 🥹",
  "Tumhare liye special surprise banaya hai! 💌",
  "Itni cute hokar NO? 😭",
  "Dil ki baat samajh jao na! 🌹",
  "Madam ji, ek chance toh banta hai! 🎀",
  "Tumhari ek smile hi kaafi hai! ❤️",
  "Kya YES button se dosti nahi karogi? 😍",
  "Please ek baar dil se socho! 💕",
  "Tumhare liye toh wait bhi kar sakta hoon! 🌷",
  "Aaj toh YES sunne ka mann hai! 🥺"
];

let lineIndex = 0;

function moveNoButton() {
  const rect = noBtn.getBoundingClientRect();

  const maxX = Math.max(10, window.innerWidth - rect.width - 15);
  const maxY = Math.max(110, window.innerHeight - rect.height - 20);

  const x = 10 + Math.random() * Math.max(0, maxX - 10);
  const y = 100 + Math.random() * Math.max(0, maxY - 100);

  noBtn.style.position = "fixed";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
  noBtn.style.transform = "none";
  noBtn.style.zIndex = "9999";

  reaction.textContent =
    flirtingLines[lineIndex % flirtingLines.length];

  lineIndex++;
}

// Desktop hover
noBtn.addEventListener("pointerenter", event => {
  if (event.pointerType === "mouse") {
    moveNoButton();
  }
});

// Click / tap
noBtn.addEventListener("click", event => {
  event.preventDefault();
  moveNoButton();
});

// YES BUTTON - love letter
$("yesBtn").addEventListener("click", async () => {

  $("endingTitle").textContent =
    "You made my day, Siya! ❤️";

  $("endingText").innerHTML = `
    <div class="final-letter">

      <div class="letter-icon">💌</div>

      <h3>Dear Siya,</h3>

      <p>
        I don't know where to begin,
        but I know that asking you this
        was something I really wanted to do.
      </p>

      <p>
        Your smile makes ordinary moments
        feel special. There's something about
        you that makes me happy in ways
        I cannot always explain.
      </p>

      <p>
        I don't promise a perfect story,
        but I would love to create
        beautiful memories together.
      </p>

      <p>
        Thank you for making this moment
        so special for me.
      </p>

      <h3>With lots of smiles,</h3>

      <div class="signature">Shourya ❤️</div>

      <div class="big-heart">♡</div>

    </div>
  `;

  show("ending");

  await saveResponse("YES");

  createHearts();
});

// Celebration animation
function createHearts() {
  for (let i = 0; i < 35; i++) {
    const heart = document.createElement("div");

    heart.textContent = ["❤️", "💕", "💗", "✨"][
      Math.floor(Math.random() * 4)
    ];

    heart.style.cssText = `
      position:fixed;
      left:${Math.random() * 100}vw;
      top:-30px;
      font-size:${18 + Math.random() * 22}px;
      z-index:999;
      pointer-events:none;
      transition:transform 3s linear, opacity 3s;
    `;

    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform =
        \`translateY(\${window.innerHeight + 100}px) rotate(360deg)\`;

      heart.style.opacity = "0";
    });

    setTimeout(() => heart.remove(), 3100);
  }
}

// Toast notification
function showToast(message) {
  const toast = $("toast");

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Background music
const audio = $("bgMusic");

$("musicToggle").addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      $("musicToggle").innerHTML = "♫ <span>Music on</span>";
    } catch {
      showToast("Please add your music file first.");
    }
  } else {
    audio.pause();
    $("musicToggle").innerHTML = "♫ <span>Music off</span>";
  }
});
