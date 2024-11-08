<script setup>
import { supabase } from '@/lib/supabaseClient';


let contactRequest = {
    full_name: "",
    email: "",
    message: ""
}

async function sendRequest(){
    console.table(contactRequest);
    const { data, error } = await supabase.from("contact_requests").insert(contactRequest);
    contactRequest.full_name = "";
    contactRequest.email = "";
    contactRequest.message = "";
}

</script>

<template>
    <div class="contact-us-section">
    <h2>Contact Us</h2>
    <p>If you have any questions, feedback, or suggestions, feel free to reach out to us. We’d love to hear from you!</p>
    
    <form id="contactForm" v-on:submit.prevent="sendRequest()">
        <label for="name">Full Name:</label>
        <input v-model="contactRequest.full_name" type="text" id="name" name="name" placeholder="Your Full Name" required>

        <label for="email">Email:</label>
        <input v-model="contactRequest.email" type="email" id="email" name="email" placeholder="Your Email Address" required>

        <label for="message">Message:</label>
        <textarea v-model="contactRequest.message" id="message" name="message" rows="4" placeholder="Write your message here" required></textarea>
        
        <button type="submit">Send Message</button>
    </form>
</div>
</template>

<style scoped>
.contact-us-section {
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.contact-us-section h2 {
    text-align: center;
    font-size: 24px;
    color: #333;
}

.contact-us-section p {
    text-align: center;
    font-size: 16px;
    color: #666;
}

.contact-us-section form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.contact-us-section label {
    font-weight: bold;
    color: #333;
}

.contact-us-section input,
.contact-us-section textarea {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.contact-us-section button {
    padding: 12px;
    font-size: 16px;
    color: white;
    background-color: #28a745;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.contact-us-section button:hover {
    background-color: #218838;
}
</style>