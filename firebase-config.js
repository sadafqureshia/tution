import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFALXYnCFdYZ6d1Dg11AikCtk784af7oM",
    authDomain: "chat-app-10e53.firebaseapp.com",
    projectId: "chat-app-10e53",
    storageBucket: "chat-app-10e53.appspot.com", // Fixed storageBucket URL
    messagingSenderId: "1095696556888",
    appId: "1:1095696556888:web:5dac587fd62a5998a0fb2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get DOM elements
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const submitButton = document.getElementById('submitButton');
const toggleForm = document.getElementById('toggleForm');
const messageDiv = document.getElementById('message');
const userInfo = document.getElementById('userInfo');
const userEmail = document.getElementById('userEmail');
const signOutButton = document.getElementById('signOutButton');

let isSignIn = true;

// Function to show a message
function showMessage(message, isError = false) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${isError ? 'error' : 'success'}`;
    messageDiv.style.display = 'block';
}

// Toggle between Sign In and Sign Up forms
toggleForm.addEventListener('click', () => {
    isSignIn = !isSignIn;
    authTitle.textContent = isSignIn ? 'Sign In' : 'Sign Up';
    submitButton.textContent = isSignIn ? 'Sign In' : 'Sign Up';
    toggleForm.textContent = isSignIn 
        ? "Don't have an account? Sign Up" 
        : "Already have an account? Sign In";
    messageDiv.style.display = 'none';
});

// Handle form submission
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = authForm.email.value;
    const password = authForm.password.value;

    try {
        if (isSignIn) {
            await signInWithEmailAndPassword(auth, email, password);
            showMessage('Signed in successfully!');
            // Redirect to chat page (uncomment the next line if needed)
            window.location.href = "homepage.html";
        } else {
            await createUserWithEmailAndPassword(auth, email, password);
            showMessage('User created successfully!');
        }
        authForm.reset();
    } catch (error) {
        showMessage(error.message, true);
        authForm.classList.add('shake'); // Shake animation for error
        setTimeout(() => {
            authForm.classList.remove('shake');
        }, 500);
    }
});

// Handle sign out
signOutButton.addEventListener('click', async () => {
    try {
        await signOut(auth);
        showMessage('Signed out successfully!');
    } catch (error) {
        showMessage(error.message, true);
    }
});

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        authForm.style.display = 'none';
        toggleForm.style.display = 'none';
        userInfo.style.display = 'block';
        userEmail.textContent = user.email;
    } else {
        // User is signed out
        authForm.style.display = 'block';
        toggleForm.style.display = 'block';
        userInfo.style.display = 'none';
    }
});
