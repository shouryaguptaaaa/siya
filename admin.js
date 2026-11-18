import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";
const app=initializeApp(firebaseConfig), auth=getAuth(app), db=getFirestore(app);
const $=id=>document.getElementById(id);
$("loginBtn").onclick=async()=>{try{await signInWithEmailAndPassword(auth,$("email").value,$("password").value);$("status").textContent="";}catch(e){$("status").textContent="Sign-in failed. Check your details.";console.error(e);}};
$("logoutBtn").onclick=()=>signOut(auth);
onAuthStateChanged(auth,async user=>{
  $("login").hidden=!!user; $("dashboard").hidden=!user;
  if(!user)return;
  try{
    const snap=await getDocs(query(collection(db,"proposal_responses"),orderBy("timestamp","desc")));
    let yes=0,no=0; $("rows").innerHTML="";
    snap.forEach(doc=>{const d=doc.data();if(d.answer==="YES")yes++;if(d.answer==="NO")no++;const tr=document.createElement("tr");const a=document.createElement("td"),t=document.createElement("td");a.textContent=d.answer;t.textContent=d.timestamp?.toDate().toLocaleString()||"Pending";tr.append(a,t);$("rows").append(tr);});
    $("yesCount").textContent=yes;$("noCount").textContent=no;
  }catch(e){console.error(e);$("status").textContent="Could not load responses. Check Firestore rules.";}
});