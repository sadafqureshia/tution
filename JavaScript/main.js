import { loadMessages, sendMessage } from './chat.js';
import { submitForm } from './api.js';

// Chat functionality
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-message');

sendButton.addEventListener('click', () => {
    sendMessage(messageInput.value.trim());
    messageInput.value = '';
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage(messageInput.value.trim());
        messageInput.value = '';
    }
});

loadMessages(chatMessages);

// Form submission
const tutorRequestForm = document.getElementById('tutor-request-form');

tutorRequestForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(tutorRequestForm);
    const data = Object.fromEntries(formData.entries());
    const result = await submitForm(data);
    if (result.success) {
        alert('Request submitted successfully!');
        tutorRequestForm.reset();
    } else {
        alert('Failed to submit request.');
    }
});
