import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXPNQuxkGKdLnkN7vZEWM5TkQwhq_VV54",
  authDomain: "health-care-management-b8.firebaseapp.com",
  databaseURL: "https://health-care-management-b8-default-rtdb.firebaseio.com",
  projectId: "health-care-management-b8",
  storageBucket: "health-care-management-b8.appspot.com",
  messagingSenderId: "385742303212",
  appId: "1:385742303212:web:9fa61bb0df9dca805a1ac9",
  measurementId: "G-6G8QW431LX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const googleSignInButton = document.getElementById("google-sign-in");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const createacct = document.getElementById("create-acct");
const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");
const returnBtn = document.getElementById("return-btn");

signupButton.addEventListener("click", function() {
  document.querySelector(".login-section").style.display = "none";
  createacct.style.display = "block";
});

returnBtn.addEventListener("click", function() {
  document.querySelector(".login-section").style.display = "block";
  createacct.style.display = "none";
});

createacctbtn.addEventListener("click", function() {
  var isVerified = true;

  const signupEmail = signupEmailIn.value;
  const confirmSignupEmail = confirmSignupEmailIn.value;
  if (signupEmail !== confirmSignupEmail) {
    window.alert("Email fields do not match. Try again.");
    isVerified = false;
  }

  const signupPassword = signupPasswordIn.value;
  const confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if (signupPassword !== confirmSignUpPassword) {
    window.alert("Password fields do not match. Try again.");
    isVerified = false;
  }

  if (!signupEmail || !confirmSignupEmail || !signupPassword || !confirmSignUpPassword) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }

  if (isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        window.alert("Success! Account created.");
        window.location.href = "index.html";  // Redirect to index page
      })
      .catch((error) => {
        const errorMessage = error.message;
        window.alert("Error occurred: " + errorMessage);
      });
  }
});

submitButton.addEventListener("click", function() {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    window.alert("Please enter your email and password.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.alert("Success! Welcome back!");
      window.location.href = "home.html";  // Redirect to home page
    })
    .catch((error) => {
      const errorMessage = error.message;
      window.alert("Error occurred: " + errorMessage);
    });
});

googleSignInButton.addEventListener("click", function() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      window.alert("Success! Welcome back!");
      window.location.href = "home.html";  // Redirect to home page
    })
    .catch((error) => {
      const errorMessage = error.message;
      window.alert("Error occurred: " + errorMessage);
    });
});

const forgotPasswordButton = document.getElementById("forgot-password");

forgotPasswordButton.addEventListener("click", function() {
  const email = emailInput.value;

  if (!email) {
    window.alert("Please enter your email address.");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      window.alert("Password reset email sent! Check your inbox.");
    })
    .catch((error) => {
      const errorMessage = error.message;
      window.alert("Error occurred: " + errorMessage);
    });
});
