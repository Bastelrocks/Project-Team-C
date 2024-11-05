<script setup>
import { ref } from 'vue';
import { sessionStore } from '@/stores/sessionStore';

let session = sessionStore();
let profileData = ref({
    full_name: "Victor F Martins",
    role: "Admin"
})

</script>
<template>
<form v-if="!session.isAutenticated" v-on:submit.prevent="session.doSignUp(session.loginData.email, session.loginData.password, profileData)">
    <input type="email" placeholder="E-mail" v-model=session.loginData.email required />
    <input type="password" v-model=session.loginData.password required />
    <input type="text" v-model="profileData.full_name" />
    <input type="hidden" v-model="profileData.role"/>
    <button type="submit">Sign Up!</button>
</form>    
</template>