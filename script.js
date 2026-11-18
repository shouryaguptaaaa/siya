
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
  console.error(error);
}

async function saveResponse(answer) {
  if (!db) {
    showToast("Firebase is not configured yet.");
    return;
  }

  try {
    await addDoc(collection(db, "proposal_responses"), {
      recipientName: "Siya",
      answer: answer,
      proposalId: "siya-proposal-2026",
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error(error);
    showToast("Response could not be saved.");
  }
}

// NO button playful movement
const noBtn = $("noBtn");
const actions = document.querySelector(".actions");

const messages = [
  "Arey Siya, ek baar aur socho na! 🥺",
  "Itni jaldi NO? ❤️",
  "Please ek baar dil se socho! 🥹",
  "Ek YES se meri smile aa jayegi! 😭",
  "Ek baar phir soch lo! 💗"
];

let noCount = 0;

noBtn.addEventListener("pointerenter", event => {
  if (event.pointerType !== "mouse") return;

  const x = Math.random() * 120 - 60;
  const y = Math.random() * 65 - 32;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

noBtn.addEventListener("click", async () => {
  noBtn.style.transform = "translate(0, 0)";

  $("reaction").textContent =
    messages[noCount % messages.length];

  noCount++;

  // Record her actual NO response
  await saveResponse("NO");

  // Allow her to make her choice freely
  if (noCount >= 2) {
    $("reaction").textContent =
      "I understand, Siya. Thank you for being honest. ❤️";

    noBtn.textContent = "Confirm my answer";
    noBtn.onclick = async () => {
      $("endingTitle").textContent = "Thank you, Siya ❤️";
      $("endingText").textContent =
        "Thank you for being honest with me. I'll respect your feelings and always wish you happiness.";

      show("ending");
    };
  }
});

// YES button
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
        `translateY(${window.innerHeight + 100}px) rotate(360deg)`;

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
