import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const $ = (id) => document.getElementById(id);
const sections = ["welcome","memories","letter","proposal","ending"];
function show(id){ sections.forEach(s => $(s).classList.toggle("hidden",s!==id)); window.scrollTo({top:0,behavior:"smooth"}); }
$("openBtn").addEventListener("click",()=>show("memories"));
$("letterBtn").addEventListener("click",()=>show("letter"));
$("questionBtn").addEventListener("click",()=>show("proposal"));
$("replayBtn").addEventListener("click",()=>show("welcome"));

const playful = [
 "Arey Siya, ek baar aur socho na! 🥺",
 "Itni jaldi NO? ❤️",
 "Please ek baar dil se socho! 🥹",
 "Ek YES se meri smile aa jayegi! 😭",
 "Itna bhi kya sochna, Siya? 💗",
 "Ek baar phir soch lo! 🥺"
];
let noCount=0;
$("noBtn").addEventListener("click",()=>{
  $("reaction").textContent=playful[noCount % playful.length];
  noCount++;
  saveResponse("NO");
});

let db=null;
try {
  const configured = firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("PASTE_") && !firebaseConfig.projectId.startsWith("YOUR_");
  if(configured){ const app=initializeApp(firebaseConfig); db=getFirestore(app); }
} catch(e){ console.error("Firebase initialization failed:",e); }

async function saveResponse(answer){
  if(!db){ showToast("Response demo only — Firebase setup is still needed."); return; }
  try{
    await addDoc(collection(db,"proposal_responses"),{
      recipientName:"Siya", answer, proposalId:"siya-proposal-2026",
      timestamp:serverTimestamp()
    });
  }catch(e){ console.error(e); showToast("Could not save right now. Please check your connection."); }
}
$("yesBtn").addEventListener("click",async()=>{
  $("endingTitle").textContent="Thank you, Siya. ❤️";
  $("endingText").textContent="Your answer means a lot to me. Whatever comes next, I'm glad I told you how I feel.";
  show("ending"); confettiHearts(); await saveResponse("YES");
});
function showToast(message){const t=$("toast");t.textContent=message;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3000);}
function confettiHearts(){
  for(let i=0;i<24;i++){const h=document.createElement("span");h.textContent=["♥","♡","✨"][i%3];h.style.cssText=`position:fixed;left:${Math.random()*100}vw;top:-30px;color:#d96f94;font-size:${16+Math.random()*22}px;z-index:9;pointer-events:none;transition:transform 2.5s linear,opacity 2.5s;`;document.body.append(h);requestAnimationFrame(()=>{h.style.transform=`translateY(${window.innerHeight+80}px) rotate(${Math.random()*360}deg)`;h.style.opacity="0"});setTimeout(()=>h.remove(),2600);}
}
const audio=$("bgMusic");
$("musicToggle").addEventListener("click",async()=>{if(audio.paused){try{await audio.play();$("musicToggle").innerHTML="♫ <span>Music on</span>";}catch{$("musicToggle").innerHTML="♫ <span>Add music file</span>";}}else{audio.pause();$("musicToggle").innerHTML="♫ <span>Music off</span>";}});
